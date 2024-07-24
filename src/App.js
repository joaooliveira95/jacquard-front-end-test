import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import LoginForm from "./pages/Login.page";
import { useSelector } from "react-redux";
import PatientsPage from "./pages/Patient.page";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header.component";
import PageLayout from "./components/Layout.component";

const App = () => {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);

  return (
    <ChakraProvider>
      <Router>
        <Header />
        <PageLayout>
          <Routes>
            <Route
              path="/login"
              element={
                isAuthenticated ? <Navigate to="/patients" /> : <LoginForm />
              }
            />
            <Route
              path="/patients"
              element={
                isAuthenticated ? <PatientsPage /> : <Navigate to="/login" />
              }
            />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </PageLayout>
      </Router>
    </ChakraProvider>
  );
};

export default App;
