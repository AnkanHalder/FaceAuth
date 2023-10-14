"use client"
import React,{useEffect,useState,useRef,useContext} from 'react'
import { LoginContext } from '@/contexts/LoginContext';
import Webcam from 'react-webcam'
import { FaceRecognition } from '../FacialRecognition/FaceRecognition';
import Loading from '@/PageComponents/Loading';
import { ApiCaller } from '../ApiManager/ApiCaller';
import { useRouter } from 'next/navigation';

const Login = () => {
    const [faceRecognition, setFaceRecognition] = useState(null);
    const {user,setUser} = useContext(LoginContext);
    const [data,setData]=useState(null);
    const [loadingData , setLoadingData] = useState(true);
    const [loadingModels , setLoadingModels] = useState(true);
    const [detectionMessage, setDetectionMessage] = useState("Detecting Faces..");
    const [reDetect,setReDetect] = useState(false);
    const router = useRouter();
    const webcamRef = useRef(null);
  
    useEffect(() => {
      const recognition = new FaceRecognition();
      recognition.loadModels("./models").then(() => {
        console.log("Models loaded successfully");
        setFaceRecognition(recognition);
        setLoadingModels(false);
      });
    }, []);

    useEffect(()=>{
        const fetchData=async()=>{
            const data = await ApiCaller.getAllUsers();
            console.log("Data loaded successfully", data);
            setData(data.data);
            setLoadingData(false);
        }
        fetchData();
    },[])

    const handleUserMedia = async () => {
        while (!faceRecognition && !webcamRef.current && !webcamRef.current.video);
        console.log("preparing data");
        const labeleddescriptors = data.map((data) => ({
          email: data.data.email,
          descriptors: data.Faces
        }));
        console.log("executing model with data: ", labeleddescriptors);
        const foundUser = await faceRecognition.faceRecognizer(labeleddescriptors, webcamRef.current.video, Date.now() + 4000); // 4000 ms timeout
        console.log("User detected: ", foundUser);
        
        if (foundUser && foundUser.label !== "unknown") {
          const matchingUser = data.find((userData) => userData.data.email === foundUser.label);
          if (matchingUser) {
            setUser(matchingUser.data);
            setDetectionMessage("Login with: " + foundUser.label);
            setReDetect(false);
          } else {
            setDetectionMessage("No Matching User Found.");
            setReDetect(true);
          }
        } else {
          setDetectionMessage("No Valid User Detected.");
          setReDetect(true);
        }
    };
      


    if(!faceRecognition || faceRecognition == null || loadingModels){
        return <Loading text={"Loading Models."}/>;
    }
    if(loadingData){
        return <Loading text={"fetchingData"}/>
    }
    
    return (
        <div className="flex flex-col items-center justify-center h-screen relative">
          <Webcam
            className="opacity-50 relative"
            audio={false}
            height="100%"
            width="100%"
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            onUserMedia={handleUserMedia}
          />
          <div className="text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <h1 className="text-xl font-bold">{detectionMessage}</h1>
            {(user)?
                <button 
                    className="p-2 px-4 my-4 mx-auto bg-blue-400 hover:bg-blue-500 cursor-pointer text-center text-white"
                    onClick={()=>{router.push("/profile")}}>
                    Login
                </button>
                :
                <div className='flex gap-1 flex-col w-full'>  
                  {(reDetect) &&
                    <a 
                        className="p-2 px-4 md:my-8 mx-auto bg-blue-400 hover:bg-blue-500 cursor-pointer text-center text-white"
                        href="/auth/login">
                        Try Again
                    </a>}
                    <a 
                        className="p-2 text-sm mx-auto bg-blue-400 hover:bg-blue-500 cursor-pointer text-center text-white"
                        href="/auth/manualLogin">
                        Manual Login
                    </a>
                </div>
                
            }
          </div>
        </div>
      );
}

export default Login