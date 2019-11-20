import React from 'react';
import GetUserToken from './../Components/GetUserToken';
import { Section } from 'react-bulma-components';

class CreateArticle extends React.Component {
  render() {
    return (
      <Section>
        <GetUserToken />
      </Section>
    );
  }
}

export default CreateArticle;
