import React from "react";
import { Section, Container, Loader } from "react-bulma-components";

const Loading = () => {
  return (
    <Section>
      <Container className="has-text-centered">
        <Loader className="is-inline-block" /> <span>Loading...</span>
      </Container>
    </Section>
  );
};

export default Loading;
