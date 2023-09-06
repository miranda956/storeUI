import React, { useEffect, useState } from 'react';
import './CategoryList.css'; // Import your CSS file for styling.

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state.

  // Function to fetch categories
  const fetchCategories = async () => {
    try {
      const response = await fetch('https://onlinestore-8ety.onrender.com/categories');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // Convert the categories object into an array of category names
      const categoryArray = Object.values(data);
      setCategories(categoryArray);
      setLoading(false); // Update loading state when data is fetched.
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    // Fetch categories when the component mounts
    fetchCategories();
  }, []);

  return (
    <div className="category-list">
      <h2>Product Categories</h2>
      <div className="category-cards">
        {loading ? (
          <p>Loading categories...</p>
        ) : (
          categories.map((category) => (
            <div key={category} className="category-card">
              <h3>{category}</h3>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CategoryList;
