import { useAppContext } from "../context/AppContext";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import styled from "styled-components";

const PageBtnContainer = () => {
  const { numOfPages, page, changePage } = useAppContext();

  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });

  const prevPage = () => {
      let newPage = page -1
      if(newPage < 1){
          newPage = numOfPages
      }
      changePage(newPage)
  };
  const nextPage = () => {
      let newPage = page + 1
      if(newPage > numOfPages){
          newPage = 1
      }
      changePage(newPage)
  };
  return (
    <Wrapper>
      <button className="prev-btn" onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">
        {pages.map((pageNum) => {
          return (
            <button
              key={pageNum}
              type="button"
              className={pageNum === page ? "page-btn active" : "page-btn"}
              onClick={() => changePage(pageNum)}
            >
              {pageNum}
            </button>
          );
        })}
      </div>
      <button className="next-btn" onClick={nextPage}>
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  height: 6rem;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 1rem;
  .btn-container {
    background: #bef8fd;
    border-radius: 4px;
  }
  .page-btn {
    background: transparent;
    border-color: transparent;
    height: 40px;
    width: 50px;
    font-weight: 700;
    font-size: 1.25rem;
    color: #2cb1bc;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    border-radius: 4px;
  }
  .active {
    background: #2cb1bc;
    color: white;
  }
  .prev-btn,
  .next-btn {
    width: 100px;
    height: 40px;
    background: white;
    border-color: transparent;
    color: #2cb1bc;
    text-transform: capitalize;
    letter-spacing: 1px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }
  .prev-btn:hover,
  .next-btn:hover {
    background: #2cb1bc;
    color: white;
  }
`;
export default PageBtnContainer;
