import React from "react";
import PropTypes from "prop-types";
import { Container, Section, Heading, Columns } from "react-bulma-components";

import ArticleCard from "./ArticleCard";
import CategoriesList, { categoriesPropTypes } from "./CategoriesList";

const ArticlesListView = ({
  articles,
  authors,
  categoryNameList,
  tags,
  categoriesData
}) => {
  const filterAuthorByArticleID = id => {
    return authors
      .filter(author => author.articleId === id)
      .map(author => author.name)
      .join();
  };

  const filterCategoryByArticleID = id => {
    return categoryNameList
      .filter(category => category.articleId === id)
      .map(category => category.name)
      .join();
  };

  const filterTagsByArticleID = id => {
    return tags.filter(tag => tag.articleId === id).map(tag => tag.name);
  };

  return (
    <Section>
      <Container>
        <Heading>All Articles</Heading>
      </Container>
      <Container>
        <Columns breakpoint="tablet">
          <Columns.Column size={3}>
            <CategoriesList categories={categoriesData} />
          </Columns.Column>
          <Columns.Column>
            {articles.map(article => (
              <ArticleCard
                key={article.id}
                id={article.id}
                title={article.title.rendered}
                author={filterAuthorByArticleID(article.id)}
                category={filterCategoryByArticleID(article.id)}
                tags={filterTagsByArticleID(article.id)}
                modifiedDate={article.modified}
                excerpt={article.excerpt.rendered}
              />
            ))}
          </Columns.Column>
        </Columns>
      </Container>
    </Section>
  );
};

ArticlesListView.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.shape({
        rendered: PropTypes.string
      }),
      excerpt: PropTypes.shape({
        rendered: PropTypes.string
      }),
      modified: PropTypes.string
    })
  ),
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      articleId: PropTypes.number,
      name: PropTypes.arrayOf(PropTypes.string)
    })
  ),
  categoryNameList: PropTypes.arrayOf(
    PropTypes.shape({
      articleId: PropTypes.number,
      name: PropTypes.arrayOf(PropTypes.string)
    })
  ),
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      articleId: PropTypes.number,
      name: PropTypes.arrayOf(PropTypes.string)
    })
  ),
  categoriesData: PropTypes.arrayOf(categoriesPropTypes)
};

export default ArticlesListView;
