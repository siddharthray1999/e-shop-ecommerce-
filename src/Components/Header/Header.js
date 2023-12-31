import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import { FaShoppingCart, FaTimes } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase/Config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { SET_ACTIVE_USER } from "../../Pages/Redux/Slice/AuthSlice";
import { REMOVE_ACTIVE_USER } from "../../Pages/Redux/Slice/AuthSlice";
import ShowOnLogin, {
  ShowOnLogout,
} from "../../Components/HiddenLinks/HiddenLink";
const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2>
        e<span>Shop</span>.
      </h2>
    </Link>
  </div>
);

const cart = (
  <span className={styles.cart}>
    <Link to="/cart">
      Cart
      <FaShoppingCart size={20} />
      <p>0</p>
    </Link>
  </span>
);

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };
  const navigate = useNavigate();
  const LogoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout Successfully");
        navigate("/");
        // Sign-out successful.
      })
      .catch((error) => {
        toast.error(error.message);
        // An error happened.
      });
  };
  // moniter currently sign-in user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user);
        // const uid = user.uid;
        // console.log(user.displayName);
        setDisplayName(user.displayName);
        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName,
            userID: user.uid,
          })
        );
        // ...
      } else {
        setDisplayName();
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, displayName]);

  return (
    <header>
      <div className={styles.header}>
        {logo}

        <nav
          className={
            showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`
          }
        >
          <div
            className={
              showMenu
                ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                : `${styles["nav-wrapper"]}`
            }
            onClick={hideMenu}
          ></div>

          <ul onClick={hideMenu}>
            <li className={styles["logo-mobile"]}>
              {logo}
              <FaTimes size={22} color="#fff" onClick={hideMenu} />
            </li>
            <li>
              <NavLink to="/" className={activeLink}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={activeLink}>
                Contact Us
              </NavLink>
            </li>
          </ul>
          <div className={styles["header-right"]} onClick={hideMenu}>
            <span className={styles.links}>
              <ShowOnLogout>
                <NavLink to="/login" className={activeLink}>
                  Login
                </NavLink>
              </ShowOnLogout>
              <ShowOnLogin>
                <a href="#home" style={{color:"#ff7722"}}>
                  <FaUserCircle size={20} /> HI, {displayName}
                </a>{" "}
              </ShowOnLogin>
              {/* <NavLink to="/register" className={activeLink}>
                Register
              </NavLink> */}
              <ShowOnLogin>
                <NavLink to="/order-history" className={activeLink}>
                  My Orders
                </NavLink>
              </ShowOnLogin>
              <ShowOnLogin>
                <NavLink to="/" onClick={LogoutUser}>
                  Logout
                </NavLink>
              </ShowOnLogin>
            </span>
            {cart}
          </div>
        </nav>

        <div className={styles["menu-icon"]}>
          {cart}
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
