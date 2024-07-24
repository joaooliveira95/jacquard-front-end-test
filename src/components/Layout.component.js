import React from "react";
import { Fade } from "react-awesome-reveal";

const PageLayout = ({children}) => (
  <Fade triggerOnce direction="up">
    <main>{children}</main>
  </Fade>
);

export default PageLayout;
