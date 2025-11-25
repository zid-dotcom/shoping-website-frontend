import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function Hero(){
  const nav = useNavigate()
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white py-20 rounded-lg">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Raynott Decmart — Everyday essentials, delivered.</h1>
        <p className="text-lg md:text-xl opacity-90 mb-8">Curated products, secure checkout, fast delivery — everything you need in one place.</p>
        <div className="flex justify-center gap-4">
          <button onClick={() => nav('/products')} className="px-6 py-3 bg-white text-indigo-600 rounded-2xl font-semibold shadow">Shop Now</button>
          <Link to="/auth" className="px-6 py-3 border border-white/40 rounded-2xl">Sign in</Link>
        </div>
      </div>
    </header>
  )
}