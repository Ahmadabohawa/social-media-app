import React, { useContext, useEffect, useReducer, useRef, useState } from 'react'
import {Alert, Avatar} from "@material-tailwind/react";
import avatar from '../../assets/images/avatar.jpg';
import live from '../../assets/images/live3.png';
import smile from '../../assets/images/smile2.png';
import {Button} from "@material-tailwind/react";
import addImage from "../../assets/images/add-photo-48.png"
import {AuthContext} from "../AppContext/AppContext"
import { collection, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { PostsReducer, postActions , postStates } from '../AppContext/PostsReducer';
import {getStorage,ref,uploadBytesResumable,getDownloadURL} from "firebase/storage"
import PostCard from './PostCard';
const Main = () => {

const {user,userData}= useContext(AuthContext)
const [state,dispatch] = useReducer(PostsReducer,postStates);

const {SUBMIT_POST,HANDLE_ERROR}=postActions
const text = useRef("")  
const scrollRef = useRef("")
const [image,setImage] = useState(null)
const [file,setFile]=useState(null)
const [progressBar,setProgressBar]= useState(0)

const collectionRef = collection(db, "posts");

const postRef = doc(collection(db, "posts"));

const document = postRef.id;

const handleUpload=(e)=>{
    setFile(e.target.files[0])
}

const handleSubmitPosts= async(e)=>{
    e.preventDefault();
    if(text.current.value !== ""){
    try {
            await setDoc(postRef,{
                documentId:document,
                uid:user?.uid||userData?.uid,
                logo:user?.photoURL,
                name:user?.displayName||userData?.name,
                email:user?.email||userData?.email,
                text:text.current.value,
                image:image,
                timestamp:serverTimestamp(),
            });
            text.current.value="";
    } catch (error) {
        dispatch({type:HANDLE_ERROR})
        alert(error.message)
        console.log(error.message)
    }
}else{
    dispatch({type:HANDLE_ERROR})

}
};
const storage=getStorage();

const metadata={
    contentType:["image/jpeg","image/jpg","image/png","image/gif","image/svg+xml"]
}

const submitImage = async()=>{
    const fileType=metadata.contentType.includes(file["type"]);
    console.log('file : ',file)
    if(!file) return;
    if(fileType) {
        try {
        const storageRef = ref(storage,`images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef,file,metadata.contentType);
        await uploadTask.on("state_changed",(snapshot)=>{
            const progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes) * 100
            );
            setProgressBar(progress)
        },(error)=>{
            alert(error.message)
        },async()=>{
            await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                setImage(downloadURL);
            })
        });
        } catch (error) {
            dispatch({type:HANDLE_ERROR})
            alert(error.message)
            console.log(error.message)
        }
    }

}

useEffect(()=>{
    const postData = async()=>{
        const q= query(collectionRef,orderBy("timestamp","asc"))
        await onSnapshot(q,(doc)=>{
            dispatch({type:SUBMIT_POST,
                posts:doc.docs.map((item)=>item.data()),
            });
            scrollRef.current?.scrollIntoView({behavior:'smooth'});
            setImage(null);
            setFile(null);
            setProgressBar(0)
        });
    }
    return ()=>postData();
},[SUBMIT_POST])
  return (
    <div className='flex flex-col items-center'>
        <div className='flex flex-col py-4 w-full bg-white rounded-3xl shadow-lg'>
            <div className="flex items-center border-b-2 border-gray-300 pb-4 pl-4 w-full">
                <Avatar size='sm' variant='circular' src={user?.photoURL|| avatar} alt='avatar'/>
                <form className='w-full' onSubmit={handleSubmitPosts}>
                    <div className='flex justify-between items-center '>
                        <div className="w-full ml-4">
                            <input name='text' type='text' placeholder={`what's on your mind ${user?.displayName?.split(" ")[0]
                            || userData?.name?.charAt(0).toUpperCase()+ userData?.name?.slice(1)}`}
                            className='outline-none w-full bg-white rounded-md'
                            ref={text}/>
                        </div>
                        <div className='mx-4 '>
                            {image && <img className='h-24 rounded-xl' src={image} alt='preview image'/>}
                        </div>
                        <div className='mr-4 '>
                            <Button type='submit'>Share</Button>
                        </div>
                    </div>
                </form>
            </div>
            <span className='bg-blue-700 py-1 rounded-md' style={{width:`${progressBar}%`}}>
            </span>
            <div className='flex justify-around items-center pt-4'>
                <div className='flex items-center'>
                    <label htmlFor="addImage" className='cursor-pointer flex items-center'>
                        <img src={addImage} className='size-8' alt="addImage" />
                    <input id='addImage' type="file" style={{display:'none'}} 
                        onChange={handleUpload}
                    />
                    </label>
                    {file && <Button variant='text' onClick={submitImage}>Upload</Button>} 
                
                </div>
                <div className='flex items-center'>
                    <img className='h-7 mr-4' src={live} alt='live'/>
                    <p className='font-roboto font-medium text-md text-gray-700 no-underline leading-none tracking-normal'>Live</p>
                </div>
                <div className='flex items-center'>
                    <img className='size-8 mr-4' src={smile} alt='feeling'/>
                    <p className='font-roboto font-medium text-md text-gray-700 no-underline leading-none tracking-normal'>Feeling</p>
                </div>
            </div>
        </div>
        <div className='flex flex-col py-4 w-full'>{state.error ?(<div className='flex justify-center items-center'>
            <Alert color='red' >Something went wrong refresh and try again</Alert>
        </div>):(<div>
            {state.posts.length >0 && state.posts?.map((post,index)=>{
                return <PostCard key={index} logo={post.logo}
                id={post?.documentId}
                uid={post?.uid} name={post.name} 
                email={post.email} image={post.image}
                text={post.text}
                timestamp={new Date(
                post?.timestamp?.toDate())?.toUTCString()}
                ></PostCard>
            })}
        </div>)}</div>
        <div ref={scrollRef}>

        </div>
    </div>
  )
}

export default Main