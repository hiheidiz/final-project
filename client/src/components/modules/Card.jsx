import React, { useEffect, useState } from "react";
import Project from "./Project";
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
  const [image, setImage] = useState(null);

  useEffect(() => {
    // List of image filenames
    const images = [
      "/red.png",
      "/green.png",
      "/blue.png",
      "/purple.png",
    ];

    // Randomly select an image
    const randomImage = images[Math.floor(Math.random() * images.length)];

    setImage(randomImage); // Set the random image filename
  }, []);

  return (
    <div className="Card-container">
      <Project
        _id={props._id}
        creator_id={props.creator_id}
        creator_name={props.creator_name}
        title={props.title}
      />
      <Link to={`/project/${props._id}`}>
        <center>
          {image ? (
            <img
              src={image} // Set image source dynamically
              width="200"
              height="200"
              alt="Random"
            />
          ) : (
            <p>Loading image...</p> // Display a loading message while selecting the image
          )}
        </center>
      </Link>
    </div>
  );
};

export default Card;
