import React, { Component } from 'react';

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

export class Navbar extends Component {
  render() {
    let navbarItems = navigationItems.map((item) => {
      return <NavbarItem key={item.name} name={item.name} link={item.link} />;
    });
    return (
      <div className='navbar'>
        <div className='navbar-nav'>{navbarItems}</div>
      </div>
    );
  }
}

export default Navbar;
