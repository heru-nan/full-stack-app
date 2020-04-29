import { connect } from "react-redux";
import { Link } from "react-router-dom";
import React from "react";

const Navigation = () => (
  <nav>
    <Link to="/dashboard">
      <h1>my application</h1>
    </Link>
  </nav>
);

export const ConnectedNavigation = connect((state) => state)(Navigation);
