import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Breadcrumb.css';

const Breadcrumb = ({ year, elements }) => {
  return (
    <ul className='breadcrumb'>
      {elements.map((element, index) => {
        const path = `/${elements.slice(0, index + 1).join('/')}`;
        return (
          <li key={index} className='breadcrumb-item'>
            {index === elements.length - 1 ? (
              element.replace(/_/g, ' ')
            ) : (
              <Link to={`${path}?year=${year}`}>{element.replace(/_/g, ' ')}</Link>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default withRouter(Breadcrumb);
