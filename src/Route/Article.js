import React from "react";
import PropTypes from "prop-types";
import ArticleDetails from "./../Components/ArticleDetails";

class Article extends React.Component {
  render() {
    return <ArticleDetails articleId={this.props.match.params.id} />;
  }
}

Article.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  })
};

export default Article;
