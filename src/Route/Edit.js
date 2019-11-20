import React from 'react';
import PropTypes from 'prop-types';
import GetArticleAndUserToken from './../Components/GetArticleAndUserToken';
import { Section } from 'react-bulma-components';

class EditArticle extends React.Component {
  render() {
    return (
      <Section>
        <GetArticleAndUserToken articleId={this.props.match.params.id} />
      </Section>
    );
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
