import React from 'react';

class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
    };
  }

  onFileChange = event => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append(
      "myFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    // Details of the uploaded file
    console.log(this.state.selectedFile);

    // Request made to the backend api
    // Send formData object
    // axios.post("api/uploadfile", formData);
  };

  render() {
    return (
      <div>
        <h3>File Upload using React!</h3>
        <div>
          <input type="file" onChange={this.onFileChange} />
          <button onClick={this.onFileUpload}>
            Upload!
          </button>
        </div>
      </div>
    );
  }
}

export default FileUpload;