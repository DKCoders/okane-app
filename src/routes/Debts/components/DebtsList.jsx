import React from 'react';
// import PropTypes from 'prop-types';
import Navbar from '../../../components/Navbar';
import MenuButton from '../../../components/MenuButton';
import Search from '../../../components/Search';

const DebtsList = () => (
  <>
    <Navbar
      left={<MenuButton />}
      title="Debts"
      right={(<Search />)}
    />
    DebtsList
  </>
);

DebtsList.propTypes = {};

DebtsList.defaultProps = {};

export default DebtsList;
