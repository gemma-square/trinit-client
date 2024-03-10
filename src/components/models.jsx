import React, { useState, useEffect } from 'react';

function Models() {
    const [byteArray, setByteArray] = useState(null);
    const [uploadMessage, setUploadMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [data, setData] = useState([]);
    const [mapsUrl, setMapsUrl] = useState(null); // Add state for maps URL
    const [mapData, setMapData] = useState('');
    const [caption, setCaption] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/history/');
                const jsonData = await response.json();
                console.log('Received data:', jsonData); // Log received data
                setData(jsonData); // Assuming the response is an array of objects containing image data
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        if (byteArray) {
            fetchData();
        }
    }, [byteArray]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
            alert('Please select a PNG or JPEG image file.');
            return;
        }

        if (file.size > 1024 * 1024) {
            alert('File size should not exceed 1MB.');  
            return;
        }

        setLoading(true);

        // Convert image to base64
        const reader = new FileReader();
        reader.onload = () => {
            const base64String = reader.result;
            setPreviewImage(base64String);
            setByteArray(base64String.split(',')[1]);
            setLoading(false);
        };
        reader.readAsDataURL(file);
    };

    const handleUpload = async () => {
        const fileInput = document.querySelector('input[type="file"]');
        const file = fileInput.files[0];
    
        if (!file) {
            alert('Please select an image file to upload.');
            return;
        }
    
        if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
            alert('Please select a PNG or JPEG image file.');
            return;
        }
    
        if (file.size > 1024 * 1024) {
            alert('File size should not exceed 1MB.');
            return;
        }
    
        setLoading(true);
    
        // Create formData object
        const formData = new FormData();
        formData.append('file', file);
    
        try {
            const response = await fetch('http://localhost:8000/api/upload-image/', {
                method: 'POST',
                body: formData
            });
    
            setLoading(false);
    
            if (!response.ok) {
                throw new Error('Failed to upload image.');
            }
    
            const data = await response.json();
            console.log(data);
            setUploadMessage('Generating caption and Predicting location...');
        } catch (error) {
            setLoading(false);
            console.error('Error:', error);
            setUploadMessage('Failed to upload image.');
        }

        try {
            const generateResponse = await fetch('http://localhost:8000/api/generate/', {
                method: 'POST',
                body: formData
            });

            setLoading(true);

            if (!generateResponse.ok) {
                throw new Error('Failed to generate content.');
            }

            const data1 = await generateResponse.json();
            console.log(data1);
            setUploadMessage('Content generated successfully!');
            
            const coordinates = data1.generated_content[0];
            console.log(coordinates);
            const mapData = data1.generated_content[1];
            const caption = data1.generated_content[2];
            setCaption(caption);
            setMapData(mapData);
            if(coordinates !== 'None'){
                const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${coordinates}`;
                setMapsUrl(mapsUrl); // Set the Google Maps URL
            } else {
                console.log("Coordinates not available");
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error('Error:', error);
            setUploadMessage('Failed to generate content.');
        }
    };

    const handleNewUpload = () => {
        window.location.reload(); // Refresh the page
    };

    return (
        <div className="flex justify-center">
            <div className='max-w-xl mt-28 w-full'>
                <div className="bg-white p-6 rounded-lg shadow-md aspect-w-1 aspect-h-1">
                    <div className="mb-4 text-center">
                        <h2 className="text-lg font-semibold">Upload Image</h2>
                        <p className="text-sm text-gray-600">Select an image or drag and drop here</p>
                    </div>
                    <div className="relative">
                        <input type="file" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                        <div className="flex justify-center items-center w-full h-80 border-2 border-gray-300 border-dashed rounded-lg overflow-hidden">
                            {previewImage ? (
                                <img className="object-contain h-full" src={previewImage} alt="Preview" />
                            ) : (
                                <p className="text-sm text-gray-400">Drag and drop or click to select</p>
                            )}
                        </div>
                    </div>
                    <button onClick={handleUpload} tabIndex="0" disabled={loading} className='w-full mt-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200'>Upload</button>
                    {loading && <p className="mt-2 text-center">Loading...</p>}
                    {uploadMessage && <p className="mt-2 text-center text-green-500">{uploadMessage}</p>}
                    {/* <button onClick={handleNewUpload} id="new-btn" className=' w-full mt-4 py-2 rounded-lg bg-red-300 text-gray-700 hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-200'>Upload New Image</button> */}
                </div>
            </div>
            {mapsUrl && (
                <div className="mt-28 ml-10 w-1/2 flex justify-center items-center">
                    <div className="bg-teal-100 p-5 pb-8 rounded-md">
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-center">{caption}</h3>
                            <p className="mt-2 text-center">{mapData}</p>
                        </div>
                        <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="bg-white p-2 rounded-md font-semibold block text-center mt-2 hover:bg-blue-700 hover:text-white">View on Google Maps</a>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Models;
