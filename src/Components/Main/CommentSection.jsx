import React, { useContext, useEffect, useReducer, useRef } from 'react'
import {AuthContext} from "../AppContext/AppContext"
import { Avatar, Input } from '@material-tailwind/react'
import avatar from "../../assets/images/avatar.jpg"
import { collection, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { PostsReducer,postActions,postStates } from "../AppContext/PostsReducer";
import Comment from './Comment'

const CommentSection = ({postId}) => {
    const {user , userData} = useContext(AuthContext)
    const comment = useRef("")
    //add another collection of comments for particular post 
    const commentRef = doc(collection(db,"posts",postId,"comments"))

    const [state,dispatch] =useReducer(PostsReducer,postStates);
    const {ADD_COMMENT,HANDLE_ERROR} = postActions;


    const addComment = async(e)=>{
        e.preventDefault();
        if(comment.current.value !== ""){
            //we want to set this comment inside our database
            try {
                await setDoc(commentRef,{
                    id:commentRef.id,
                    comment:comment.current.value,
                    image:user?.photoURL,
                    name:user?.displayName?.split(" ")[0] || userData?.name?.chartAt(0)?.toUpperCase()+userData?.name?.slice(1),
                    timestamp:serverTimestamp(),
                });
                comment.current.value='';
            } catch (error) {
                dispatch({HANDLE_ERROR})
                alert(error.message)
                console.log(error.message)
            }
        }
    }
    useEffect(()=>{
        const getComments = async ()=>{
            try {
                const collectionOfComments = collection(db,`posts/${postId}/comments`);
                const q = query(collectionOfComments,orderBy('timestamp','desc'))
                await onSnapshot(q,(doc)=>{
                    dispatch({type:ADD_COMMENT,comments:doc.docs.map((item)=>item.data())})
                })
            } catch (error) {
                dispatch({HANDLE_ERROR})
                alert(error.message)
                console.log(error.message)
            }
        };
        return ()=> getComments(); 
    },[postId,ADD_COMMENT,HANDLE_ERROR])
  return (
    <div className='flex flex-col bg-white w-full border-y-2 rounded-b-3xl'>
        <div className="flex items-center">
            <div className="mx-2">
                <Avatar size='sm' variant='circular' src={user?.photoURL || avatar}></Avatar>
            </div>
            <div className="w-full pr-2">
                <form className='flex items-center w-full' onSubmit={addComment}>
                    <Input type="text" name='comment' color='blue-gray' variant='outlined' className='w-full rounded-2xl outline-none border-0 p-2 bg-gray-100'ref={comment} label='write a comment ...' />
                    <button className='hidden' type='submit'>Submit</button>
                </form>
            </div>
        </div>
        {state.comments?.map((comment,index)=>{
            return <Comment key={index} image={comment.image} name={comment.name}
            comment={comment.comment}  />
        })}
    </div>
  )
}

export default CommentSection