import React from 'react';

import './Navbar.css';
import NavbarItem from './NavbarItem/NavbarItem';

const navigationItems = [
  {
    name: 'Drivers',
    link: '/drivers',
  },
  {
    name: 'Constructors',
    link: '/constructors',
  },
  {
    name: 'Races',
    link: '/races',
  },
];

const Navbar = () => {
  let navbarItems = navigationItems.map((item) => {
    return <NavbarItem key={item.name} name={item.name} link={item.link} />;
  });
  return (
    <div className='navbar'>
      <div className='navbar-nav'>{navbarItems}</div>
    </div>
  );
};

export default Navbar;
