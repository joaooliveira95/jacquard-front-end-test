import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { formatDate } from "../utils/utils";

const PatientCard = ({ name, joined, last_visit_date, is_completed }) => (
  <Box p={2} borderRadius="md" w={"100%"} bg={"white"}>
    <Text>Name: {name}</Text>
    <Text>Joined: {formatDate(new Date(joined))}</Text>
    <Text>Last visit: {formatDate(new Date(last_visit_date))}</Text>
    <Text>Completed: {is_completed ? "Yes" : "No"}</Text>
  </Box>
);

export default PatientCard;
