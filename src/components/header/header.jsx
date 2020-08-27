import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon';
import CartDropdown from '../cart-dropdown/cart-dropdown';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

//import { ReactComponent as Logo } from '../../assets/crown.svg';
import Logo from '../../assets/logo.png';
import './header.scss';

const Header = ({ currentUser, hidden }) => (
  <div className='header'>
    <Link className='logo-container' to='/'>
      <img src={Logo} alt="Logo"  className="Logo"/>
    </Link>
    <div className='options'>
      <Link className='option' to='/shop'>
        MEN
      </Link>
      <Link className='option' to='/shop'>
        WOMEN
      </Link>
      <Link className='option' to='/shop'>
        KIDS
      </Link>
      <Link className='option' to='/shop'>
        BRANDS
      </Link>
      <Link className='option' to='/shop'>
        OFFERS
      </Link>
      {currentUser ? (
        <div className='option' onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      ) : (
        <Link className='option' to='/signin'>
          SIGN IN
        </Link>
      )}
      <CartIcon />
    </div>
    {hidden ? null : <CartDropdown />}
  </div>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);