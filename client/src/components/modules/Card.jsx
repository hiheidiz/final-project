import React from "react";
import SingleStory from "./SingleStory";
import tree from "./image.png"
import "./Card.css";
import { Link } from "react-router-dom";

/**
 * Card is a component for displaying content like stories
 *
 * Proptypes
 * @param {string} _id of the story
 * @param {string} creator_name
 * @param {string} content of the story
 */
const Card = (props) => {
  return (
    <div className="Card-container">
      <SingleStory
        _id={props._id}
        creator_id={props.creator_id}
        creator_name={props.creator_name}
        content={props.content}
      />
      <Link to={`/story/${props._id}`}>
        <center><img src={tree} width="200" height="200"/></center>
      </Link>
    </div>
  );
};

export default Card;
