"use client"
import React, { useState, useRef, useCallback,useEffect } from 'react';
import Webcam from 'react-webcam';
import { useDropzone } from 'react-dropzone';
import { FaceRecognition } from '../FacialRecognition/FaceRecognition';
import Loading from '@/PageComponents/Loading';
import { ApiCaller } from '../ApiManager/ApiCaller';
import { useRouter } from 'next/navigation';

const TakeImageComp = (props) => {
  const [images, setImages] = useState([]);
  const [faceRecognition, setFaceRecognition] = useState(null);
  const [loading , setLoading] = useState(true);
  const webcamRef = useRef(null);
  const router = useRouter();
  useEffect(() => {
    const recognition = new FaceRecognition();
    recognition.loadModels("./models").then(() => {
      console.log("Models loaded successfully");
      setFaceRecognition(recognition);
      setLoading(false);
    });
  }, []);

  const capturePicture = async() => {
    setLoading(true);
    if (webcamRef.current && webcamRef.current.video && images.length < 5) {
      const imageSrc = webcamRef.current.getScreenshot();
      const Accuracy = await faceRecognition.getScore(imageSrc);
      setImages((prev) => [...prev, {score: Accuracy,imageLink: imageSrc}]);
    }
    setLoading(false);
  };
  const onDrop = useCallback(async (acceptedFiles) => {
    setLoading(true);
    if (acceptedFiles.length && images.length < 5) { // Limit to 5 images
      const promises = acceptedFiles.slice(0, 5 - images.length).map(async (file) => {
        const src = URL.createObjectURL(file);
        const Accuracy = await faceRecognition.getScore(src);
        return { imageLink: src, score: Accuracy };
      });

      const newImages = await Promise.all(promises);

      setImages((prev) => [...prev, ...newImages]);
    }
    setLoading(false);
  }, [images,faceRecognition]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const registerUser=async()=>{
        setLoading(true);
        const descriptors = await faceRecognition.getLabeledFaceDetections(images.map((img)=>img.imageLink));
        const response = await ApiCaller.registerUser(props.data, descriptors);
        console.log(response);
        if(response.success){
          router.push("/auth/login");
        }
        else {
          props.setter(false);
          router.push("/auth/register?errorMsg=" + response.msg);
        }
        setLoading(false);
    }

    if(!faceRecognition || faceRecognition == null){
        return <Loading/>;
    }
    if(loading){
        return <Loading/>
    }

  return (
    <div className='card-width shadow-large p-8 rounded-xl'>
      <div className='flex-col-center mt-4'>
        <h1 className='text-2xl font-semibold mb-2'>Register for FaceAuth</h1>
        <p className='text-gray-600'>Assured Security</p>
        <div className='flex-col-center mt-2'>
          <h1 className=''>Logging in with : {props.data.email}</h1>
          {(images.length<5)?<p>{images.length} out of 5 images captured</p>:
            <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-extrabold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                type='submit'
                onClick={(e) => {
                  e.preventDefault();
                  registerUser();
                }}
              >
                REGISTER
              </button>
          }
        </div>
        <div className={'flex-col-center mt-2'}>
          <Webcam audio={false} height='50%' width='50%' ref={webcamRef} screenshotFormat='image/jpeg' />
        </div>
        <p className='text-center'>Your Images will not be saved</p>
        <div className='flex gap-4 justify-between'>
          <button onClick={capturePicture} className='p-4 bg-black text-white my-4'>
            Capture Picture
          </button>
          <div {...getRootProps({
                className:' bg-white text-black border border-gray-300 shadow-md rounded-lg \
                cursor-pointer text-center flex items-center justify-center'
          })} >
            <input {...getInputProps()} />
            {isDragActive ? <p>Drop the files here ...</p> : <p>Upload Pictures with Clear Faces</p>}
          </div>
        </div>
        <div className='flex flex-wrap gap-4 items-center justify-center'>
          {images.map((image, index) => (
            <div className='flex flex-col justify-center items-center '>
                <img className='w-32' key={index} src={image.imageLink} alt={`Captured Image ${index}`} />
                <p>score: {image.score.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TakeImageComp;
