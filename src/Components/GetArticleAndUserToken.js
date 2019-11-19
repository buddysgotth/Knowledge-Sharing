import React from 'react';
import axios from 'axios';
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
    const getArticle = axios.get(
      `/wp-json/wp/v2/articles/${this.props.articleId}`
    );
    const getCategory = axios.get(`/wp-json/wp/v2/categories?per_page=100`);
    const getTags = axios.get(`/wp-json/wp/v2/tags?per_page=100`);
    const getToken = axios.post(
      '/wp-json/jwt-auth/v1/token',
      { username: 'admin-kb', password: 'know-share-kb' },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    );
    Promise.all([getCategory, getTags, getToken, getArticle]).then(res => {
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
        token: res[2].data.token,
        articleData: res[3].data
      });
      log.debug(this.state.token);
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
