import React from "react";
import { Link } from "react-router-dom";

/**
 * Story is a component that renders creator and title of a project
 *
 * Proptypes
 * @param {string} _id of the project
 * @param {string} creator_name
 * @param {string} title of the project
 */
const Project = (props) => {
  return (
    <div className="Card-project">
      {/* <Link to={`/profile/${props.creator_id}`} className="u-link u-bold"> */}
        {props.creator_name}
      {/* </Link> */}
      <p 
        className="Card-projectContent" 
        style={{
          fontFamily: 'Cedarville Cursive, cursive',
          fontSize: '2rem'  // Adjust the size as needed
        }}
      >
        {props.title}
      </p>
    </div>
  );
};

export default Project;
