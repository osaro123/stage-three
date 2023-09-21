import React, { useEffect, useState } from 'react'
import { auth } from '../firebase/firebase-config'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [emailConstant,setEmailConstant] = useState("user@example.com")
    const [passwordConstant,setPasswordConstant] = useState("1Password")
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    const createAccount = async () => {
        try{
            await createUserWithEmailAndPassword(auth,emailConstant,passwordConstant)
        }catch(e){
            console.log(e);
        }
    }

    useEffect(() => {
        
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if(user){
                setUser(user)
            }else{
                setUser(null)
            }
        })

        return () => unsubscribe()
    },[])

    const handleLogin = async (e) => {
        try{
            e.preventDefault()
            await signInWithEmailAndPassword(auth,email,password)
        }catch(e){
            console.log(e.message);
        }
    }
  return (
    <div className='flex h-screen items-center justify-center'>
        {user ? (
            <p>Login Successful</p>
        ): (
            <form className='flex flex-col gap-8 items-start border-2 p-16 max-w-[400px] w-[90%] border-black rounded-md' onSubmit={(e) => handleLogin(e)}>
                <div className='flex flex-col gap-4 w-full'>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email"
                        id='email'
                        placeholder='Enter Email' 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='border-2 px-4 py-2 placeholder:text-black bg-[#f2f2f2] border-black rounded-md outline-none'/>
                </div>
                <div className='flex flex-col gap-4 w-full'>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id='password'
                        placeholder='Enter Password' 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='border-2 px-4 py-2 placeholder:text-black bg-[#f2f2f2] border-black rounded-md outline-none'/>
                </div>
                <button className='w-full bg-[#212121] text-white px-4 py-2 rounded-md'>Login</button>
            </form>
        )}
    </div>
  )
}

export default Login