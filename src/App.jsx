import React, { useCallback, useEffect, useRef } from 'react'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [length, setLength] = useState(8)
  const [AllowNumbers,setAllowNumbers]= useState(false)
  const [AllowCharacters,setAllowCharacters]=useState(false)
  const [password,setPasword]=useState("")

  const passwordChangers=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(AllowNumbers) str =str+"12345678"
    if(AllowCharacters) str=str+"!@#$%^&*()_+-=[]{}|;:',.<>/?`~`"
    let char

    for(let i=1;i<length;i++)
    {
      char=Math.floor(Math.random()* str.length +1)
      pass=pass+str.charAt(char);
    }

    console.log(pass);
    

    setPasword(pass)
    
  },[length,AllowNumbers,AllowCharacters])


  const copyTextRef=useRef(null)

  const copyPass=useCallback(()=>{
    window.navigator.clipboard.writeText(password);
    if(copyTextRef.current){
      copyTextRef.current.select();
    }
    }
  ,[password])


  const generatePass=useEffect(()=>{
    passwordChangers();
  },[length,AllowCharacters,AllowNumbers])

  return (
    <>
       <div className="w-[600px] h-70 bg-gray-800 rounded-2xl flex flex-col items-center justify-center space-y-4 px-4">
        <h1 className="text-2xl text-white text-center">Password Generator</h1>
        <div className="flex items-center space-x-2 w-full">

        <input
        type="text"
        className="bg-white flex-grow h-10 text-2xl px-2 rounded-md text-center focus:outline-none focus:ring-0"
        value={password}
        readOnly
        ref={copyTextRef}

        />
        <button className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-sky-700"
        onClick={()=>{
          copyPass();
        }}
        >Copy</button>
        </div>

        <div className='flex w-full justify-around'>

          <label className='text-orange-400 space-x-1'>
          <input
          className='w-max accent-blue-600'
          type="range"
          min={8}
          max={100}
          onChange={(e)=>{setLength(e.target.value)}}
          />
          length: {length}
          </label>

          <label className='text-orange-400'>
          <input
          type="checkbox"
          onChange={()=>{
            setAllowNumbers(prev=>!prev)
          }}

          />
          AllowedNumbers
          </label>


          <label className='text-orange-400'>
          <input
          type="checkbox"
          onChange={()=>{
            setAllowCharacters(prev=>!prev)
          }}
          />
          AllowedNumbers
          </label>
        </div>
        <button className='bg-orange-600 p-1.5 text-2xl rounded-md hover:bg-amber-500' 
        onClick={()=>{
          passwordChangers();
        }}
        >Reset</button>
      </div>

    </>
  )
}

export default App
