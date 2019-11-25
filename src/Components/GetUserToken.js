import React from 'react';
import axios from 'axios';
import log from 'loglevel';
import { Container, Heading } from 'react-bulma-components';
import Loading from './Loading';

import ArticleForm from './ArticleForm';

class GetUserToken extends React.Component {
  state = {
    userId: 0,
    isLoading: true,
    categoriesTree: [],
    tags: [],
    token: ''
  };

  componentDidMount() {
    const slugIndex = document.cookie.indexOf('slug');
    const slugLastIndex = document.cookie.indexOf(';', slugIndex);
    let slug;
    if (slugIndex === -1) {
      return (window.location = '/');
    }
    if (slugLastIndex !== -1) {
      slug = document.cookie.slice(slugIndex + 5, slugLastIndex);
    } else {
      slug = document.cookie.slice(slugIndex + 5);
    }
    const getCategory = axios.get(`/wp-json/wp/v2/categories?per_page=100`);
    const getTags = axios.get(`/wp-json/wp/v2/tags?per_page=100`);
    const getUser = axios.get(`/wp-json/wp/v2/users?slug=${slug}`);
    const { token } = this.props;
    Promise.all([getCategory, getTags, getUser]).then(res => {
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
        userId: res[2].data[0].id,
        token: token
      });
      log.debug('Categories Tree:', this.state.categoriesTree);
      log.debug('Tags:', this.state.tags);
    });
  }

  render() {
    const { isLoading, categoriesTree, tags, token, userId } = this.state;
    if (isLoading) return <Loading />;
    return (
      <React.Fragment>
        <Container className="header">
          <Heading className="has-text-centered">สร้างบทความใหม่</Heading>
        </Container>
        <Container>
          <ArticleForm
            categories={categoriesTree}
            tags={tags}
            token={token}
            id={userId}
          />
        </Container>
      </React.Fragment>
    );
  }
}

export default GetUserToken;
