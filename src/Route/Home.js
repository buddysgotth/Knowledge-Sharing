import React from 'react';
import TagCloudGenerator from './../Components/TagCloudGenerator';
import { Section } from 'react-bulma-components';

class Home extends React.Component {
  render() {
    return (
      <Section>
        <TagCloudGenerator />
      </Section>
    );
  }
}

export default Home;
