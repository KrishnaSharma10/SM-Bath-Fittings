import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Collection from './pages/Collection'
import Contact from './pages/Contact'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

const App = () => {
  return (
    <div className='h-screen bg-gradient-to-b from-white via-blue-200 to-white transition-colors duration-500 px-4 sm:px-[1vw] md:px-[2vw] lg:px-[4vw]'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/aboutus' element={<About />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/contactus' element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App;