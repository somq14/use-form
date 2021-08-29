import React from "react";
import { Link } from "react-router-dom";

export const TopPage: React.FC = (props) => {
  return (
    <div>
      <h1>index</h1>
      <ul>
        <li>
          <Link to="/basic">Basic Form</Link>
        </li>
        <li>
          <Link to="/validation">Validated Form</Link>
        </li>
      </ul>
    </div>
  );
};
