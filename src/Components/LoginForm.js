import React from 'react';
import { Box, Form, Button } from 'react-bulma-components';

const LoginForm = ({ username, password, onChange, onKeyDown, onClick }) => {
  const handleOnChange = event => {
    onChange(event);
  };

  const handleOnLogin = event => {
    onKeyDown(event);
  };

  const handleOnClick = () => {
    onClick();
  };

  return (
    <Box>
      <Form.Field>
        <Form.Label>Username</Form.Label>
        <Form.Input
          name="username"
          onChange={handleOnChange}
          onKeyDown={handleOnLogin}
          value={username}
        />
      </Form.Field>
      <Form.Field>
        <Form.Label>Password</Form.Label>
        <Form.Input
          type="password"
          name="password"
          onChange={handleOnChange}
          onKeyDown={handleOnLogin}
          value={password}
        />
      </Form.Field>
      <Button onClick={handleOnClick} color="link">
        เข้าสู่ระบบ
      </Button>
    </Box>
  );
};

export default LoginForm;
