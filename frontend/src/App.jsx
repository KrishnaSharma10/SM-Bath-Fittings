import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Collection from './pages/Collection'
import Contact from './pages/Contact'
import Navbar from './components/Navbar.jsx'

const App = () => {
  return (
    <div className='px-4 sm:px-[2vw] md:px-[4vw] lg:px-[6vw]'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/aboutus' element={<About />} />
        <Route path='/collections' element={<Collection />} />
        <Route path='/contactus' element={<Contact />} />
      </Routes>
    </div>
  )
}

export default App;