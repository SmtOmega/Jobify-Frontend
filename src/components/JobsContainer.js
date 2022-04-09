import { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import Job from "./Job";
import Loading from "./Loading";
import styled from "styled-components";
import PageBtnContainer from "./PageBtnContainer";

const JobsContainer = () => {
  const { isLoading, getJobs, jobs, totalJobs, search, searchType, sort, searchStatus, numOfPages, page} = useAppContext();
  useEffect(() => {
    getJobs();
    // eslint-disable-next-line
  }, [search, searchType, searchStatus, sort, page]);
  if (isLoading) {
    return <Loading center />;
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No job to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer/>}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 4rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
  }
  .jobs {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
  @media (min-width: 992px) {
    .jobs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  }
`;
export default JobsContainer;
