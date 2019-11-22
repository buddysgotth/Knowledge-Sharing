import React from 'react';
import GetUserToken from './../Components/GetUserToken';
import { Redirect } from 'react-router-dom';
import { Section } from 'react-bulma-components';

const CreateArticle = () => {
  const tokenIndex = document.cookie.indexOf('tkn');
  const token = document.cookie.slice(
    tokenIndex + 4,
    document.cookie.indexOf(';', tokenIndex)
  );
  if (tokenIndex === -1 || token === '') {
    return <Redirect to={{ pathname: '/login', state: '/create' }} />;
  }
  return (
    <Section>
      <GetUserToken token={token} />
    </Section>
  );
};

export default CreateArticle;
