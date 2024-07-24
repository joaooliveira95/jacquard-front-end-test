import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Fade } from "react-awesome-reveal";
import LoginForm from "./pages/Login.page";
import { useSelector } from "react-redux";
import PatientsPage from "./pages/Patient.page";

const App = () => {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);

  return (
    <ChakraProvider>
      <Fade triggerOnce>
        <header>
          <img src="./images/dhg_whole.png" />
        </header>
      </Fade>
      <Fade triggerOnce direction="up">
        <main>
            {isAuthenticated ? <PatientsPage /> : <LoginForm />}
        </main>
      </Fade>
    </ChakraProvider>
  );
};

export default App;
