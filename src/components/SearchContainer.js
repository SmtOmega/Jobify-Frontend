import styled from "styled-components";
import { useAppContext } from "../context/AppContext";
import FormRow from "./FormRow";
import FormRowSelect from "./FormRowSelect";

const SearchContainer = () => {
  const {
    isLoading,
    search,
    searchType,
    sort,
    sortOptions,
    searchStatus,
    statusOptions,
    jobTypeOptions,
    clearFilters,
    handleChangeGlobal,
  } = useAppContext();

  const handleSearch = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const data = { name, value };
    handleChangeGlobal(data);
  };

  const handleSubmit = e => {
      e.preventDefault()
      clearFilters()
  }
  return (
    <Wrapper>
      <form className="form">
        <h4>Search Form</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="search"
            value={search}
            handleChange={handleSearch}
          />
          <FormRowSelect
            textLabel="status"
            name="searchStatus"
            value={searchStatus}
            handleChange={handleSearch}
            list={["all", ...statusOptions]}
          />
          <FormRowSelect
            textLabel="job type"
            name="searchType"
            value={searchType}
            handleChange={handleSearch}
            list={["all", ...jobTypeOptions]}
          />
          <FormRowSelect
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <button className="btn btn-block btn-danger" onClick={handleSubmit} disabled={isLoading}>clear filters</button>
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form {
    width: 100%;
    max-width: 100%;
  }
  .form-input,
  .form-select,
  .btn-block {
    height: 35px;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
      display: grid;
      grid-template-columns: 1fr;
      row-gap: 0.5rem;
      column-gap: 2rem;
  }
  h5 {
    font-weight: 700;
  }
  .btn-block {
    align-self: end;
    margin-top: 1rem;
  }
  @media (min-width: 768px){
      .form-center{
          grid-template-columns: 1fr 1fr;
      }
  }
  @media (min-width: 992px){
      .form-center{
          grid-template-columns: 1fr 1fr 1fr;
      }
      .btn-block {
          margin-top: 0;
      }
  }
`;
export default SearchContainer;
