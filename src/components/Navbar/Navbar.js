import React from 'react';

import './Navbar.css';
import NavbarItem from './NavbarItem/NavbarItem';

const Navbar = ({ year }) => {
  const navigationItems = [
    {
      name: 'Drivers',
      link: `/drivers?year=${year}`,
    },
    {
      name: 'Constructors',
      link: `/constructors?year=${year}`,
    },
    {
      name: 'Races',
      link: `/races?year=${year}`,
    },
  ];

  let navbarItems = navigationItems.map((item) => {
    return <NavbarItem key={item.name} name={item.name} link={item.link} year={year} />;
  });
  return (
    <div className='navbar'>
      <div className='navbar-nav'>{navbarItems}</div>
    </div>
  );
};

export default Navbar;
