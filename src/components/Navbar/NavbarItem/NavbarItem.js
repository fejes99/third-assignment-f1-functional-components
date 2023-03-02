import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import './NavbarItem.css';

const NavbarItem = ({ name, link, year, location }) => {
  const isActive = () => {
    const pathName = location.pathname.replace('/', '');
    const queryYear = new URLSearchParams(location.search).get('year');

    return pathName.toLowerCase() === name.toLowerCase() && queryYear === year;
  };

  return (
    <div className='navbar-item'>
      <NavLink to={link} isActive={isActive} activeClassName='active'>
        {name}
      </NavLink>
    </div>
  );
};

export default withRouter(NavbarItem);
