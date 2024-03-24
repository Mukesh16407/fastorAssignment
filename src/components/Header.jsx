import { NavLink } from "react-router-dom";
import useInternetStatus from "../hooks/useInternetStatus";
import { AppBar, Toolbar, Button } from "@mui/material";

const Header = () => {
  const onlineStatus = useInternetStatus();

  return (
    <AppBar
      position="sticky"
      style={{ backgroundColor: "#FFFDD0", color: "black" }}
    >
      <Toolbar style={{ minHeight: "50px", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            component={NavLink}
            exact
            to="/"
            activeClassName="activeLink"
            color="inherit"
            style={{ marginRight: "10px" }}
          >
            Home
          </Button>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          {onlineStatus ? (
            <>
              <img
                className="header_icon"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDZ3lLdKPnX8VF6dSV0-TR5kBl-6qoi_tPfyoRuoBfdr3HHPzyas3a1cl8geSyT1G7fgQ&usqp=CAU"
                alt=""
                width={"50px"}
              />
            </>
          ) : (
            <img
              className="header_icon"
              src="data:image/png;base64,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"
              alt=""
              width={"50px"}
            />
          )}
          <Button
            component={NavLink}
            to="/login"
            activeClassName="activeLink"
            color="inherit"
            style={{ marginRight: "10px" }}
          >
            <img
              className="header_icon"
              src="https://cdn.onlinewebfonts.com/svg/img_337531.png"
              width={20}
              alt=""
              style={{ marginRight: "5px" }}
            />
            Sign in
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
