import React from "react";
import axios from "axios";
import log from "loglevel";
import { Section, Container, Heading } from "react-bulma-components";
import Loading from "./Loading";

import ArticleForm from "./ArticleForm";

class GetUserToken extends React.Component {
  state = {
    isLoading: true,
    categoriesTree: [],
    tags: [],
    token: ""
  };

  componentDidMount() {
    const getCategory = axios.get(`/wp-json/wp/v2/categories?per_page=100`);
    const getTags = axios.get(`/wp-json/wp/v2/tags?per_page=100`);
    const getToken = axios.post(
      "/wp-json/jwt-auth/v1/token",
      { username: "admin-kb", password: "know-share-kb" },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
    );
    Promise.all([getCategory, getTags, getToken]).then(res => {
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
        token: res[2].data.token
      });
      log.debug(this.state.token);
      log.debug("Categories Tree:", this.state.categoriesTree);
      log.debug("Tags:", this.state.tags);
    });
  }

  render() {
    const { isLoading, categoriesTree, tags, token } = this.state;
    if (isLoading) return <Loading />;
    return (
      <Section>
        <Container>
          <Heading>Create a New Article</Heading>
        </Container>
        <Container>
          <ArticleForm categories={categoriesTree} tags={tags} token={token} />
        </Container>
      </Section>
    );
  }
}

export default GetUserToken;
