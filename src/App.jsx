// import React from 'react'
// import { Routes, Route } from 'react-router-dom'
// import Header from './components/Header'
// import Landing from './pages/Landing'
// import Products from './pages/Products'
// import ProductDetail from './pages/ProductDetail'
// import CartPage from './pages/CartPage'
// import AuthPage from './pages/AuthPage'
// import Footer from './components/Footer'
// import Service from './pages/Service'

// export default function App(){
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />
//       <main className="max-w-6xl mx-auto px-4 py-8">
//         <Routes>
//           <Route path="/" element={<Landing />} />
//           <Route path="/products" element={<Products />} />
//           <Route path="/products/:id" element={<ProductDetail />} />
//           <Route path="/cart" element={<CartPage />} />
//           <Route path="/auth" element={<AuthPage />} />
//           <Route path="/service" element={<Service />} />
//         </Routes>
//       </main>
//       <Footer/>
//     </div>
//   )
// }



import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Header from './components/Header'
import Landing from './pages/Landing'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import CartPage from './pages/CartPage'
import AuthPage from './pages/AuthPage'
import Footer from './components/Footer'
import Service from './pages/Service'

// NEW — your Dashboard
import Dashboard from './pages/Dashboard'

// Protected route wrapper
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("ProtectedRoute: No token found → redirecting to /auth");
    return <Navigate to="/auth" replace />;
  }

  return children;
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Public pages use Header & Footer */}
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <main className="max-w-6xl mx-auto px-4 py-8">
                <Landing />
              </main>
              <Footer />
            </>
          }
        />

        <Route
          path="/products"
          element={
            <>
              <Header />
              <main className="max-w-6xl mx-auto px-4 py-8">
                <Products />
              </main>
              <Footer />
            </>
          }
        />

        <Route
          path="/products/:id"
          element={
            <>
              <Header />
              <main className="max-w-6xl mx-auto px-4 py-8">
                <ProductDetail />
              </main>
              <Footer />
            </>
          }
        />

        <Route
          path="/cart"
          element={
            <>
              <Header />
              <main className="max-w-6xl mx-auto px-4 py-8">
                <CartPage />
              </main>
              <Footer />
            </>
          }
        />

        <Route
          path="/auth"
          element={
            <>
              <Header />
              <main className="max-w-6xl mx-auto px-4 py-8">
                <AuthPage />
              </main>
              <Footer />
            </>
          }
        />

        <Route
          path="/service"
          element={
            <>
              <Header />
              <main className="max-w-6xl mx-auto px-4 py-8">
                <Service />
              </main>
              <Footer />
            </>
          }
        />

        {/* ADMIN / DASHBOARD ROUTE — NO HEADER/FOOTER HERE */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}
