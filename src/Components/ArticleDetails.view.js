import React from "react";
import PropTypes from "prop-types";
import { Container, Section, Heading, Content } from "react-bulma-components";

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
    <Section>
      <Container className="has-text-centered">
        <Heading>{title}</Heading>
      </Container>
      <Container>
        <div>Author: {author}</div>
        <div>Category: {category}</div>
        <div>Tags: {tags.join(", ")}</div>
        <div>Updated date: {updatedDate.toLocaleString("en-US", options)}</div>
      </Container>
      <Container>
        <Content>
          <div dangerouslySetInnerHTML={{ __html: contents }} />
        </Content>
      </Container>
    </Section>
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
