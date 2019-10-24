import React from "react";
import PropTypes from "prop-types";
import log from "loglevel";
import axios from "axios";
import {
  Container,
  Section,
  Heading,
  Columns,
  Button
} from "react-bulma-components";

import Loading from "./Loading";
import CategoriesList from "./CategoriesList";
import CompareArticlesData from "./CompareArticlesData";

class ArticlesList extends React.Component {
  state = {
    isLoading: true,
    articles: [],
    authors: [],
    categories: [],
    tags: [],
    search: this.props.search
  };

  componentDidMount() {
    const getArticlesList = axios.get(
      `/wp-json/wp/v2/articles${this.state.search}`
    );
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

  handleInsertSubheading = params => {
    const { categories } = this.state;
    if (params) {
      const categoryName = categories
        .filter(
          category =>
            category.id ===
            Number(params.slice(params.indexOf("categories") + 11))
        )
        .map(category => category.name)
        .join();
      return (
        <Columns>
          <Columns.Column>
            <Heading subtitle size={5}>
              Search results of "Category = {categoryName}"
            </Heading>
          </Columns.Column>
          <Columns.Column narrow>
            <Button
              size="small"
              className="is-link is-outlined"
              onClick={() => (window.location.search = "")}
            >
              Clear search
            </Button>
          </Columns.Column>
        </Columns>
      );
    }
    return null;
  };

  handleShowArticlesList = articles => {
    const { authors, categories, tags } = this.state;
    if (articles.length === 0) {
      return <p className="has-text-centered has-text-grey">No result</p>;
    }
    return (
      <CompareArticlesData
        articles={articles}
        authors={authors}
        categories={categories}
        tags={tags}
      />
    );
  };

  render() {
    const { isLoading, categories, search, articles } = this.state;

    if (isLoading) {
      return <Loading />;
    }

    return (
      <Section>
        <Container>
          <Heading>All Articles</Heading>
        </Container>
        <Container>
          <Columns breakpoint="tablet">
            <Columns.Column size={3}>
              <CategoriesList categories={categories} />
            </Columns.Column>
            <Columns.Column>
              {this.handleInsertSubheading(search)}
              {this.handleShowArticlesList(articles)}
            </Columns.Column>
          </Columns>
        </Container>
      </Section>
    );
  }
}

ArticlesList.propTypes = {
  search: PropTypes.string
};

export default ArticlesList;
