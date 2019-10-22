import React from "react";
import PropTypes from "prop-types";
import log from "loglevel";

import CategoriesView from "./CategoriesList.view";

const CategoriesList = ({ categories }) => {
  const categoriesTree = [];

  const handleFilterCategoriesByParentID = categories => {
    // filter all parent categories (but not include 'uncategorize')
    categories
      .filter(category => category.parent === 0 && category.id !== 1)
      .map(category =>
        categoriesTree.push({
          id: category.id,
          name: category.name,
          children: []
        })
      );
    // push all children in their parent category
    categoriesTree.map(parentCategory =>
      categories
        .filter(category => category.parent === parentCategory.id)
        .map(category =>
          parentCategory.children.push({
            id: category.id,
            name: category.name
          })
        )
    );
    log.debug("Tree List:", categoriesTree);
    return categoriesTree;
  };

  return (
    <CategoriesView
      categoriesTree={handleFilterCategoriesByParentID(categories)}
    />
  );
};

const categoriesPropTypes = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  parent: PropTypes.number
});

CategoriesList.propTypes = {
  categories: PropTypes.arrayOf(categoriesPropTypes)
};

export { categoriesPropTypes };
export default CategoriesList;
