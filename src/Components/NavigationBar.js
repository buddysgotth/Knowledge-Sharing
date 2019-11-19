import React, { useState } from 'react';
import { Navbar, Button, Container } from 'react-bulma-components';

const NavigationBar = () => {
  const [active, setActive] = useState(false);
  const handleToggle = () => {
    setActive(!active);
  };

  return (
    <Navbar fixed="top" className="navigation-bar">
      <Container className="navbar-inner">
        <Navbar.Brand>
          <Navbar.Item color="white" className="navbar-logo" href="/">
            <img src="/know-share-logo-only.svg" alt="logo" className="logo" />
          </Navbar.Item>
          <Navbar.Burger
            onClick={handleToggle}
            className={active ? 'is-active' : ''}
          />
        </Navbar.Brand>
        <Navbar.Menu className={active ? 'is-active' : ''}>
          <Navbar.Container position="start">
            <Navbar.Item color="white" href="/">
              หน้าแรก
            </Navbar.Item>
            <Navbar.Item color="white" href="/articles?page=1">
              รายชื่อบทความ
            </Navbar.Item>
          </Navbar.Container>
          <Navbar.Container position="end">
            <Navbar.Item color="white" className="create" href="/create">
              <Button color="link">สร้างบทความ</Button>
            </Navbar.Item>
          </Navbar.Container>
        </Navbar.Menu>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
