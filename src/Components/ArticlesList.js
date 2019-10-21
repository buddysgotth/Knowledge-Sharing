import React from "react";
import log from "loglevel";
import axios from "axios";

import Loading from "./Loading";
import CompareArticlesData from "./CompareArticlesData";

class ArticleDetails extends React.Component {
  state = {
    isLoading: true,
    articles: [],
    authors: [],
    categories: [],
    tags: []
  };

  componentDidMount() {
    const getArticlesList = axios.get(`/wp-json/wp/v2/articles/`);
    const getAuthor = axios.get(`/wp-json/wp/v2/users?per_page=100`);
    const getCategory = axios.get(`/wp-json/wp/v2/categories?per_page=100`);
    const getTags = axios.get(`/wp-json/wp/v2/tags?per_page=100`);

    Promise.all([getArticlesList, getAuthor, getCategory, getTags])
      .then(res => {
        this.setState({
          isLoading: false,
          articles: res[0].data,
          authors: res[1].data,
          categories: res[2].data,
          tags: res[3].data
        });

        log.debug("All articles:", res[0].data);
        log.debug("Authors:", res[1].data);
        log.debug("Categories:", res[2].data);
        log.debug("Tags:", res[3].data);
      })
      .catch(error => log.error(error));
  }

  render() {
    const { isLoading, articles, authors, categories, tags } = this.state;

    if (isLoading) {
      return <Loading />;
    }

    return (
      <CompareArticlesData
        articles={articles}
        authors={authors}
        categories={categories}
        tags={tags}
      />
    );
  }
}

export default ArticleDetails;
