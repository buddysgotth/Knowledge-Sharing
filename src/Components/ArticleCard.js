import React from "react";
import PropTypes from "prop-types";
import { Columns, Box, Content } from "react-bulma-components";
import { Link } from "react-router-dom";

const ArticleCard = ({
  id,
  title,
  author,
  category,
  tags,
  modifiedDate,
  excerpt
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

  const preview = excerpt.replace(/<p>|<\/p>/gi, "");

  return (
    <Columns.Column size={6}>
      <Box>
        <Content>
          <h2>{title}</h2>
          <div>Category: {category}</div>
          <div>Tags: {tags.map(tag => tag.join(", "))}</div>{" "}
          <div>Author: {author}</div>
          <div>
            Updated Date: {updatedDate.toLocaleString("en-US", options)}
          </div>
          <br />
          <div
            dangerouslySetInnerHTML={{
              __html: "<p>" + preview.slice(0, 150) + "... </p>"
            }}
          />
          <Link to={`/article/${id}`}>Read More...</Link>
        </Content>
      </Box>
    </Columns.Column>
  );
};

ArticleCard.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  author: PropTypes.string,
  category: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  modifiedDate: PropTypes.string,
  excerpt: PropTypes.string
};

export default ArticleCard;
