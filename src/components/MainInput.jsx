import { styled } from "@mui/material";
import TextField from "@mui/material/TextField";
export const MainTextField = styled(TextField, {
  // Configure which props should be forwarded on DOM
  shouldForwardProp: (prop) =>
    prop !== "color" && prop !== "variant" && prop !== "sx",
  name: "MyThemeComponent",
  slot: "Root",
  // We are specifying here how the styleOverrides are being applied based on props
  overridesResolver: (props, styles) => [
    styles.root,
    props.color === "primary" && styles.primary,
    props.color === "secondary" && styles.secondary,
  ],
})(({ _theme, _width }) => ({
  width: "100%",
  backgroundColor: "#E8ECF4",
  "& .MuiInputBase-root": {
    display: "flex",
    flexDirection: "column",

    gap: "3px",
    width: "100%",
    height: "56px",
    flex: 1,
  },

  // get rid of unecessary padding
  ".MuiOutlinedInput-input": {
    boxSizing: "border-box",
    height: "auto",
    fontSize: "15.5px",
    backgroundColor: "white",
  },

  // styles the label

  "& .MuiOutlinedInput-root.Mui-focused": {
    "& > fieldset": {
      borderColor: "gray",
    },
  },
  "& label.Mui-focused": {
    color: "rgb(107,107,107)",
  },
}));

// sx={{
//   background: "#F7F8F9",
//   height: "100%",
//   width: "40px",
//   textAlign: "center",
//   fontSize: "1.2em",
// }}
