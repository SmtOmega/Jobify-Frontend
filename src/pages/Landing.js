import logo from "../assets/images/logo.svg";
import main from "../assets/images/main.svg";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <img src={logo} alt="jobify" className="logo" />
      </nav>
      <div className="container page">
        <div>
          <h1>
            Job <span>Tracking</span> App
          </h1>
          <p>
            I'm baby lo-fi vaporware sustainable aesthetic, gluten-free
            thundercats slow-carb raw denim austin. Marfa disrupt quinoa
            cardigan chartreuse.
          </p>
          <Link to="/register"className="btn">Login/Register</Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  nav {
    width: 90vw;
    max-width: 1200px;
    margin: 0 auto;
    height: 6rem;
    display: flex;
    align-items: center;
  }
  .page {
    min-height: calc(100vh - 6rem);
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }
  p{
      color: #14919b ;
  }
  .main-img{
      display: none;
  }
  @media (min-width: 992px){
      .page{
          grid-template-columns: 1fr 1fr;
          column-gap: 3rem;
      }
      .main-img{
          display: block ;
      }
  }
`;
export default Landing;
