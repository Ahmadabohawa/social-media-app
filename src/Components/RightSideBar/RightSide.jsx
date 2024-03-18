import React, { useContext, useState } from "react";
import nature from "../../assets/images/nature.jpg";
import {AuthContext} from "../AppContext/AppContext"
import { Link } from "react-router-dom";
import { Avatar, avatar } from '@material-tailwind/react'
import remove from "../../assets/images/delete.png"
import { arrayRemove, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase/firebase";

const RightSide = () => {
    
    const [input , setInput] =useState("");
    const {user,userData} = useContext(AuthContext)
    const friendList = userData?.friends;
    
    const searchFriends = (data)=>{
      return data.filter((item)=>{
        item['name'].toLowerCase().includes(input.toLowerCase())
      })
    }
    const removeFriend = async(id,name,image)=>{
        const q =query(collection(db,"users"),where("uid","==",user?.uid))
        const getDoc = await getDocs(q);
        const userDocumentId=getDoc.docs[0].id;
        await updateDoc(doc(db,"users",userDocumentId),{
          friends : arrayRemove({id:id,name:name,image:image}),
        })
    }
    return (
    <div className="flex flex-col h-screen bg-white shadow-lg border-2 rounded-l-xl">
      <div className="flex flex-col items-center relative p-5">
        <img className="h-48 rounded-md" src={nature} alt="nature" />
      </div>
      <p className="font-roboto font-normal text-sm text-gray-700 max-w-fit no-underline tracking-normal leading-tight py-2 mx-2">
        Through photography , the beauty of Mother Nature can be frozen in time
        . This category celebrates the magic of our planet and beyond -- from
        the immensity of the great outdoors , to miraculous moments in your own
        backyard .
      </p>
      <div className="mx-2 mt-10">
        <p className="font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-tight">
          Friends :{" "}
        </p>
        <input className="border-0 outline-none mt-4 "
         value={input}
         type="text" placeholder="Search friends "
         onChange={(e)=>setInput(e.target.value)} />
         {friendList?.length>0 ? searchFriends(friendList)?.map((friend)=>{
          return (<div className="flex items-center justify-between hover:bg-gray-100 duration-300 ease-in-out" key={friend.id}>
            <Link to={`/profile/${friend.id}`} >
              <div className="flex items-center my-2 cursor-pointer">
                <div className="flex items-centers">
                  <Avatar size="sm" variant="circular" src={friend?.image||avatar} alt="avatar"></Avatar>
                  <p className="ml-4 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">{friend?.name}</p>
                </div>
              </div>
            </Link>
            <div className="mr-4">
              <img onClick={()=>removeFriend(friend.id,friend.name,friend.image)} className="cursor-pointer " src={remove} alt="deleteFriend" />
            </div>
          </div>)
         }):<p className="mt-10 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
            Add Friends to check their profile 
         </p> }
      </div>
    </div>
  );
};

export default RightSide;
