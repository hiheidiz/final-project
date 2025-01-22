import React, { useState, useEffect, useContext } from "react";
import Card from "../modules/Card";
import { NewStory } from "../modules/NewPostInput";
import { UserContext } from "../context/UserContext";
import { get } from "../../utilities";
import styles from './Trees.css';

const Feed = () => {
  const [stories, setStories] = useState([]);
  const userId = useContext(UserContext);

  useEffect(() => {
    document.title = "My Trees";
    if (userId) {
      get("/api/stories").then((storyObjs) => {
        const userStories = storyObjs.filter((story) => story.creator_id === userId);
        setStories(userStories);
      });
    }
  }, [userId]);

  const addNewStory = (storyObj) => {
    if (storyObj.creator_id === userId) {
      setStories([storyObj, ...stories]);
    }
  };

  return (
    <>
      {userId ? (
        <>
          <NewStory addNewStory={addNewStory} />
          <div className="Cards-wrapper">
            {stories.length > 0 ? (
              stories.map((storyObj) => (
                <Card
                  key={`Card_${storyObj._id}`}
                  _id={storyObj._id}
                  creator_name={storyObj.creator_name}
                  creator_id={storyObj.creator_id}
                  content={storyObj.content}
                />
              ))
            ) : null}
          </div>
        </>
      ) : (
        <div className={styles.noLoginMessage}>
          <center><h1>Welcome to OliveTheAbove!</h1></center>
          <h2>Peacefully Track, Discover, and Share Your Hobbies!</h2>
        </div>
      )}
    </>
  );
};

export default Feed;
