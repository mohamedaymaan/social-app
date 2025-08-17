import React from 'react'
import image from '../../assets/404img.png'
import { Link } from 'react-router'

export default function Notfound() {
  return (
    <>
    <div className='w-1/2 mx-auto'><img src={image} alt=""  className='w-full'/></div>
    <Link to="/" className='text-blue-800 underline text-2xl'>Go To Home <i class="fa-solid fa-arrow-right align-middle"></i></Link>
    </>

  )
}
