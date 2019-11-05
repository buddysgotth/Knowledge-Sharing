import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Container,
  Section,
  Heading,
  Content,
  Box
} from "react-bulma-components";

const ArticleView = ({
  id,
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
    <Section>
      <Container>
        <Box className="is-shadowless is-marginless">
          <Heading className="has-text-centered">{title}</Heading>
        </Box>
        <Box className="is-shadowless is-marginless">
          <div>Author: {author}</div>
          <div>Category: {category}</div>
          <div>Tags: {tags.join(", ")}</div>
          <div>
            Updated date: {updatedDate.toLocaleString("en-US", options)}
          </div>
          <div>
            <Link to={`/edit/${id}`}>Edit Article</Link>
          </div>
        </Box>
        <Box className="is-shadowless is-marginless">
          <Content>
            <div dangerouslySetInnerHTML={{ __html: contents }} />
          </Content>
        </Box>
      </Container>
    </Section>
  );
};

ArticleView.propTypes = {
  id: PropTypes.string,
  contents: PropTypes.string,
  title: PropTypes.string,
  modifiedDate: PropTypes.string,
  author: PropTypes.string,
  category: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string)
};

export default ArticleView;
