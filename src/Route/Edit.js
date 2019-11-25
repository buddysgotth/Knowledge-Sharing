import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import GetArticleAndUserToken from './../Components/GetArticleAndUserToken';
import { Section } from 'react-bulma-components';

const EditArticle = ({ match }) => {
  const tokenIndex = document.cookie.indexOf('tkn');
  const token = document.cookie.slice(
    tokenIndex + 4,
    document.cookie.indexOf(';', tokenIndex)
  );
  if (tokenIndex === -1 || token === '') {
    return (
      <Redirect
        to={{ pathname: '/login', state: `/edit/${match.params.id}` }}
      />
    );
  }

  return (
    <Section>
      <GetArticleAndUserToken articleId={match.params.id} token={token} />
    </Section>
  );
};

EditArticle.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  })
};

export default EditArticle;
