import React, { useState } from 'react';

function FileUploadHandler() {
    const [byteArray, setByteArray] = useState(null);
    const [uploadMessage, setUploadMessage] = useState('');
    const [loading, setLoading] = useState(false);

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
            const base64String = reader.result.split(',')[1];
            const byteCharacters = atob(base64String);
            const byteArray = new Uint8Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteArray[i] = byteCharacters.charCodeAt(i);
            }
            setByteArray(byteArray);
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
        <div className=' mt-8'>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} tabIndex="0" disabled={loading} className=' p-2 rounded-lg hover:bg-blue-300'>Upload</button>
            {loading && <p>Loading...</p>}
            <p>{uploadMessage}</p>
        </div>
    );
}

export default FileUploadHandler;
