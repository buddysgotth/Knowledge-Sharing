import React from 'react';
import { Navbar } from 'react-bulma-components';

const UserButton = () => {
  const nameIndex = document.cookie.indexOf('name');
  const nameLastIndex = document.cookie.indexOf(';', nameIndex);
  let user;
  if (nameLastIndex !== -1) {
    user = document.cookie.slice(
      nameIndex + 5,
      document.cookie.indexOf(';', nameIndex)
    );
  } else {
    user = document.cookie.slice(nameIndex + 5);
  }

  if (nameIndex !== -1 && user !== '') {
    return (
      <Navbar.Item className="user" dropdown hoverable>
        <Navbar.Link>{user}</Navbar.Link>
        <Navbar.Dropdown>
          <Navbar.Item href="/dashboard">บทความของฉัน</Navbar.Item>
          <Navbar.Item href="/logout">ออกจากระบบ</Navbar.Item>
        </Navbar.Dropdown>
      </Navbar.Item>
    );
  }
  return <Navbar.Item href="/login">เข้าสู่ระบบ</Navbar.Item>;
};

export default UserButton;
