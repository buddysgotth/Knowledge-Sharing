import React from 'react';
import PropTypes from 'prop-types';

import ArticleCard from './ArticleCard';

const ArticlesListView = ({ articles, authors, categories, tags }) => {
  const filterAuthorByArticleID = id => {
    return authors
      .filter(author => author.articleId === id)
      .map(author => author.name)
      .join();
  };

  const filterCategoryByArticleID = id => {
    return categories
      .filter(category => category.articleId === id)
      .map(category => category.name)
      .join();
  };

  const filterTagsByArticleID = id => {
    return tags.filter(tag => tag.articleId === id).map(tag => tag.name);
  };

  return (
    <React.Fragment>
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
    </React.Fragment>
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
  categories: PropTypes.arrayOf(
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
  )
};

export default ArticlesListView;
