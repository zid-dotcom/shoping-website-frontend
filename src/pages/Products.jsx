

import React, { useEffect, useState } from "react";
import { getPublicProductsApi } from "../services/AllApi";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext"; // ← import

const FALLBACK_IMG = "/mnt/data/be2de2bc-1eea-48a4-824a-376993aff157.png";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState("");
  const navigate = useNavigate();
  const { addItem } = useCart(); // ← use addItem

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getPublicProductsApi();
      const items = Array.isArray(data) ? data : data?.products ?? data?.data ?? [];
      setProducts(items);
    } catch (err) {
      console.error("Public products failed", err);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading products...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;
  if (!products.length) return <p className="text-center text-gray-600">No products available</p>;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-6">Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => {
          const id = p._id || p.id;
          return (
            <article
              key={id}
              onClick={() => navigate(`/products/${id}`)}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-transform hover:-translate-y-1 cursor-pointer"
            >
              <div className="relative w-full h-56 bg-gray-100">
                <img
                  src={p.imgurl || p.image || FALLBACK_IMG}
                  alt={p.name || "product"}
                  onError={(e) => { e.currentTarget.src = FALLBACK_IMG; }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 right-3 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-lg">
                  ${p.price ?? "0"}
                </span>
              </div>

              <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900 truncate">{p.name}</h3>
                <p
                  className="text-gray-600 text-sm"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {p.description}
                </p>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={(e) => { e.stopPropagation(); navigate(`/products/${id}`); }}
                    className="flex-1 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
                  >
                    View
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Add one to cart
                      addItem(p, 1);
                    }}
                    className="py-2 px-3 border rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition"
                  >
                    Add
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
