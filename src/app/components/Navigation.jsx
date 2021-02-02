import { connect } from "react-redux";
import { Link } from "react-router-dom";
import React from "react";
import * as mutatitions from "../store/mutations";
import { Button, Flex, Box, Spacer, Heading, Divider } from "@chakra-ui/react";

const Navigation = ({ exitUser }) => (
  <nav style={{width:"100%", marginBottom: "auto" }}>
    <Flex m="4%">
      <Box p="2">
        <Heading size="md">Group App</Heading>
      </Box>
      <Spacer />
      <Box>
        <Button colorScheme="teal" mr="4">
        <Link to="/dashboard">
          Organizer
        </Link>
        </Button>
        <Button colorScheme="teal">
        <Link
          to="/"
          onClick={exitUser}
        >
          Log out
          </Link>
          </Button>
      </Box>
    </Flex>
    <Divider orientation="horizontal" />
  </nav>
);

const mapDispatchToProps = (dispatch) => ({
  exitUser() {
    dispatch({ type: mutatitions.LOGOUT });
  },
});

export const ConnectedNavigation = connect(
  (state) => state,
  mapDispatchToProps
)(Navigation);
