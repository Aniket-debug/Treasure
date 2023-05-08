import { Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "../styles/global.css";
import lock from "../assets/images/lock.png";
import key from "../assets/images/key.png";
const Game = () => {
  const [seconds, setSeconds] = useState(3);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (seconds > 0) setSeconds(seconds - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [seconds]);
  const [chances, setChances] = useState(5);
  const [hints, setHints] = useState([
    { id: 1, hintText: "F for Something" },
    { id: 2, hintText: "O for Something" },
    { id: 3, hintText: "U for Something" },
    { id: 4, hintText: "N for Something" },
    { id: 5, hintText: "D for Something" },
  ]);
  const [fields, setFields] = useState({
    field1: "",
    field2: "",
    field3: "",
    field4: "",
    field5: "",
  });

  const showHint = () => {
    setHintVisible(true);
  };
  const hintValue = () => {
    if (5 - chances >= 0) {
      return hints[5 - chances].hintText;
    }
    return "You lose";
  };
  const hideHint = () => {
    setHintVisible(false);
  };
  const [hintVisible, setHintVisible] = useState(false);
  const handleChange = (key, value) => {
    setChances(chances - 1);
    setFields({ ...fields, [key]: value.toUpperCase() });
  };
  return (
    <div
      className="container"
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <Typography sx={{ marginBottom: "1rem", marginTop: "5rem" }} variant="h2">
        Tresure Game
      </Typography>
      {seconds > 0 ? (
        <Typography sx={{ letterSpacing: "0.3rem", marginBottom: "2rem" }}>
          Let begin the fun in {seconds}
        </Typography>
      ) : null}

      <div>
        <TextField
          sx={{ width: "5rem" }}
          disabled={fields.field1.length > 0}
          onChange={(event) => handleChange("field1", event.target.value)}
          value={fields.field1}
        ></TextField>
        {fields.field1.length > 0 ? (
          <TextField
            sx={{ width: "5rem" }}
            disabled={fields.field2.length > 0}
            onChange={(event) => handleChange("field2", event.target.value)}
            value={fields.field2}
          ></TextField>
        ) : (
          <img style={{ width: "5rem" }} src={lock}></img>
        )}
        {fields.field2.length > 0 ? (
          <TextField
            sx={{ width: "5rem" }}
            disabled={fields.field3.length > 0}
            onChange={(event) => handleChange("field3", event.target.value)}
            value={fields.field3}
          ></TextField>
        ) : (
          <img style={{ width: "5rem" }} src={lock}></img>
        )}
        {fields.field3.length > 0 ? (
          <TextField
            sx={{ width: "5rem" }}
            disabled={fields.field4.length > 0}
            onChange={(event) => handleChange("field4", event.target.value)}
            value={fields.field4}
          ></TextField>
        ) : (
          <img style={{ width: "5rem" }} src={lock}></img>
        )}
        {fields.field4.length > 0 ? (
          <TextField
            sx={{ width: "5rem" }}
            disabled={fields.field5.length > 0}
            onChange={(event) => handleChange("field5", event.target.value)}
            value={fields.field5}
          ></TextField>
        ) : (
          <img style={{ width: "5rem" }} src={lock}></img>
        )}
      </div>
      {chances === 0 ? null : (
        <div
          className="hint-card"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "2rem 0",
          }}
        >
          Do you want a Hint? <img style={{ width: "5rem" }} src={key} />
          <Button onClick={showHint} variant="text">
            Click here
          </Button>
          {hintVisible ? (
            <div>
              <Typography>{hintValue()}</Typography>
              <Button onClick={hideHint} variant="text">
                Hide Hint
              </Button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Game;
