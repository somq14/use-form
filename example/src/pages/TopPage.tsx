import React from "react";
import { Link } from "react-router-dom";

export const TopPage: React.FC = (props) => {
  return (
    <div>
      <h1>index</h1>
      <ul>
        <li>
          <Link to="/basic">basic</Link>
        </li>
      </ul>
    </div>
  );
};
