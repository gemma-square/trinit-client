import React, { useState, useEffect } from 'react';

function Models() {
    const [byteArray, setByteArray] = useState(null);
    const [uploadMessage, setUploadMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [data, setData] = useState([]);

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
            setUploadMessage('Image uploaded successfully!');
        } catch (error) {
            setLoading(false);
            console.error('Error:', error);
            setUploadMessage('Failed to upload image.');
        }
    };

    return (
        <div className='max-w-xl mx-auto mt-28'>
            <div className="bg-white p-6 rounded-lg shadow-md">
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
            </div>
            {data.length > 0 && (
                <div className='bg-white rounded-lg font-mono text-md p-6 mt-8 text-center'>
                    {data[0][1]}
                </div>
            )}
        </div>
    );
}

export default Models;
