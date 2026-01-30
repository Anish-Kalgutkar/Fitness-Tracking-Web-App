import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import WorkoutCard from "../components/cards/WorkoutCard";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers";
import { getWorkouts } from "../api";
import { CircularProgress } from "@mui/material";

// --- STYLED COMPONENTS (RESTORED) ---
const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 22px 0px;
  overflow-y: scroll;
`;
const Wrapper = styled.div`
  flex: 1;
  max-width: 1600px;
  display: flex;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
    flex-direction: column;
  }
`;
const Left = styled.div`
  flex: 0.2;
  height: fit-content;
  padding: 18px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
`;
const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.primary};
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;
const Right = styled.div`
  flex: 1;
`;
const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-bottom: 100px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 16px;
  gap: 22px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;
const SecTitle = styled.div`
  font-size: 22px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
`;

// --- MAIN COMPONENT ---
const Workouts = () => {
  const [todaysWorkouts, setTodaysWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");

  // useCallback fixes the "missing dependency" warning
  const getTodaysWorkout = useCallback(async () => {
    setLoading(true);
    const token = localStorage.getItem("fittrack-app-token");
    try {
      const res = await getWorkouts(token, date ? `?date=${date}` : "");
      setTodaysWorkouts(res?.data?.todaysWorkouts || []);
    } catch (err) {
      console.error("Error fetching workouts:", err);
      setTodaysWorkouts([]);
    } finally {
      setLoading(false);
    }
  }, [date]);

  useEffect(() => {
    getTodaysWorkout();
  }, [getTodaysWorkout]);

  return (
    <Container>
      <Wrapper>
        <Left>
          <Title>Select Date</Title>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              onChange={(e) => setDate(`${e.$M + 1}/${e.$D}/${e.$y}`)}
            />
          </LocalizationProvider>
        </Left>
        <Right>
          <Section>
            <SecTitle>Workouts for {date || "Today"}</SecTitle>
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
                <CircularProgress />
              </div>
            ) : (
              <CardWrapper>
                {todaysWorkouts?.length > 0 ? (
                  todaysWorkouts.map((workout, index) => (
                    <WorkoutCard key={`workout-idx-${index}`} workout={workout} />
                  ))
                ) : (
                  <div style={{ color: 'gray', textAlign: 'center', width: '100%' }}>
                    No workouts found for this date.
                  </div>
                )}
              </CardWrapper>
            )}
          </Section>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Workouts;