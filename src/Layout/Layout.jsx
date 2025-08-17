import React from 'react'
import Navbar from '../Component/Navbar/Navbar'
import { Outlet } from 'react-router'

export default function Layout() {
  return (
    <>
    <Navbar/>
    <div className="p-10">

    <Outlet/>
    </div>
    </>
  )
}
