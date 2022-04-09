import { useState } from "react";
import styled from "styled-components";
import { Alert, FormRow } from "../../components";
import { useAppContext } from "../../context/AppContext";

const Profile = () => {
  const { user, displayAlert, updateUser, showAlert, isLoading } =
    useAppContext();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [lastName, setLastName] = useState(user?.lastName);
  const [location, setLocation] = useState(user?.location);

  const handleSubmit = (e) => {
      e.preventDefault()
    if (!name || !email || !lastName || !location) {
      displayAlert();
      return;
    }
    const userDetails = { name, email, lastName, location };
    updateUser(userDetails);
  };
  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>Profile</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />
          <FormRow
            type="text"
            TextLabel="Last Name"
            name="lastName"
            value={lastName}
            handleChange={(e) => setLastName(e.target.value)}
          />
          <FormRow
            type="email"
            name="email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <FormRow
            type="text"
            name="location"
            value={location}
            handleChange={(e) => setLocation(e.target.value)}
          />
          <button className="btn btn-block" type="submit">
            {isLoading ? "Please wait...." : "save changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  background: white;
  border-radius: 4px;
  padding: 3rem 2rem 4rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  h3 {
    margin-top: 0;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 0.5rem;
  }
  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
    @media (min-width: 1120px) {
      .form-center {
        grid-template-columns: 1fr 1fr 1fr;
      }
      .form-center button {
        margin-top: 0;
      }
    }
  }
`;
export default Profile;
