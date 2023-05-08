import { Button } from "@mui/material";
const SubmitButton = () => {
  return (
    <Button sx={styles.buttonStyle} type="submit" variant="contained" color="primary">
      Done
    </Button>
  );
};
const styles = {
  buttonStyle: {
    marginY: "1rem",
    textTransform: "uppercase",
  },
};
export default SubmitButton;