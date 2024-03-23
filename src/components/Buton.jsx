import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

export const MainButton = styled(Button, {
  // Configure which props should be forwarded on DOM
  shouldForwardProp: (prop) =>
    prop !== "color" && prop !== "variant" && prop !== "sx",
  name: "MyThemeComponent",
  slot: "Root",

  overridesResolver: (props, styles) => [
    styles.root,
    props.color === "primary" && styles.primary,
    props.color === "secondary" && styles.secondary,
  ],
})(({ _theme, width }) => ({
  color: "#FFFFFF",
  textTransform: "none",
  fontFamily: "Mulish",
  fontSize: "16px",
  fontStyle: "normal",
  borderRadius: "8px",
  backgroundColor: "#FF6D6A",
  lineHeight: "26px",
  letterSpacing: "0.46px",
  height: "56px",
  width: "100%",
  minWidth: width,

  "&:hover": {
    backgroundColor: "#ff8247",
  },
}));
