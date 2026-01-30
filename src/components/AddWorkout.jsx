import React from "react";
import styled from "styled-components";
import TextInput from "./TextInput"; // Ensure you have this helper or use standard <textarea>
import Button from "./Button"; // Ensure you have this helper or use standard <button>

const Card = styled.div`
  flex: 1;
  min-width: 280px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.primary};
`;

const AddWorkout = ({ workout, setWorkout, addNewWorkout, buttonLoading }) => {
  return (
    <Card>
      <Title>Add New Workout</Title>
      <TextInput
        label="Workout"
        textArea
        rows="10"
        placeholder={`Enter in this format:\n#Legs\n-Back Squat\n-5 setsX15 reps\n-30 kg\n-10 min`}
        value={workout}
        handelChange={(e) => setWorkout(e.target.value)}
      />
      <Button
        text="Add Workout"
        onClick={() => addNewWorkout()}
        isLoading={buttonLoading}
        isDisabled={buttonLoading}
      />
    </Card>
  );
};

export default AddWorkout;