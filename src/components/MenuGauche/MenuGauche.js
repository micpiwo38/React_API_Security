import React from "react";
import PropTypes from "prop-types";
import "./MenuGauche.css";

export default function MenuGauche() {
  return (
    <div className="mt-3">
      <ul className="list-group">
        <li className="list-group-item">
          <a href="">INFO</a>
        </li>
        <li className="list-group-item">
          <a href="">EDITER</a>
        </li>
      </ul>
    </div>
  );
}
