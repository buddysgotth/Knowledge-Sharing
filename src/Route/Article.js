import React from 'react';
import PropTypes from 'prop-types';
import ArticleDetails from './../Components/ArticleDetails';
import { Section } from 'react-bulma-components';

class Article extends React.Component {
  render() {
    return (
      <Section>
        <ArticleDetails articleId={this.props.match.params.id} />
      </Section>
    );
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
