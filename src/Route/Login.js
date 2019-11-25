import React from 'react';
import LoginPage from '../Components/LoginPage';
import { Section } from 'react-bulma-components';

class Login extends React.Component {
  render() {
    return (
      <Section>
        <LoginPage />
      </Section>
    );
  }
}

export default Login;
