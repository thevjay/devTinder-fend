import React from 'react'
import NavBar from '../components/NavBar'
import { Outlet } from 'react-router-dom'
import FooterBar from './FooterBar'

const Body = () => {
  return (
    <div>
      <NavBar/>
      <Outlet/>
      <FooterBar/>
    </div>
  )
}

export default Body
