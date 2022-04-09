import styled from "styled-components";
import { FaAlignLeft, FaCaretDown, FaUserCircle } from "react-icons/fa";
import logo from "../assets/images/logo.svg";
import { useAppContext } from "../context/AppContext";
import { useState } from "react";

const NavBar = () => {
  const {toggleSideBar, logoutUser, user} = useAppContext()
  const [showLogout, setShowLogout] = useState(false)
  return (
    <Wrapper>
      <div className="nav-center">
        <button className="toggle-btn" onClick={toggleSideBar}>
          <FaAlignLeft />
        </button>
        <div>
          <div>
            <img src={logo} alt="logo"  className="logo"/>
          </div>
          <h3 className="logo-text"> dashboard</h3>
        </div>
        <div className="btn-container">
          <button
            className="btn"
            onClick={() => setShowLogout(!showLogout)}
            type="button"
          >
            <FaUserCircle />
            {user && user.name}
            <FaCaretDown />
          </button>
          <div className={showLogout ? 'drop-down show-drop-down': 'drop-down'}>
            <button className="dropdown-btn" type="button" onClick={logoutUser}>
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
height: 6rem;
display: flex;
align-items: center;
justify-content: center;
box-shadow: 0 1px 0px 0px rgba(0, 0, 0, 0.1);
background: white;

.logo{
    display: flex;
    align-items: center;
    width: 100px;
}
.nav-center {
  display: flex;
  width: 90vw;
  align-items: center;
  justify-content: space-between;
}
.logo-text {
  display: none;
  margin: 0;
}

.toggle-btn {
  background: transparent;
  border-color: transparent;
  cursor: pointer;
  font-size: 1.75rem;
  color: #2cb1bc;
  display: flex;
  align-items: center;
}
.btn-container {
  position: relative;
}
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  gap: 0 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.drop-down {
  position: absolute;
  top: 40px;
  left: 0;
  width: 100%;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
    background: #bef8fd;
    padding: 0.5rem;
    text-align: center;
    border-radius: 4px;
    visibility: hidden;
}
.show-drop-down {
  visibility: visible;
}
.dropdown-btn {
  background: transparent;
  border-color: transparent;
  color: #2cb1bc;
  cursor: pointer;
  text-transform: capitalize;
  letter-spacing: 1px;
}
@media (min-width: 992px){
  position: sticky;
  top: 0;
  .nav-center {
    width: 90%;
  }
  .logo {
    display: none;
    margin: 0;
  }
  .logo-text {
    display: block;
  }
}
`;
export default NavBar;
