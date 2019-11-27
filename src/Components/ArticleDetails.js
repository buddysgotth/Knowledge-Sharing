import React from 'react';
import PropTypes from 'prop-types';
import log from 'loglevel';
import axios from 'axios';
import urljoin from 'url-join';

import ArticleView from './ArticleDetails.view';
import Loading from './Loading';

class ArticleDetails extends React.Component {
  state = {
    isLoading: true,
    articleId: this.props.articleId,
    contents: '',
    title: '',
    modifiedDate: '',
    author: '',
    category: '',
    tags: []
  };

  componentDidMount() {
    const { articleId } = this.state;
    const getArticleDetails = axios.get(
      urljoin(process.env.REACT_APP_ARTICLES_API_URL, articleId)
    );
    const getAuthor = axios.get(
      urljoin(process.env.REACT_APP_USERS_API_URL, `?post=${articleId}`)
    );
    const getCategory = axios.get(
      urljoin(process.env.REACT_APP_CATEGORIES_API_URL, `?post=${articleId}`)
    );
    const getTags = axios.get(
      urljoin(process.env.REACT_APP_TAGS_API_URL, `?post=${articleId}`)
    );

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
        log.debug('Details:', res[0].data);
        log.debug('Author:', res[1].data);
        log.debug('Category:', res[2].data);
        log.debug('Tags:', res[3].data);
      })
      .catch(error => log.error(error));
  }

  render() {
    const {
      isLoading,
      articleId,
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
        id={articleId}
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

ArticleDetails.propTypes = {
  articleId: PropTypes.string
};

export default ArticleDetails;
