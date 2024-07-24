import React from "react";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";

const Header = () => (
  <Fade triggerOnce>
    <header>
      <Link to="/">
        <img src="./images/dhg_whole.png" alt="Logo" />
      </Link>
    </header>
  </Fade>
);

export default Header;
