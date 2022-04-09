import { useEffect, useState } from "react";
import styled from "styled-components";
import Logo from "../assets/images/logo.svg";
import { useNavigate } from "react-router-dom";
import { Alert, FormRow } from "../components";
import { useAppContext } from "../context/AppContext";

const initialValue = {
  name: "",
  password: "",
  email: "",
  isMember: false,
};
const Register = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(initialValue);
  const { isLoading, showAlert, displayAlert, registerUser, user, loginUser } =
    useAppContext();

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { name, password, email, isMember } = value;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    const currentUser = { email, password, name };
    if (isMember) {
      const userData = {email, password}
      loginUser(userData)
    } else {
      registerUser(currentUser);
    }
  };

  const toggleMember = () => {
    setValue({ ...value, isMember: !value.isMember });
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3001);
    }
  }, [user, navigate]);
  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <img src={Logo} alt="logo" className="logo" />
        <h3>{value.isMember ? "Login" : "Register"}</h3>
        {showAlert && <Alert />}

        {!value.isMember && (
          <FormRow
            handleChange={handleChange}
            type="text"
            name="name"
            value={value.name}
          />
        )}

        <FormRow
          handleChange={handleChange}
          type="email"
          name="email"
          value={value.email}
        />
        <FormRow
          handleChange={handleChange}
          type="password"
          name="password"
          value={value.password}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          Submit
        </button>
        <p>
          {value.isMember ? "Not a Member Yet?" : "Already a member?"}
          <button type="button" className="member-btn" onClick={toggleMember}>
            {value.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.35rem;
  }

  h3 {
    text-align: center;
  }
  .form {
    max-width: 400px;
    border-top: 5px solid #2cb1bc;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: #2cb1bc;
    letter-spacing: 1px;
    cursor: pointer;
  }
`;
export default Register;
