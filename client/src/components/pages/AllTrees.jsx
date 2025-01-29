import React, { useState, useEffect, useContext } from "react";
import Card from "../modules/Card";
import { NewProject } from "../modules/NewPostInput";
import { UserContext } from "../context/UserContext";
import { get } from "../../utilities";

const AllTrees = () => {
  const [projects, setProjects] = useState([]);
  const userId = useContext(UserContext);

  useEffect(() => {
    document.title = "All Trees";
    get("/api/projects").then((projectObjs) => {
      setProjects(projectObjs); // Load all projects instead of filtering by user
    });
  }, []); // Removed userId dependency

  const addNewProject = (projectObj) => {
    if (projectObj.creator_id) {
      setProjects([projectObj, ...projects]);
    }
  };

  return (
    <>
      {userId ? (
        <>
          <NewProject addNewProject={addNewProject} />
        </>
      ) : (
        <div>
          <center><h1>Welcome to OliveTheAbove!</h1></center>
          <h2>Peacefully Track, Discover, and Share Your Hobbies!</h2>
        </div>
      )}
      <div className="Cards-wrapper">
        {projects.length > 0 ? (
          projects.map((projectObj) => (
            <Card
              key={`Card_${projectObj._id}`}
              _id={projectObj._id}
              creator_name={projectObj.creator_name}
              creator_id={projectObj.creator_id}
              content={projectObj.content}
            />
          ))
        ) : null}
      </div>
    </>
  );
};

export default AllTrees;
