import React, { useEffect, useState } from 'react';
import './TagList.css'; // Import your CSS file for styling.

function TagList() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state.

  // Function to fetch tags
  const fetchTags = async () => {
    try {
      const response = await fetch('https://onlinestore-8ety.onrender.com/tags');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTags(data);
      setLoading(false); // Update loading state when data is fetched.
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  useEffect(() => {
    // Fetch tags when the component mounts
    fetchTags();
  }, []);

  return (
    <div className="tag-list">
      <h2>Product Tags</h2>
      <div className="tag-cards">
        {loading ? (
          <p>Loading tags...</p>
        ) : (
          tags.map((tag) => (
            <div key={tag} className="tag-card">
              {tag}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TagList;
