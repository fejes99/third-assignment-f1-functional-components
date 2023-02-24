import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavbarItem.css';

const NavbarItem = ({ link, name }) => {
  return (
    <div className='navbar-item'>
      <NavLink to={link}>{name}</NavLink>
    </div>
  );
};

export default NavbarItem;
