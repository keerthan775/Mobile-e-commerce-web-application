import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div id='Home'>
      <Link to='/EmployeeLogin'>employee login</Link>
      <Link to='/CustomerLogin'>customer login</Link>
    </div>
  );
};
