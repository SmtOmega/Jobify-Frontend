import moment from "moment";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAppContext } from "../context/AppContext";
import JobInfo from "./JobInfo";
import { FaBriefcase,  FaCalendarAlt, FaLocationArrow } from "react-icons/fa";

const Job = ({
  _id,
  position,
  jobLocation,
  status,
  company,
  createdAt,
  jobType,
}) => {
  const { setEditJob, deleteJob } = useAppContext();
  const date = moment(createdAt).format("MM Do, YY");
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className="actions">
            <Link
              to="/add-job"
              className="btn edit-btn"
              onClick={() => setEditJob(_id)}
            >
              Edit
            </Link>
            <button
              className="btn delete-btn"
              type="button"
              onClick={() => deleteJob(_id)}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  background: white;
  border-radius: 4px;
  display: grid;
  grid-template-rows: auto 1fr;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #d9e2ec;
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
  }
  h5 {
    letter-spacing: 0;
  }
  .main-icon {
    width: 60px;
    height: 60px;
    display: grid;
    place-items: center;
    background: #2cb1bc;
    border-radius: 4px;
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    margin-right: 2rem;
    color: white;
  }
  .info {
    h5 {
      margin-bottom: 0.25rem;
    }
    p {
      margin: 0;
      text-transform: capitalize;
      color: #829ab1;
      letter-spacing: 1px;
    }
  }

  .pending {
    background: #fcefc7;
    color: #e9b949;
  }
  .interview {
    background: #e0e8f9;
    color: #647acb;
  }
  .declined {
    color: #d66a6a;
    background: #ffeeee;
  }
  .content {
    padding: 1rem 1.5rem;
  }
  .content-center {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.5rem;

    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }

    @media (min-width: 992px) {
      grid-template-columns: 1fr;
    }
    @media (min-width: 1120px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .status {
    width: 100px;
    height: 30px;
    border-radius: 4px;
    letter-spacing: 1px;
    text-align: center;
    text-transform: capitalize;
  }
  footer {
    margin-top: 1rem;
  }
  .edit-btn,
  .delete-btn {
    cursor: pointer;
    letter-spacing: 1px;
    height: 30px;
  }
  .edit-btn {
    color: #0f5132;
    background-color: #d1e7dd;
    margin-right: 0.25rem;
  }
  .delete-btn {
    color: #842029;
    background: #f8d7da;
  }
`;
export default Job;
