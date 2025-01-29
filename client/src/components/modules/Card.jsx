import React from "react";
import Project from "./Project";
import tree from "./image.png"
import "./Card.css";
import { Link } from "react-router-dom";

/**
 * Card is a component for displaying projects
 *
 * Proptypes
 * @param {string} _id of the project
 * @param {string} creator_name
 * @param {string} title of the project
 */
const Card = (props) => {
  return (
    <div className="Card-container">
      <Project
        _id={props._id}
        creator_id={props.creator_id}
        creator_name={props.creator_name}
        title={props.title}
      />
      <Link to={`/project/${props._id}`}>
        <center><img src={tree} width="200" height="200"/></center>
      </Link>
    </div>
  );
};

export default Card;
