import { connect } from "react-redux";
import { Link } from "react-router-dom";
import React from "react";

const Navigation = () => (
  <nav>
    <ul>
      <Link to="/dashboard">
        <li>dashboard</li>
      </Link>
    </ul>
  </nav>
);

export const ConnectedNavigation = connect((state) => state)(Navigation);
