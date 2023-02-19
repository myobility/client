import styled from "styled-components";
import React, { useEffect, useState } from "react";
import moment from "moment";

export const ClockContainer = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400&display=swap");
  font-family: "Inter", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  color: #4b4b4b;
  margin: auto;
  line-height: 3rem;
  padding-left: 55rem;
`;

export const TimeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin: auto;
`;

export const StyledClock = styled.div`
  font-size: 58px;
  padding: auto;
`;

export const DayNight = styled.div`
  font-size: 24px;
  position: relative;
  top: -13px;
`;

export const StyledDate = styled.div`
  font-size: 35px;
  position: relative;
  left: 3px;
`;

// export const Clock = () => {
const ClockUI = () => {
  const [time, setTime] = useState(moment().format("hh:mm"));
  const [daynight, setDaynight] = useState(moment().format("a").toUpperCase());
  const [date, setDate] = useState(moment().format("MMM Do ddd"));

  useEffect(() => {
    const id = setInterval(() => {
      setTime(moment().format("hh:mm"));
    }, 1000);
    const id2 = setInterval(() => {
      setDaynight(moment().format("a").toUpperCase());
    }, 1000);
    const id3 = setInterval(() => {
      setDate(moment().format("MMM Do ddd"));
    }, 10000);
  }, []);

  return (
    <>
      <ClockContainer>
        <TimeContainer>
          <StyledClock>{time}</StyledClock>
          <DayNight>{daynight}</DayNight>
        </TimeContainer>
        <StyledDate>{date}</StyledDate>
      </ClockContainer>
    </>
  );
};

export const Clock = () => {
  return (
    <>
      <ClockUI />
    </>
  );
};
