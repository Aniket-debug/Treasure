import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import close from '../assets/images/cancel.png'
const ClueCard = ({ clueText, hideClue }) => {
  const [cardColor, setCardColor] = useState("#000");
  const lightColors = [
    '#F7E6D6',
    '#EAEAEA',
    '#D5ECC2',
    '#FFE6CC',
    '#C6E2FF'
  ];
  useEffect(() => {
    const index = Math.floor(Math.random() * lightColors.length);
    setCardColor(lightColors[index]);
  }, []);
  return (
    <div
      style={{
        position: "absolute",
        marginTop:"10rem",
        backdropFilter: "blur(5px)"

      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position:'relative',
          padding: "10rem",
          width: "24rem",
          boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
          borderRadius: "1rem",
          height:"4rem",
          background:cardColor,
          
          
      
          
        }}
      >
    
        <Typography sx={{textAlign:'center', fontSize:"1.5rem", letterSpacing:"0.3rem"}}>{clueText}</Typography>
      <img onClick={hideClue} style={{width:"2rem", position:"absolute", top : 10, right : 10, cursor:'pointer'}} src={close}/>
      </div>
    </div>
  );
};

export default ClueCard;
