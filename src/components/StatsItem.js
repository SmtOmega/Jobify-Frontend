import styled from "styled-components";

const StatsItem = ({ count, bcg, color, icon, title }) => {
  return (
    <Wrapper color={color} bcg={bcg}>
      <header>
        <span className="count">{count}</span>
        <span className="icon">{icon}</span>
      </header>
      <h5 className="title">{title}</h5>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  padding: 2rem;
  background: white;
  border-radius: 4px;
  border-bottom: 5px solid ${(props) => props.color};
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .count {
    display: block;
    font-size: 50px;
    font-weight: 700;
    color: ${(props) => props.color};
  }
  .icon {
    width: 70px;
    height: 60px;
    border-radius: 4px;
    background: ${(props) => props.bcg};
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 2rem;
      color: ${(props) => props.color};
    }
  }
  .title {
    margin: 0;
    text-transform: capitalize;
    letter-spacing: 1px;
    text-align: left;
    margin-top: 0.5rem;
  }
`;
export default StatsItem;
