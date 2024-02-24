import { Fragment, useContext } from 'react'
import { UserContext } from '../../../contexts/user.context'
import { CartContext } from '../../../contexts/cart.context'
import { Outlet, Link } from 'react-router-dom'
import CardIcon from '../../cart-icon/cart-icon.component'
import CardDropdown from '../../cart-dropdown/cart-dropdown.component'
import { ReactComponent as CrwnLogo } from '../../../assets/crown.svg'
import { signOutUser } from '../../../utils/firebase/firebase.utils'
import './navigation.styles.scss'

const Navigation = () => {
  const { currentUser } = useContext(UserContext)
  const { isCartOpen } = useContext(CartContext)

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <Link className="nav-link" onClick={signOutUser}>
              SIGN OUT
            </Link>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
          <CardIcon />
        </div>
        {isCartOpen && <CardDropdown />}
      </div>
      <Outlet />
    </Fragment>
  )
}

export default Navigation
