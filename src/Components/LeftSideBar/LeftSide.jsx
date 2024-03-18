import React , {useRef,useState,useEffect, useContext} from "react";
import re from "../../assets/images/photo.jpeg";
import nature from "../../assets/images/nature.jpg";
import avatar from "../../assets/images/avatar.jpg";
import { Tooltip } from "@material-tailwind/react";
import { Avatar } from "@material-tailwind/react";
import location from "../../assets/images/location.png";
import job from "../../assets/images/job.png";
import facebook from "../../assets/images/Facebook-icon.png";
import twitter from "../../assets/images/twitter.png"
import laptop from "../../assets/images/laptop.png"
import media from "../../assets/images/media.png" 
import apps from "../../assets/images/apps.png" 
import tik from "../../assets/images/tik.png" 
import { AuthContext } from "../AppContext/AppContext";

const LeftSide = () => {

  const [data,setData] = useState([]);
  
  //for the line up the photo
  const count = useRef(0);

  const {user,userData}=useContext(AuthContext);

  const handleRandom=(arr)=>{
    setData(arr[Math.floor(Math.random() * arr?.length)])
    // console.log("arr : ",arr[Math.floor(Math.random() * arr?.length)])
  }
  useEffect(()=>{
    const imageList=[
    {
      id:'1',
      image:laptop
    },
    {
      id:'2',
      image: media
    },
    {
      id:'3',
      image: apps
    },
    {
      id:'4',
      image: tik

    }
  ];
  handleRandom(imageList);
  let countAds = 0;
  let startAds = setInterval(()=>{
    countAds++;
    handleRandom(imageList);
    count.current=countAds;
    if(countAds===5){
      clearInterval(startAds)
      /* note : if you want the scrolling of images and the high line to be continue you commit the clearInterval and add this line
       countAds=0*/
    }
  },2000)
   return ()=>{
    clearInterval(startAds)
    
}

  },[])

  const progressBar = ()=>{
    switch(count.current){
      case 1:
        return 15;
      case 2:
        return 30;
      case 3:
        return 45;
      case 4:
        return 60;
      case 5:
        return 75;  
      default: 
        return 0;
    }
  }

  return (
    <div className="flex flex-col h-full bg-white pb-4 border-2 rounded-r-xl shadow-lg">
      <div className="flex flex-col items-center relative">
        <img className="h-24 w-full rounded-r-xl" src={re} alt="nature" />
        <div className="absolute -bottom-4">
          <Tooltip content="Profile" placement="top">
            <Avatar
              className="w-9 rounded-lg"
              src={user?.photoURL || avatar}
              alt="avatar"
            ></Avatar>
          </Tooltip>
        </div>
      </div>
      <div className="flex flex-col items-center pt-4">
        <p className="font-roboto font-medium text-md text-gray-700 no-underline tracking-normal leading-none pt-1">
          {user?.email || userData?.email}
        </p>
        <p className="font-roboto font-medium mt-2 text-xs text-gray-700 no-underline tracking-normal leading-none ">
          {" "}
          Access exclusive tools & insights
        </p>
        <p className="font-roboto font-medium text-xs text-gray-700 no-underline tracking-normal leading-none py-2">
          {" "}
          try premium for free
        </p>
      </div>
      <div className="flex flex-col pl-2 ">
        <div className="flex items-center pb-4">
          <img className="h-6" src={location} alt="location" />
         
          <p className="font-roboto font-bold text-lg no-underline tracking-normal leading-none ml-2">
            California
          </p>
        </div>
        <div className="flex items-center pb-4">
          <img className="h-6" src={job} alt="job" />

          <p className="font-roboto font-bold text-lg no-underline tracking-normal leading-none ml-2">
            React Developer
          </p>
        </div>
        <div className="flex justify-center items-center">
          <p className="font-roboto font-bold text-md text-[#0177b7] no-underline tracking-normal leading-none">
            Events
          </p>
          <p className="font-roboto font-bold text-md text-[#0177b7] no-underline tracking-normal leading-none mx-2">
            Groups
          </p>
          <p className="font-roboto font-bold text-md text-[#0177b7] no-underline tracking-normal leading-none">
            Follow
          </p>
          <p className="font-roboto font-bold text-md text-[#0177b7] no-underline tracking-normal leading-none mx-2">
            More
          </p>
        </div>
      </div>
      <div className="ml-2 mt-2">
        <p className="font-roboto font-bold text-lg no-underline tracking-normal leading-none py-2">
          Social Profiles
        </p>
        <div className="flex items-center ml-2">
          <img className="h-6  mr-2" src={facebook} alt="facebook" />
          <p className="font-roboto font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r to-red-700 from-blue-500 no-underline tracking-normal leading-none py-2"> Social Network</p>
        </div>
        <div className="flex items-center ml-2">
          <img className="h-6 mr-2" src={twitter} alt="twitter"/>
          <p className="font-roboto font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r to-red-700 from-blue-500 no-underline tracking-normal leading-none py-2"> Social Network</p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center ">
        <p className="font-roboto font-bold text-lg no-underline tracking-normal leading-none py-2">Random ads</p>
        <div
          style={{width:`${progressBar()}%`}}
          className="bg-blue-600 rounded-xl h-1 mb-4">
        </div>
          <img className="h-32 rounded-lg" src={data.image} alt="ads"/>
      </div>
    </div>
  );
};

export default LeftSide;
