import styled from "styled-components";
import { useAppContext } from "../context/AppContext";
import logo from "../assets/images/logo.svg";
import { links } from "../utils/links";
import { NavLink } from "react-router-dom";

const BigSideBar = () => {
  const { showSideBar } = useAppContext();
  return (
    <Wrapper>
      <div
        className={
          showSideBar ? "sidebar-container" : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
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
  display: none;
  @media (min-width: 992px) {
    display: block;
    box-shadow: 1px 0px 0px 0px rgba(0, 0, 0, 0.1);
  }

  .sidebar-container {
    background: white;
    min-height: 100vh;
    height: 100%;
    width: 250px;
    margin-left: -250px;
    transition: all 0.3s ease-in-out;
  }
  .show-sidebar {
    margin-left: 0;
  }
  .content {
    position: sticky;
    top: 0;
  }
  header {
    height: 6rem;
    display: flex;
    align-items: center;
    margin-left: 2.5rem;
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
    padding-left: 2.5rem;
    text-transform: capitalize;
    transition: all 0.3s ease-in-out;
  }

  .nav-link:hover {
    background: #f0f4f8;
    padding-left: 3rem;
    color: #102a43;
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

export default BigSideBar;
