// Items.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Items() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/items/')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Items</h1>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <strong>{item.name}</strong>: {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Items;
