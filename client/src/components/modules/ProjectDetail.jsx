import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProjectDetail.css";

const ProjectDetail = () => {
  const { id } = useParams();
  const [projectTitle, setProjectTitle] = useState("");
  const [projectContent, setProjectContent] = useState("");
  const [editableText, setEditableText] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`https://olivetheabove.onrender.com/api/project/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProjectTitle(data.title);
          setProjectContent(data.content);
          setEditableText(""); // Clear the text area after loading existing content
        } else {
          setProjectContent("No project details found.");
        }
      } catch (err) {
        console.error("Error fetching project details:", err);
      }
    };

    fetchProject();
  }, [id]);

  const handleChange = (event) => {
    setEditableText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`https://olivetheabove.onrender.com/api/project/${id}`, {
        method: "POST", // Use POST for appending
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: editableText }), // Send new content
      });

      if (response.ok) {
        const updatedProject = await response.json(); // Parse the updated project
        setProjectContent(updatedProject.content); // Append the new content
        setEditableText(""); // Clear the input after saving
      } else {
        console.error("Failed to update project details");
      }
    } catch (err) {
      console.error("Error updating project details:", err);
    }
  };

  return (
    <div className="page-container">
      <div className="content-box">
        <h2>{projectTitle || "Project Details"}</h2>

        <div className="project-content">
          <h3>Current Content:</h3>
          <p>{projectContent}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <textarea
            value={editableText}
            onChange={handleChange}
            placeholder="Edit your project content..."
          />
          <div className="button-container">
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectDetail;
