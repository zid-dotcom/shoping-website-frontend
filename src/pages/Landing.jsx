

// import React, { useEffect, useState } from "react";
// import Hero from "../components/Hero";
// import { Sparkles, ShoppingBag, Truck, Shield, Award, TrendingUp } from "lucide-react";
// import { getPublicProductsApi } from "../services/AllApi";
// import { useNavigate } from "react-router-dom";

// function MiniProducts() {
//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function load() {
//       const data = await getPublicProductsApi();
//       const items = Array.isArray(data) ? data : data?.products ?? data?.data ?? [];
//       setProducts(items.slice(0, 3));  // <= SHOW ONLY 3
//     }
//     load();
//   }, []);

//   return (
//     <div className="mt-10">
//       <h2 className="text-2xl font-bold mb-6">Featured Products</h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {products.map((p) => {
//           const id = p._id || p.id;
//           return (
//             <article
//               key={id}
//               onClick={() => navigate(`/products/${id}`)}
//               className="group bg-white rounded-xl shadow hover:shadow-lg cursor-pointer transition"
//             >
//               <div className="w-full h-48 bg-gray-100 overflow-hidden">
//                 <img
//                   src={p.imgurl}
//                   alt={p.name}
//                   className="w-full h-full object-cover group-hover:scale-105 transition-transform"
//                 />
//               </div>

//               <div className="p-4">
//                 <h3 className="font-semibold text-lg">{p.name}</h3>
//                 <p className="text-gray-700 font-medium mt-1">₹{p.price}</p>
//               </div>
//             </article>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// function Landing() {
//   return (
//     <div className="space-y-12">
//       <Hero />

//       {/* Promo Banner */}
//       <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-xl shadow-lg">
//         <div className="flex items-center justify-between flex-wrap gap-4">
//           <div className="flex items-center gap-3">
//             <Sparkles className="w-8 h-8" />
//             <div>
//               <h3 className="text-xl font-bold">Special Offer!</h3>
//               <p className="text-purple-100">Get 20% off on your first order. Use code: WELCOME20</p>
//             </div>
//           </div>
//           <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-purple-50 transition">
//             Shop Now
//           </button>
//         </div>
//       </div>

//       {/* Features Banner */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg text-center border border-blue-200">
//           <Truck className="w-8 h-8 mx-auto mb-2 text-blue-600" />
//           <h4 className="font-semibold text-blue-900">Free Shipping</h4>
//           <p className="text-sm text-blue-700">On orders over $50</p>
//         </div>

//         <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg text-center border border-green-200">
//           <Shield className="w-8 h-8 mx-auto mb-2 text-green-600" />
//           <h4 className="font-semibold text-green-900">Secure Payment</h4>
//           <p className="text-sm text-green-700">100% protected</p>
//         </div>

//         <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg text-center border border-orange-200">
//           <Award className="w-8 h-8 mx-auto mb-2 text-orange-600" />
//           <h4 className="font-semibold text-orange-900">Best Quality</h4>
//           <p className="text-sm text-orange-700">Premium products</p>
//         </div>

//         <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg text-center border border-purple-200">
//           <TrendingUp className="w-8 h-8 mx-auto mb-2 text-purple-600" />
//           <h4 className="font-semibold text-purple-900">Best Prices</h4>
//           <p className="text-sm text-purple-700">Unbeatable deals</p>
//         </div>
//       </div>

//       {/* ⭐ Show Only 3 Products Here */}
//       <MiniProducts />

//       {/* Your other sections stay unchanged */}
//     </div>
//   );
// }

// export default Landing;





// src/pages/Landing.jsx
import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import { Sparkles, ShoppingBag, Truck, Shield, Award, TrendingUp } from "lucide-react";
import { getPublicProductsApi } from "../services/AllApi";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

const FALLBACK_IMG = "/mnt/data/be2de2bc-1eea-48a4-824a-376993aff157.png";

function MiniProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { addItem } = useCart();

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const data = await getPublicProductsApi();
        const items = Array.isArray(data) ? data : data?.products ?? data?.data ?? [];
        if (mounted) setProducts(items.slice(0, 3));
      } catch (err) {
        console.error("MiniProducts - failed to load products", err);
        if (mounted) setProducts([]);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Featured Products</h2>
        <button
          onClick={() => navigate("/products")}
          className="text-sm text-indigo-600 hover:underline"
        >
          View all products
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => {
          const id = p._id || p.id;
          return (
            <article
              key={id}
              onClick={() => navigate(`/products/${id}`)}
              className="group bg-white rounded-xl shadow hover:shadow-lg cursor-pointer transition"
            >
              <div className="w-full h-48 bg-gray-100 overflow-hidden rounded-t-xl">
                <img
                  src={p.imgurl || p.image || FALLBACK_IMG}
                  alt={p.name || p.title || "product"}
                  onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-lg line-clamp-1">{p.name}</h3>
                <p className="text-gray-700 font-medium">₹{p.price}</p>

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addItem(p, 1);
                    }}
                    className="flex-1 bg-indigo-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition"
                    aria-label={`Add ${p.name} to cart`}
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/products/${id}`);
                    }}
                    className="px-3 py-2 border rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition"
                  >
                    View
                  </button>
                </div>
              </div>
            </article>
          );
        })}

        {products.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-8">
            No featured products available.
          </div>
        )}
      </div>
    </div>
  );
}

function Landing() {
  return (
    <div className="space-y-12">
      <Hero />

      {/* Promo Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8" />
            <div>
              <h3 className="text-xl font-bold">Special Offer!</h3>
              <p className="text-purple-100">Get 20% off on your first order. Use code: WELCOME20</p>
            </div>
          </div>
          <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-purple-50 transition">
            Shop Now
          </button>
        </div>
      </div>

      {/* Features Banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg text-center border border-blue-200">
          <Truck className="w-8 h-8 mx-auto mb-2 text-blue-600" />
          <h4 className="font-semibold text-blue-900">Free Shipping</h4>
          <p className="text-sm text-blue-700">On orders over $50</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg text-center border border-green-200">
          <Shield className="w-8 h-8 mx-auto mb-2 text-green-600" />
          <h4 className="font-semibold text-green-900">Secure Payment</h4>
          <p className="text-sm text-green-700">100% protected</p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg text-center border border-orange-200">
          <Award className="w-8 h-8 mx-auto mb-2 text-orange-600" />
          <h4 className="font-semibold text-orange-900">Best Quality</h4>
          <p className="text-sm text-orange-700">Premium products</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg text-center border border-purple-200">
          <TrendingUp className="w-8 h-8 mx-auto mb-2 text-purple-600" />
          <h4 className="font-semibold text-purple-900">Best Prices</h4>
          <p className="text-sm text-purple-700">Unbeatable deals</p>
        </div>
      </div>

      {/* ⭐ Show Only 3 Products Here */}
      <MiniProducts />

      {/* Mid-page Banner */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8 rounded-xl shadow-xl text-white text-center">
        <h2 className="text-3xl font-bold mb-3">New Arrivals Just Dropped! 🎉</h2>
        <p className="text-lg mb-4 text-purple-100">Check out our latest collection of trending products</p>
        <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-bold hover:bg-purple-50 transition transform hover:scale-105">
          Explore New Arrivals
        </button>
      </div>

      {/* How it Works */}
      <section className="bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border-2 border-purple-200 rounded-xl text-center hover:shadow-lg transition group">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition">
              <ShoppingBag className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">1. Browse products</h3>
            <p className="text-gray-600">Explore our wide selection of quality products</p>
          </div>

          <div className="p-6 border-2 border-blue-200 rounded-xl text-center hover:shadow-lg transition group">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition">
              <span className="text-2xl">🛒</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">2. Add to cart</h3>
            <p className="text-gray-600">Select your favorite items with one click</p>
          </div>

          <div className="p-6 border-2 border-green-200 rounded-xl text-center hover:shadow-lg transition group">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition">
              <Truck className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">3. Checkout & receive</h3>
            <p className="text-gray-600">Fast and secure delivery to your doorstep</p>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 p-8 rounded-xl shadow-xl text-center">
        <h2 className="text-3xl font-bold mb-2 text-white">Don't Miss Out!</h2>
        <p className="text-xl mb-4 text-orange-50">Subscribe to get exclusive deals and updates</p>
        <div className="flex gap-2 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}

export default Landing;
