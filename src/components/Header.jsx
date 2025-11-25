



// import React, { useState, useEffect, useRef } from 'react';
// import { Link } from 'react-router-dom';

// export default function Header() {
//   // use a local count state (default 0) instead of useCart()
//   const [count] = useState(0);

//   const [open, setOpen] = useState(false);
//   const btnRef = useRef(null);
//   const menuRef = useRef(null);

//   // close menu when clicking outside or pressing ESC
//   useEffect(() => {
//     function onKey(e) {
//       if (e.key === 'Escape') setOpen(false);
//     }
//     function onClick(e) {
//       if (!menuRef.current) return;
//       if (open && !menuRef.current.contains(e.target) && !btnRef.current.contains(e.target)) {
//         setOpen(false);
//       }
//     }
//     document.addEventListener('keydown', onKey);
//     document.addEventListener('click', onClick);
//     return () => {
//       document.removeEventListener('keydown', onKey);
//       document.removeEventListener('click', onClick);
//     };
//   }, [open]);

//   return (
//     <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b">
//       <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        
//         {/* Brand */}
//         <Link to="/" className="flex items-center gap-3 text-indigo-700">
//           <span className="text-xl font-bold">Raynott Decmart</span>
//         </Link>

//         {/* Desktop nav */}
//         <nav className="hidden md:flex items-center gap-6">
//           <Link to="/products" className="text-gray-700 hover:text-indigo-600">Products</Link>
//           <Link to="/service" className="text-gray-700 hover:text-indigo-600">Service</Link>
//           <Link to="/auth" className="text-gray-700 hover:text-indigo-600">Login</Link>

//           {/* Cart Icon for Desktop */}
//           <Link to="/cart" className="relative p-2 rounded hover:bg-gray-100">
//             <svg className="w-6 h-6 text-gray-700" viewBox="0 0 24 24" fill="none">
//               <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//               <circle cx="10" cy="20" r="1" fill="currentColor"/>
//               <circle cx="18" cy="20" r="1" fill="currentColor"/>
//             </svg>

//             {/* Badge */}
//             <span className="absolute -top-1 -right-1 inline-flex items-center justify-center bg-indigo-600 text-white text-xs px-1.5 py-0.5 rounded-full">
//               {count || 0}
//             </span>
//           </Link>
//         </nav>

//         {/* Mobile actions */}
//         <div className="flex items-center gap-3 md:hidden">

//           {/* Cart Icon for Mobile */}
//           <Link to="/cart" className="relative p-2 rounded hover:bg-gray-100">
//             <svg className="w-6 h-6 text-gray-700" viewBox="0 0 24 24" fill="none">
//               <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//               <circle cx="10" cy="20" r="1" fill="currentColor"/>
//               <circle cx="18" cy="20" r="1" fill="currentColor"/>
//             </svg>
//             <span className="absolute -top-1 -right-1 inline-flex items-center justify-center bg-indigo-600 text-white text-xs px-1.5 py-0.5 rounded-full">
//               {count || 0}
//             </span>
//           </Link>

//           {/* Login icon */}
//           <Link to="/auth" className="p-2 rounded hover:bg-gray-100">
//             <svg className="w-6 h-6 text-gray-700" viewBox="0 0 24 24" fill="none">
//               <path d="M16 11c1.657 0 3-1.567 3-3.5S17.657 4 16 4s-3 1.567-3 3.5S14.343 11 16 11zM6 20a6 6 0 0110 0" stroke="currentColor" strokeWidth="1.5"/>
//             </svg>
//           </Link>

//           {/* Hamburger Menu */}
//           <button
//             ref={btnRef}
//             onClick={() => setOpen(!open)}
//             className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-300"
//           >
//             {open ? (
//               <svg className="w-6 h-6 text-gray-700" viewBox="0 0 24 24" fill="none">
//                 <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//               </svg>
//             ) : (
//               <svg className="w-6 h-6 text-gray-700" viewBox="0 0 24 24" fill="none">
//                 <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//               </svg>
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Mobile dropdown */}
//       <div
//         ref={menuRef}
//         className={`md:hidden bg-white border-t transition-all duration-200 overflow-hidden ${open ? 'max-h-52 py-3' : 'max-h-0'}`}
//       >
//         <div className="max-w-6xl mx-auto px-4 space-y-2">
//           <Link to="/products" onClick={() => setOpen(false)} className="block py-3 px-2 rounded hover:bg-gray-50">Products</Link>
//           <Link to="/service" onClick={() => setOpen(false)} className="block py-3 px-2 rounded hover:bg-gray-50">Service</Link>
//           <Link to="/auth" onClick={() => setOpen(false)} className="block py-3 px-2 rounded hover:bg-gray-50">Login</Link>
//         </div>
//       </div>
//     </header>
//   );
// }



import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext"; // <- make sure path is correct

export default function Header() {
  // get cart items from context
  const { items = [] } = useCart();
  // sum quantities for badge
  const count = items.reduce((s, it) => s + (it.qty || 0), 0);

  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  // close menu when clicking outside or pressing ESC
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    function onClick(e) {
      if (!menuRef.current) return;
      if (
        open &&
        !menuRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3 text-indigo-700">
          <span className="text-xl font-bold">Raynott Decmart</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/products" className="text-gray-700 hover:text-indigo-600">
            Products
          </Link>
          <Link to="/service" className="text-gray-700 hover:text-indigo-600">
            Service
          </Link>
          <Link to="/auth" className="text-gray-700 hover:text-indigo-600">
            Login
          </Link>

          {/* Cart Icon for Desktop */}
          <Link to="/cart" className="relative p-2 rounded hover:bg-gray-100">
            <svg className="w-6 h-6 text-gray-700" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 3h2l.4 2M7 13h10l4-8H5.4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="10" cy="20" r="1" fill="currentColor" />
              <circle cx="18" cy="20" r="1" fill="currentColor" />
            </svg>

            {/* Badge */}
            <span
              className="absolute -top-1 -right-1 inline-flex items-center justify-center bg-indigo-600 text-white text-xs px-1.5 py-0.5 rounded-full"
              aria-live="polite"
            >
              {count || 0}
            </span>
          </Link>
        </nav>

        {/* Mobile actions */}
        <div className="flex items-center gap-3 md:hidden">
          {/* Cart Icon for Mobile */}
          <Link to="/cart" className="relative p-2 rounded hover:bg-gray-100">
            <svg className="w-6 h-6 text-gray-700" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 3h2l.4 2M7 13h10l4-8H5.4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="10" cy="20" r="1" fill="currentColor" />
              <circle cx="18" cy="20" r="1" fill="currentColor" />
            </svg>
            <span className="absolute -top-1 -right-1 inline-flex items-center justify-center bg-indigo-600 text-white text-xs px-1.5 py-0.5 rounded-full">
              {count || 0}
            </span>
          </Link>

          {/* Login icon */}
          <Link to="/auth" className="p-2 rounded hover:bg-gray-100">
            <svg className="w-6 h-6 text-gray-700" viewBox="0 0 24 24" fill="none">
              <path
                d="M16 11c1.657 0 3-1.567 3-3.5S17.657 4 16 4s-3 1.567-3 3.5S14.343 11 16 11zM6 20a6 6 0 0110 0"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </Link>

          {/* Hamburger Menu */}
          <button
            ref={btnRef}
            onClick={() => setOpen(!open)}
            className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? (
              <svg className="w-6 h-6 text-gray-700" viewBox="0 0 24 24" fill="none">
                <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-gray-700" viewBox="0 0 24 24" fill="none">
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`md:hidden bg-white border-t transition-all duration-200 overflow-hidden ${open ? "max-h-52 py-3" : "max-h-0"}`}
      >
        <div className="max-w-6xl mx-auto px-4 space-y-2">
          <Link to="/products" onClick={() => setOpen(false)} className="block py-3 px-2 rounded hover:bg-gray-50">
            Products
          </Link>
          <Link to="/service" onClick={() => setOpen(false)} className="block py-3 px-2 rounded hover:bg-gray-50">
            Service
          </Link>
          <Link to="/auth" onClick={() => setOpen(false)} className="block py-3 px-2 rounded hover:bg-gray-50">
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
