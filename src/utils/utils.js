import _ from "lodash";

export const validateUsername = (value) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const usernameMaxLength = 128;
  const domainMaxLength = 6;

  if (!emailPattern.test(value)) {
    return "Invalid email address format!";
  }

  const [localPart, domainPart] = value.split("@");
  const [domain, ...extensions] = domainPart.split(".");
  const extension = extensions.join(".");

  if (localPart.length > usernameMaxLength) {
    return `Username before '@' cannot exceed ${usernameMaxLength} characters!`;
  }

  if (extension.length > domainMaxLength) {
    return `Username after last '.' cannot exceed ${domainMaxLength} characters!`;
  }

  return true;
};

export const validatePassword = (value) => {
  const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,128}$/;

  if (!passwordPattern.test(value)) {
    return "Password must be alphanumeric, contain at least one number, one capital letter, and be 8-128 characters long.";
  }

  return true;
};

export const formatDate = (date) => {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const isPatientCompleted = (patient) => {
  if (typeof patient.is_completed === "boolean") {
    return patient.is_completed;
  }
  if (typeof patient.is_completed === "object") {
    return _.get(patient.is_completed, "level1.anotherLevel", false) === true;
  }
  return false;
};

export const groupedAndSortedPatientsHandler = (patients) => {
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
};
