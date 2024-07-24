import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { MOCKED_PATIENTS } from "../mocked_patients";
import { validatePassword, validateUsername } from "../utils/utils";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const toast = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const usernameError = validateUsername(username);
    const passwordError = validatePassword(password);

    if (usernameError !== true || passwordError !== true) {
      setErrors({
        username: usernameError !== true ? usernameError : "",
        password: passwordError !== true ? passwordError : "",
      });
      return;
    }

    try {
      const response = await axios.post(
        "https://run.mocky.io/v3/1c9c285d-7388-435c-a0ec-08b4e969b51d",
        {
          username,
          password,
        }
      );

      if (response.status === 200) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { user: username, patients: response.data.patients },
        });
        toast({
          title: "Login successful.",
          description: "You have successfully logged in.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        setErrors({
          api: "Login failed. Please check your username and password.",
        });
      }
    } catch (error) {
      // The API gives me not found so I had to mock it
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { user: username, patients: MOCKED_PATIENTS },
      });
      setErrors({ api: "Login failed. Please try again later." });
    }
  };

  return (
    <Box mx="auto">
      <Heading mb={6} textAlign="center">
        Login
      </Heading>
      {errors.api && <Text color="red.500">{errors.api}</Text>}
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="username" isInvalid={!!errors.username}>
            <FormLabel>Username</FormLabel>
            <Input
              bg={"white"}
              required
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && <Text color="red.500">{errors.username}</Text>}
          </FormControl>
          <FormControl id="password" isInvalid={!!errors.password}>
            <FormLabel>Password</FormLabel>
            <Input
              bg={"white"}
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <Text color="red.500">{errors.password}</Text>}
          </FormControl>
          <Button type="submit" colorScheme="blue" width="full">
            Log in
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default LoginForm;
