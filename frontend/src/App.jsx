import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Collection from './pages/Collection'
import Contact from './pages/Contact'
import CollectionGrid from './components/grids/CollectionGrid.jsx'
import NotFound from './pages/NotFound.jsx'
import CategoryGrid from './components/grids/CategoryGrid.jsx'
import Login from './pages/Login.jsx'
import AdminPanelPage from './pages/AdminPanel.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import MainLayout from './layouts/MainLayout.jsx'
import AdminLayout from './layouts/AdminLayout.jsx'
import FeaturedCollections from './components/FeaturedCollections.jsx'
import FeaturedProducts from './components/FeaturedProducts.jsx'

const App = () => {
  return (
    <Routes>
      {/* Public routes with MainLayout */}
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />
      <Route
        path="/about"
        element={
          <MainLayout>
            <About />
          </MainLayout>
        }
      />
      <Route
        path="/explore"
        element={
          <MainLayout>
            <Collection />
          </MainLayout>
        }
      />
      <Route
        path="/contactus"
        element={
          <MainLayout>
            <Contact />
          </MainLayout>
        }
      />
      <Route
        path="/explore/category/:title/:categoryId"
        element={
          <MainLayout>
            <FeaturedCollections  />
          </MainLayout>
        }
      />
      <Route
        path="/explore/category/collections/:title/:collectionId"
        element={
          <MainLayout>
            <FeaturedProducts />
          </MainLayout>
        }
      />
      <Route
        path="/login"
        element={
          <MainLayout>
            <Login />
          </MainLayout>
        }
      />

      {/* Protected Admin route with AdminLayout */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <AdminPanelPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      {/* 404 Page */}
      <Route
        path="*"
        element={
          <MainLayout>
            <NotFound />
          </MainLayout>
        }
      />
    </Routes>
  )
}

export default App
