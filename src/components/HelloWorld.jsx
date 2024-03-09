import React, { useState, useEffect } from 'react';

function HelloWorldComponent() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:8000/api/hello-world/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(error);
      }
    }
    
    fetchData();
  }, []);

  return (
    <div>
      {error && <div>Error: {error.message}</div>}
      {data && (
        <div>
          <p>{data.message}</p>
        </div>
      )}
    </div>
  );
}

export default HelloWorldComponent;
