import React from 'react';
import axios from 'axios';
import log from 'loglevel';
import { Container, Heading } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

import LoginForm from './LoginForm';
import Loading from './Loading';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      name: '',
      slug: '',
      loggedIn: false,
      isLoading: false,
      error: ''
    };
  }

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleOnLogin = e => {
    if (e.key === 'Enter') {
      const { username, password } = this.state;
      this.onLogin(username, password);
    }
  };

  handleOnClick = () => {
    const { username, password } = this.state;
    this.onLogin(username, password);
  };

  onLogin = async (username, password) => {
    const loginData = {
      username: username,
      password: password
    };
    this.setState({ isLoading: true });
    await axios
      .post(process.env.REACT_APP_AUTHORIZATION_URL, loginData, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })
      .then(res => {
        this.setState({
          token: res.data.token,
          name: res.data.user_display_name,
          slug: res.data.user_nicename,
          loggedIn: true
        });
        document.cookie = `tkn=${res.data.token}; max-age=604800;`;
        document.cookie = `name=${res.data.user_display_name}; max-age=604800;`;
        document.cookie = `slug=${res.data.user_nicename}; max-age=604800;`;
        log.debug(res.data);
      })
      .then(() => {
        if (window.history.state) {
          return (window.location = window.history.state.state);
        }
        return (window.location = '/');
      })
      .catch(err => {
        this.setState({
          error: 'กรุณากรอก username หรือ password ให้ถูกต้อง',
          isLoading: false
        });
        log.error(err.response.data);
      });
  };

  handleError = error => {
    if (error) {
      return (
        <Heading size={6} subtitle className="has-text-danger">
          <FontAwesomeIcon icon={faExclamationCircle} /> {error}
        </Heading>
      );
    }
    return null;
  };

  render() {
    const { username, password, error, isLoading } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    return (
      <Container className="login-form">
        <Heading className="has-text-centered">เข้าสู่ระบบ</Heading>
        <LoginForm
          username={username}
          password={password}
          onChange={this.handleOnChange}
          onKeyDown={this.handleOnLogin}
          onClick={this.handleOnClick}
        />
        {this.handleError(error)}
      </Container>
    );
  }
}

export default LoginPage;
