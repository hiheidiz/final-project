import React, { useState, useEffect, useContext } from "react";
import Card from "../modules/Card";
import { NewStory } from "../modules/NewPostInput";
import { UserContext } from "../context/UserContext";

import { get } from "../../utilities";

const Feed = () => {
  const [stories, setStories] = useState([]);
  const userId = useContext(UserContext);

  useEffect(() => {
    document.title = "News Feed";
    get("/api/stories").then((storyObjs) => {
      let userStories = storyObjs.filter((story) => story.creator_id === userId);
      setStories(userStories);
    });
  }, [userId]);

  const addNewStory = (storyObj) => {
    if (storyObj.creator_id === userId) {
      setStories([storyObj].concat(stories));
    }
  };

  const hasStories = stories.length !== 0;
  return (
    <>
      {userId && <NewStory addNewStory={addNewStory} />}
      <div className="Cards-wrapper">
        {hasStories ? (
          stories.map((storyObj) => (
            <Card
              key={`Card_${storyObj._id}`}
              _id={storyObj._id}
              creator_name={storyObj.creator_name}
              creator_id={storyObj.creator_id}
              content={storyObj.content}
            />
          ))
        ) : (
          <div>No stories!</div>
        )}
      </div>
    </>
  );
};

export default Feed;
