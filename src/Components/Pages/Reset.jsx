import React, { useState } from 'react'
import {Input,Button,Typography} from "@material-tailwind/react";

const Reset = () => {
    
    const [email,setEmail]=useState('')


  return (
    <div className='grid grid-cols-1 justify-items-center items-center h-screen'>
        <div className="w-96 ">
            <Typography variant='h6' color='blue-gray' className='pb-4'>
                Enter the email address associated with your account and we 'll send you a link to reset your password
            </Typography>
            <Input label='Email' name='email' type='email'value={email} onChange={(e)=>setEmail(e.target.value)}></Input>
            <Button color='blue' variant='gradient' fullWidth className='mt-4 '>
                Continue
            </Button>
        </div>
    </div>
  )
}

export default Reset