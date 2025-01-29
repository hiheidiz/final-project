import React, { useState, useEffect, useContext } from "react";
import Card from "../modules/Card";
import { NewProject } from "../modules/NewPostInput";
import { UserContext } from "../context/UserContext";
import { get } from "../../utilities";

const Feed = () => {
  const [projects, setProjects] = useState([]);
  const userId = useContext(UserContext);

  useEffect(() => {
    document.title = "My Trees";
    if (userId) {
      get("/api/projects").then((projectObjs) => {
        const userProjects = projectObjs.filter((project) => project.creator_id === userId);
        setProjects(userProjects);
      });
    }
  }, [userId]);

  const addNewProject = (projectObj) => {
    if (projectObj.creator_id === userId) {
      setProjects([projectObj, ...projects]);
    }
  };

  return (
    <>
      {userId ? (
        <>
          <NewProject addNewProject={addNewProject} />
          <div className="Cards-wrapper">
            {projects.length > 0 ? (
              projects.map((projectObj) => (
                <Card
                  key={`Card_${projectObj._id}`}
                  _id={projectObj._id}
                  creator_name={projectObj.creator_name}
                  creator_id={projectObj.creator_id}
                  title={projectObj.title}
                />
              ))
            ) : null}
          </div>
        </>
      ) : (
        <div>
          <center><h1>Welcome to OliveTheAbove!</h1></center>
          <h2>Peacefully Track, Discover, and Share Your Hobbies!</h2>
          
        </div>
      )}
    </>
  );
};

export default Feed;
