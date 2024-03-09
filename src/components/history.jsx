import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ImageListComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/history/');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  function getImageFromHex(base64String) {
    return `data:image/jpeg;base64,${base64String}`;
  }

  function formatDate(utcTime) {
    const date = new Date(utcTime);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    return date.toLocaleString('en-US', options);
  }
  
  return (
    <div className=' mt-24 pb-20'>
      <h1 className='text-center font-semibold text-slate-700 text-5xl'> History </h1>
      <div className='flex justify-center'>
        <div className="grid grid-cols-3 gap-8 mt-16">
          {data.map((item, index) => (
            <motion.div 
              key={index} 
              className="card"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
                <div className="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                  <img src={getImageFromHex(item[0])} alt={`Image ${index}`} className="rounded-lg w-full h-64 object-cover" />
                </div>
                <div className="p-6">
                <p className="text-center block font-sans text-lg antialiased font-semibold leading-relaxed text-inherit">
                    {item[1]}
                  </p>
                  <h5 className="mt-8 font-sans text-sm antialiased font-light leading-snug tracking-normal text-blue-gray-400">
                    {formatDate(item[2])}
                  </h5>
                  
                </div>
                
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageListComponent;
