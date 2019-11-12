import React from "react";
import PropTypes from "prop-types";
import log from "loglevel";
import axios from "axios";
import {
  Container,
  Section,
  Heading,
  Columns,
  Button,
  Form,
  Icon
} from "react-bulma-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faAngleUp,
  faAngleDown
} from "@fortawesome/free-solid-svg-icons";

import Loading from "./Loading";
import AdvancedSearchForm from "./AdvancedSearchForm";
import CompareArticlesData from "./CompareArticlesData";
import PaginationController from "./PaginationController";

class ArticlesList extends React.Component {
  state = {
    isLoading: true,
    isHidden: false,
    articles: [],
    authors: [],
    categories: [],
    categoriesTree: [],
    tags: [],
    tagOptions: [],
    params: this.props.params,
    currentPage: 1,
    totalPages: 1,
    totalArticles: 0,
    search: this.props.search.split("+").join(" ")
  };

  componentDidMount() {
    const { params } = this.state;
    const getArticlesList = axios.get(`/wp-json/wp/v2/articles${params}`);
    const getAuthor = axios.get(`/wp-json/wp/v2/users?per_page=100`);
    const getCategory = axios.get(`/wp-json/wp/v2/categories?per_page=100`);
    const getTags = axios.get(`/wp-json/wp/v2/tags?per_page=100`);

    Promise.all([getArticlesList, getAuthor, getCategory, getTags])
      .then(res => {
        const categories = res[2].data;
        const categoriesTree = categories
          .filter(category => category.parent === 0 && category.id !== 1)
          .map(category => ({
            id: category.id,
            name: category.name,
            children: []
          }));

        categoriesTree.map(parent =>
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
          articles: res[0].data,
          authors: res[1].data,
          categories: res[2].data,
          categoriesTree: categoriesTree,
          tags: res[3].data,
          tagOptions: res[3].data.map(tag => ({
            value: tag.slug,
            label: tag.name,
            id: tag.id
          })),
          currentPage: Number(params.slice(params.indexOf("page") + 5)),
          totalPages: Number(res[0].headers["x-wp-totalpages"]),
          totalArticles: Number(res[0].headers["x-wp-total"])
        });

        log.debug("All articles:", res[0]);
        log.debug("Authors:", res[1].data);
        log.debug("Categories:", res[2].data);
        log.debug("Tags:", res[3].data);
        log.debug("Options:", this.state.tagOptions);
      })
      .catch(error => log.error(error));
  }

  handleOnChange = e => {
    this.setState({ search: e.target.value });
  };

  handleOnSearch = e => {
    if (e.key === "Enter") {
      const { params } = this.state;
      let oldParams = "";
      const searchInput = e.target.value
        .trim()
        .split(" ")
        .join("+");
      log.debug(searchInput);
      if (params.indexOf("search") !== -1) {
        const searchParams = params.slice(
          params.indexOf("search"),
          params.indexOf("&")
        );
        oldParams = params.slice(
          2 + searchParams.length,
          params.indexOf("page")
        );
      } else {
        oldParams = params.slice(1, params.indexOf("page"));
      }
      log.debug(oldParams);
      window.location.search = `?search=${searchInput}&${oldParams}page=1`;
    }
  };

  handleToggle = () => {
    const { isHidden } = this.state;
    this.setState({ isHidden: !isHidden });
  };

  handlePageChange = page => {
    const { params } = this.state;
    if (params.indexOf("&page") !== -1) {
      const oldParams = params.slice(0, params.indexOf("&page"));
      window.location.search = oldParams + `&page=${page}`;
    }
    const oldParams = params.slice(0, params.indexOf("page"));
    window.location.search = oldParams + `page=${page}`;
  };

  handleShowPaginationController = () => {
    const { currentPage, totalPages } = this.state;
    if (totalPages) {
      return (
        <PaginationController
          current={currentPage}
          total={totalPages}
          onChange={this.handlePageChange}
        />
      );
    }
    return null;
  };

  render() {
    const {
      isLoading,
      isHidden,
      articles,
      authors,
      categories,
      tags,
      categoriesTree,
      tagOptions,
      search,
      totalArticles,
      params
    } = this.state;

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
            <Columns.Column size={12}>
              <Columns breakpoint="mobile">
                <Columns.Column>
                  <Form.Control iconLeft>
                    <Form.Input
                      size="medium"
                      placeholder="Search article..."
                      value={search}
                      onChange={this.handleOnChange}
                      onKeyDown={this.handleOnSearch}
                    />
                    <Icon align="left">
                      <FontAwesomeIcon icon={faSearch} />
                    </Icon>
                  </Form.Control>
                </Columns.Column>
                <Columns.Column narrow>
                  <Button
                    size="medium"
                    color="light"
                    onClick={this.handleToggle}
                  >
                    <FontAwesomeIcon
                      icon={isHidden ? faAngleDown : faAngleUp}
                    />
                  </Button>
                </Columns.Column>
              </Columns>
            </Columns.Column>
            <Columns.Column size={12} className={isHidden ? "is-hidden" : ""}>
              <AdvancedSearchForm
                categories={categoriesTree}
                tagOptions={tagOptions}
                select={this.props.select}
                params={params}
              />
            </Columns.Column>
            <Columns.Column size={12}>
              <Heading subtitle size={6}>
                Result: {totalArticles} Article(s)
              </Heading>
            </Columns.Column>
            <Columns.Column>
              <CompareArticlesData
                articles={articles}
                authors={authors}
                categories={categories}
                tags={tags}
              />
            </Columns.Column>
            <Columns.Column size={12}>
              {this.handleShowPaginationController()}
            </Columns.Column>
          </Columns>
        </Container>
      </Section>
    );
  }
}

ArticlesList.propTypes = {
  params: PropTypes.string,
  search: PropTypes.string,
  select: PropTypes.shape({
    category: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.number),
    modified: PropTypes.string
  })
};

ArticlesList.defaultProps = {
  params: "",
  search: "",
  select: {
    category: "0",
    tags: null,
    modified: "0"
  }
};

export default ArticlesList;
