import React from 'react';
// import PropTypes from 'prop-types';
import Navbar from '../../../components/Navbar';
import MenuButton from '../../../components/MenuButton';
import Search from '../../../components/Search';

const CategoriesList = () => (
  <>
    <Navbar
      left={<MenuButton />}
      title="Categories"
      right={(<Search />)}
    />
    CategoriesList
  </>
);

CategoriesList.propTypes = {};

CategoriesList.defaultProps = {};

export default CategoriesList;
