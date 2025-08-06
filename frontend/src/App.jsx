import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Collection from './pages/Collection'
import Contact from './pages/Contact'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import CollectionGrid from './components/grids/CollectionGrid.jsx'

const App = () => {
  return (
    <div className='h-screen montserrat bg-gradient-to-b from-white via-blue-200 to-white transition-colors duration-500 px-4 sm:px-[1vw] md:px-[2vw] lg:px-[4vw]'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/contactus' element={<Contact />} />
        <Route path='/collection/:title/:categoryId' element={<CollectionGrid />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App;