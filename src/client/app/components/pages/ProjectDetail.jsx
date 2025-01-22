import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProjectDetail.css'; // Ensure this path is correct

const ProjectDetail = () => {
  const { id } = useParams();
  const [additionalText, setAdditionalText] = useState('');
  const [projectContent, setProjectContent] = useState(''); // State to hold the original project content

  const handleChange = (event) => {
    setAdditionalText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Append the additional text to the original project content
    setProjectContent((prevContent) => prevContent + '\n' + additionalText);
    setAdditionalText(''); // Clear the text area after submission
  };

  const handleClear = () => {
    setProjectContent(''); // Reset the project content
  };

  return (
    <div className="page-container">
      <div className="content-box">
        <h2>Project Details</h2>
        {/* Display the original project content */}
        <div className="project-content">
          <p>{projectContent || 'Loading project content...'}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <textarea
            value={additionalText}
            onChange={handleChange}
            placeholder="Add more to the project..."
          />
          <div className="button-container">
            <button type="submit">Enter</button>
            <button type="button" onClick={handleClear}>Clear</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectDetail;
