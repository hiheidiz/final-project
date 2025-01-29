import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProjectDetail.css';

const ProjectDetail = () => {
  const { id } = useParams();
  const [additionalText, setAdditionalText] = useState('');
  const [projectContent, setProjectContent] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/projects/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProjectContent(data.content);
        } else {
          setProjectContent('No project details found.');
        }
      } catch (err) {
        console.error('Error fetching project details:', err);
      }
    };

    fetchProject();
  }, [id]);

  const handleChange = (event) => {
    setAdditionalText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedContent = projectContent + '\n' + additionalText;

    try {
      const response = await fetch(`http://localhost:5000/api/projects/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: updatedContent }),
      });

      if (response.ok) {
        setProjectContent(updatedContent);
        setAdditionalText('');
      } else {
        console.error('Failed to save project details');
      }
    } catch (err) {
      console.error('Error saving project details:', err);
    }
  };

  const handleClear = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/projects/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: '' }),
      });

      if (response.ok) {
        setProjectContent('');
      } else {
        console.error('Failed to clear project details');
      }
    } catch (err) {
      console.error('Error clearing project details:', err);
    }
  };

  return (
    <div className="page-container">
      <div className="content-box">
        <h2>Project Details</h2>
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
