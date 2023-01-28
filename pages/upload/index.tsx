import { NextPage } from 'next';
import React, { useRef, useState } from 'react';
import { AlertMsg } from '../../components/Alert';
import Axios from '../../utils/Axios';

const Slides: NextPage<{}> = (props) => {
  const folderRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(e: any) {
    e.preventDefault();

    const folder = folderRef.current?.value;
    const [file]: any = imageRef?.current?.files;
    if (folder?.trim().length === 0) {
      setError(true);
      setMessage('Please fill in the folder name');
      setTimeout(() => {
        setError(false);
        setMessage('');
      }, 5000);
      return;
    }
    if (file === undefined) {
      setError(true);
      setMessage('Please fill in the folder name');
      setTimeout(() => {
        setError(false);
        setMessage('');
      }, 5000);
      return;
    }

    const formData = new FormData();
    formData.append('upload', file);

    const config = {
      headers: { 'content-type': 'multipart/form-data' },
      onUploadProgress: (event: any) => {
        console.log(
          `Current progress: `,
          Math.round(event.loaded * 100) / event.total
        );
      },
    };

    const { data, status } = await Axios.post('/api/upload', formData, config);

    if (data.error) {
      setError(true);
      setMessage('File upload failed');
      setTimeout(() => {
        setError(false);
        setMessage('');
      }, 5000);
    }

    if (status === 200 || status === 201) {
      setSuccess(true);
      setMessage('File uploaded successfully');
      setTimeout(() => {
        setSuccess(false);
        setMessage('');
      }, 5000);
    }

    console.clear();
    console.log(status, data);
    return;

  }
  return (
    <div>
      <div className="sm:w-[90%] md:w-[70%] w-full lg:w-1/2 mx-auto my-14">
        <h1 className="text-2xl text-emerald-600 font-semibold text-center">
          Upload Slide
        </h1>
        {error && <AlertMsg type="alert-error" message={message} />}
        {success && <AlertMsg type="alert-success" message={message} />}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="folder" className="form-label">
              Folder
            </label>
            <input
              type="text"
              id="folder"
              ref={folderRef}
              name="folder"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="image" className="form-label">
              Upload Image
            </label>
            <input
              type="file"
              name="image"
              id="image"
              ref={imageRef}
              className="form-control py-0 file:py-3  px-0  file:border-none file:px-7 file:rounded-sm file:bg-emerald-500 file:border-emerald-800 hover:bg-emarald-600 file:text-emerald-50 file:outline-none"
            />
          </div>
          <div className="form-group">
            <button className="btn py-5 px-7 rounded-sm bg-emerald-500 hover:bg-emerald-600">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Slides;
