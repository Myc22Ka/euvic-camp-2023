import React, { useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { defaultFetchOptions } from "../constants";

type PQHFromToPropsType = { changeOptions: (newOption: Partial<FetchRequest>) => void };

const PHQFromTo: React.FC<PQHFromToPropsType> = ({ changeOptions }) => {
  const [attendance, setAttendance] = useState({ gte: 0, lte: 0 });

  const handleGte = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newGteValue = +e.target.value;
    setAttendance((prev) => ({ ...prev, gte: newGteValue }));

    changeOptions({ phq_attendance: { ...attendance, gte: newGteValue } });
  };

  const handleLte = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLteValue = +e.target.value;
    setAttendance((prev) => ({ ...prev, lte: newLteValue }));

    changeOptions({ phq_attendance: { ...attendance, lte: newLteValue } });
  };

  return (
    <React.Fragment>
      <FloatingLabel controlId="floatingInput1" label="From">
        <Form.Control
          size="sm"
          type="number"
          defaultValue={defaultFetchOptions.phq_attendance.gte}
          min={0}
          onChange={handleGte}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput2" label="To">
        <Form.Control
          size="sm"
          type="number"
          defaultValue={defaultFetchOptions.phq_attendance.lte}
          min={attendance.gte ? attendance.gte + 1 : 0}
          onChange={handleLte}
        />
      </FloatingLabel>
    </React.Fragment>
  );
};

export default PHQFromTo;
