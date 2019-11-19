import React from 'react';
import PropTypes from 'prop-types';
import ArticlesListView from './ArticlesList.view';

import { Columns } from 'react-bulma-components';

const CompareArticlesData = ({ articles, authors, categories, tags }) => {
  const authorIdList = articles.map(article => ({
    articleId: article.id,
    value: article.author
  }));

  const categoryIdList = articles.map(article => ({
    articleId: article.id,
    value: article.categories[0]
  }));

  const tagsIdList = articles.map(article => ({
    articleId: article.id,
    value: article.tags
  }));

  const authorNameList = authorIdList.map(item => ({
    articleId: item.articleId,
    name: authors
      .filter(author => {
        return author.id === item.value;
      })
      .map(author => author.name)
  }));

  const categoryNameList = categoryIdList.map(item => ({
    articleId: item.articleId,
    name: categories
      .filter(category => {
        return category.id === item.value;
      })
      .map(category => category.name)
  }));

  const tagsNameList = tagsIdList.map(item => ({
    articleId: item.articleId,
    name: item.value.map(tagId =>
      tags
        .filter(tag => {
          return tag.id === tagId;
        })
        .map(tag => tag.name)
        .join('')
    )
  }));

  return (
    <Columns>
      <ArticlesListView
        articles={articles}
        authors={authorNameList}
        categories={categoryNameList}
        tags={tagsNameList}
      />
    </Columns>
  );
};

export default CompareArticlesData;

CompareArticlesData.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      authors: PropTypes.number,
      categories: PropTypes.arrayOf(PropTypes.number),
      tags: PropTypes.arrayOf(PropTypes.number)
    })
  ),
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    })
  ),
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    })
  ),
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    })
  )
};
