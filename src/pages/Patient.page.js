import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Button, Heading, Flex, useToast, VStack } from "@chakra-ui/react";
import _ from "lodash";
import PatientCard from "../components/PatientCard.component";
import { Fade } from "react-awesome-reveal";

const PatientsPage = () => {
  const patients = useSelector((state) => state.patients);
  const dispatch = useDispatch();
  const toast = useToast();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    toast({
      title: "Logged out.",
      description: "You have successfully logged out.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const groupedAndSortedPatients = useMemo(() => {
    const filteredPatients = patients.filter(
      (patient) => patient.is_completed === false
    );

    const grouped = _.groupBy(filteredPatients, "type");

    _.forEach(grouped, (group, type) => {
      grouped[type] = _.orderBy(
        group,
        [(patient) => new Date(patient.last_visit_date).getTime(), "name"],
        ["asc", "asc"]
      );
    });

    return grouped;
  }, [patients]);

  return (
    <Fade triggerOnce>
      <Box>
        <Flex justifyContent="space-between" alignItems="center" mb={8}>
          <Heading as="h1">Hospital Patients</Heading>
          <Button colorScheme="teal" onClick={handleLogout}>
            Logout
          </Button>
        </Flex>
        <VStack spacing={4}>
          {Object.keys(groupedAndSortedPatients).map((type) => (
            <Box key={type} mb={2} width={"100%"}>
              <Heading
                as="h2"
                size="md"
                mb={4}
                textTransform={"uppercase"}
                opacity={0.8}
              >
                {type}
              </Heading>
              <VStack spacing={4} flexDir={"column"}>
                {groupedAndSortedPatients[type].map((patient, index) => (
                  <Fade direction="up" key={patient._id} style={{width: "100%"}} delay={index * 50} triggerOnce>
                    <PatientCard {...patient} />
                  </Fade>
                ))}
              </VStack>
            </Box>
          ))}
        </VStack>
      </Box>
    </Fade>
  );
};

export default PatientsPage;
