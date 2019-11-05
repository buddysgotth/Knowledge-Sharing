import React from "react";
import PropTypes from "prop-types";
import GetArticleAndUserToken from "./../Components/GetArticleAndUserToken";

class EditArticle extends React.Component {
  render() {
    return <GetArticleAndUserToken articleId={this.props.match.params.id} />;
  }
}

EditArticle.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  })
};

export default EditArticle;
