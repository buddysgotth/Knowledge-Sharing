import React from 'react';
import axios from 'axios';
import urljoin from 'url-join';
import log from 'loglevel';
import { Container, Heading } from 'react-bulma-components';
import Loading from './Loading';

import ArticleForm from './ArticleForm';

class GetArticleAndUserToken extends React.Component {
  state = {
    isLoading: true,
    categoriesTree: [],
    tags: [],
    token: '',
    articleData: null
  };

  componentDidMount() {
    const { token } = this.props;
    const getArticle = axios.get(
      urljoin(process.env.REACT_APP_ARTICLES_API_URL, this.props.articleId),
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    );
    const getCategories = axios.get(
      urljoin(
        process.env.REACT_APP_CATEGORIES_API_URL,
        process.env.REACT_APP_GET_ALL
      )
    );
    const getTags = axios.get(
      urljoin(process.env.REACT_APP_TAGS_API_URL, process.env.REACT_APP_GET_ALL)
    );
    Promise.all([getCategories, getTags, getArticle]).then(res => {
      const categories = res[0].data;
      const tempCategoriesTree = categories
        .filter(category => category.parent === 0 && category.id !== 1)
        .map(category => ({
          id: category.id,
          name: category.name,
          children: []
        }));

      tempCategoriesTree.map(parent =>
        categories
          .filter(category => category.parent === parent.id)
          .map(category =>
            parent.children.push({
              id: category.id,
              name: category.name
            })
          )
      );

      this.setState({
        isLoading: false,
        categoriesTree: tempCategoriesTree,
        tags: res[1].data.map(tag => ({
          value: tag.slug,
          label: tag.name,
          id: tag.id
        })),
        token: token,
        articleData: res[2].data
      });
      log.debug('Categories Tree:', this.state.categoriesTree);
      log.debug('Tags:', this.state.tags);
      log.debug('Article:', this.state.articleData);
    });
  }

  render() {
    const { isLoading, categoriesTree, tags, token, articleData } = this.state;
    if (isLoading) return <Loading />;
    return (
      <React.Fragment>
        <Container className="header">
          <Heading className="has-text-centered">แก้ไขบทความ</Heading>
        </Container>
        <Container>
          <ArticleForm
            categories={categoriesTree}
            tags={tags}
            token={token}
            articleData={articleData}
          />
        </Container>
      </React.Fragment>
    );
  }
}

export default GetArticleAndUserToken;
