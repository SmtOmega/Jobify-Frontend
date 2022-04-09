import { useState } from "react";
import styled from "styled-components";
import { useAppContext } from "../context/AppContext";
import AreaChart from "./AreaChart";
import BarChartCon from "./BarChart";


const ChartContainer = () => {
  const [barChart, setBarChart] = useState(true);
  const { monthlyApplications: data } = useAppContext();
  return (
    <Wrapper>
      <h4>Monthly Applications Chart</h4>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? "Area Chart" : "Bar Chart"}
      </button>
      {barChart ? <BarChartCon data={data} /> : <AreaChart data={data} />}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 4rem;
  text-align: center;
  button {
      background: transparent;
      color: #2cb1bc;
      border-color: transparent;
      font-size: 1.25rem;
      text-transform: capitalize;
      cursor: pointer;

  }
  h4{ 
      text-align: center;
      margin-bottom: 0.75rem;
  }
`;
export default ChartContainer;
