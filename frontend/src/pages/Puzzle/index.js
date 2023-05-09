import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ClueCard from "../../components/ClueCard";
import { TextField, Typography } from "@mui/material";
import React from "react";
import checked from "../../assets/images/checked.png";
import "./index.css";
import { AppContext } from "../../context/AppContextProvider";
import { Navigate } from "react-router-dom";

const Puzzle = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AppContext);
  const [puzzle, setPuzzle] = useState(null);
  const [clueIndex, setClueIndex] = useState(0);
  const [clueVisible, setClueVisible] = useState(false);
  const [clueText, setClueText] = useState("");
  const [text, setText] = useState("");
  const randomIndexGenerator = (array = []) => {
    return Math.floor(Math.random() * array.length);
  };

  const nextClue = () => {
    if (clueIndex < 5) {
      setClueIndex(clueIndex + 1);
    }
  };
  useEffect(() => {
    axios.get("https://treasure-ujmd.vercel.app/puzzles/").then((response) => {
      const randomIndex = randomIndexGenerator(response.data);
      setPuzzle(response.data[randomIndex]);
    });
  }, []);
  const showClue = () => {
    try {
      getClueByIndex(clueIndex);
      setClueVisible(true);
    } catch (error) {
      return;
    }
  };
  const hideClue = () => {
    setClueVisible(false);
    nextClue();
  };
  const getClueByIndex = (index) => {
    const clues = puzzle?.clues;
    setClueText(clues[index].clue_text);
  };
  const handleClick = () => {
    console.log("button clicked", text);
    if (puzzle?.question?.answerText.toLowerCase() === text.toLowerCase()) {
      alert("Answer Matched");
    }
  };
  if (isAuthenticated) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "5rem",
        }}
      >
        {clueVisible && clueIndex < 5 ? (
          <ClueCard clueText={clueText} hideClue={hideClue} />
        ) : null}
        {puzzle ? (
          <React.Fragment>
            <Typography
              variant="h3"
              sx={{ fontSize: "2rem", letterSpacing: "0.2rem" }}
            >
              {puzzle.question.questionText}
            </Typography>
            <input
              value={text}
              onChange={(event) => setText(event.target.value)}
              className="input-class"
              placeholder="Start typing..."
            />
            <button onClick={handleClick} className="button-check">
              <img className="check-icon" src={checked} />
            </button>
            <Typography component="p">
              Need a clue?{" "}
              <Typography
                onClick={showClue}
                sx={{ color: "blueviolet", fontWeight: 600, cursor: "pointer" }}
                component="span"
              >
                Click
              </Typography>
            </Typography>
          </React.Fragment>
        ) : null}
      </div>
    );
  }
  return(
    <Navigate to='/'/>
  )
};
export default Puzzle;
