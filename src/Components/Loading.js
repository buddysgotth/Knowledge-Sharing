import React from 'react';
import { Container, Loader } from 'react-bulma-components';

const Loading = () => {
  return (
    <Container className="has-text-centered">
      <Loader className="is-inline-block" /> <span> กำลังโหลด...</span>
    </Container>
  );
};

export default Loading;
