import React from "react";
import log from "loglevel";
import axios from "axios";

import ArticleView from "./ArticleDetails.view";
import Loading from "./Loading";

class ArticleDetails extends React.Component {
  state = {
    isLoading: true,
    articleId: 11,
    contents: "",
    title: "",
    modifiedDate: "",
    author: "",
    category: "",
    tags: []
  };

  componentDidMount() {
    const { articleId } = this.state;
    const getArticleDetails = axios.get(`/wp-json/wp/v2/articles/${articleId}`);
    const getAuthor = axios.get(`/wp-json/wp/v2/users?post=${articleId}`);
    const getCategory = axios.get(
      `/wp-json/wp/v2/categories?post=${articleId}`
    );
    const getTags = axios.get(`/wp-json/wp/v2/tags?post=${articleId}`);

    Promise.all([getArticleDetails, getAuthor, getCategory, getTags])
      .then(res => {
        this.setState({
          isLoading: false,
          contents: res[0].data.content.rendered,
          title: res[0].data.title.rendered,
          modifiedDate: res[0].data.modified,
          author: res[1].data[0].name,
          category: res[2].data[0].name,
          tags: res[3].data.map(tag => tag.name)
        });
        log.debug("Details:", res[0].data);
        log.debug("Author:", res[1].data);
        log.debug("Category:", res[2].data);
        log.debug("Tags:", res[3].data);
      })
      .catch(error => log.error(error));
  }

  render() {
    const {
      isLoading,
      contents,
      title,
      modifiedDate,
      author,
      category,
      tags
    } = this.state;

    if (isLoading) {
      return <Loading />;
    }

    return (
      <ArticleView
        contents={contents}
        title={title}
        modifiedDate={modifiedDate}
        author={author}
        category={category}
        tags={tags}
      />
    );
  }
}

export default ArticleDetails;
