// NewPostInput.js

import React, { useState } from "react";
import "./NewPostInput.css";
import { post } from "../../utilities";


/**
 * New Post is a parent component for all input components
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {string} projectId optional prop, used for comments
 * @param {({projectId, value}) => void} onSubmit: (function) triggered when this post is submitted, takes {projectId, value} as parameters
 */
const NewPostInput = (props) => {
  const [value, setValue] = useState("");

  // called whenever the user types in the new post input box
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // called when the user hits "Submit" for a new post
  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit && props.onSubmit(value);
    setValue("");
  };

  return (
    <div className="NewPostInput-container">
      <div className="NewPostInput-input-container">
        <input
          type="text"
          placeholder={props.defaultText}
          value={value}
          onChange={handleChange}
          className="NewPostInput-input"
        />
        <button
          type="button"
          className="NewPostInput-submit"
          onClick={handleSubmit}
        >
          Add Project
        </button>
      </div>
      <button
        type="button"
        className="NewPostInput-button"
        onClick={() => document.querySelector('.NewPostInput-input').focus()}
      >
        <font size="20"> + </font>
      </button>
    </div>
  );
};


/**
 * New Project is a New Post component for comments
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 */
const NewProject = (props) => {
  const addProject = (value) => {
    const body = { content: value };
    post("/api/project", body).then((project) => {
      // display this project on the screen
      props.addNewProject(project);
    });
  };

  return <NewPostInput defaultText="Project Name" onSubmit={addProject} />;
};


export {NewProject};
