import { FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/images/logo.svg";
import { useAppContext } from "../context/AppContext";
import { links } from "../utils/links";

const SmallSideBar = () => {
  const { showSideBar, toggleSideBar } = useAppContext();
  return (
    <Wrapper>
      <div
        className={
          showSideBar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button type="button" className="close-btn" onClick={toggleSideBar}>
            <FaTimes />
          </button>
          <header>
            <div>
              <img src={logo} alt="logo" className="logo" />
            </div>
          </header>
          <div className="nav-links">
            {links.map((link) => {
              const { id, text, path, icon } = link;
              return (
                <NavLink
                  key={id}
                  to={path}
                  onClick={toggleSideBar}
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  <span className="icon">{icon}</span>
                  {text}
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.aside`
  @media (min-width: 992px) {
    display: none;
  }
  .sidebar-container {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1;
    transition: 0.3s ease-in-out all;
    opacity: 0;
  }
  .show-sidebar {
    opacity: 1;
    z-index: 99;
  }
  .content {
    background: white;
    width: 90vw;
    height: 95vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
    padding: 4rem 2rem;
    border-radius: 4px;
  }
  .close-btn {
    position: absolute;
    top: 10px;
    left: 10px;
    background: transparent;
    border-color: transparent;
    font-size: 2rem;
    color: red;
    cursor: pointer;
  }
  .nav-links {
    padding-top: 2rem;
    display: flex;
    flex-direction: column;
  }
  .nav-link {
      display: flex;
      align-items: center;
      color: #627d98;
      padding: 1rem 0;
      text-transform: capitalize;
      transition: all 0.3s ease-in-out;

  }
  .nav-link:hover {
      color: #102a43;
  }
  .nav-link:hover .icon {
      color: #2cb1bc;
  }
  .icon {
      font-size: 1.5rem;
      margin-right: 1rem;
      display: grid;
      place-items: center;
      transition: all 0.3s ease-in-out;
  }
  .active {
      color: #102a43;
  }
  .active .icon {
      color: #2cb1bc;
  }
`;
export default SmallSideBar;
