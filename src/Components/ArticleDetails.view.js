import React from "react";
import PropTypes from "prop-types";

const ArticleView = ({
  contents,
  title,
  modifiedDate,
  author,
  category,
  tags
}) => {
  const updatedDate = new Date(modifiedDate);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  };

  return (
    <div>
      <h1>{title}</h1>
      <div>Author: {author}</div>
      <div>Category: {category}</div>
      <div>Tags: {tags.join(", ")}</div>
      <div>Updated date: {updatedDate.toLocaleString("en-US", options)}</div>
      <h2>Description:</h2>
      <div dangerouslySetInnerHTML={{ __html: contents }} />
    </div>
  );
};

ArticleView.propTypes = {
  contents: PropTypes.string,
  title: PropTypes.string,
  modifiedDate: PropTypes.string,
  author: PropTypes.string,
  category: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string)
};

export default ArticleView;
