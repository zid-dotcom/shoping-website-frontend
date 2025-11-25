// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'

// export default function ProductDetail(){
//   const { id } = useParams()
//   const [p, setP] = useState(null)
//   const { add } = useCart()

//   useEffect(()=> {
//     api.get(id).then(setP)
//   },[id])

//   if(!p) return <div>Loading...</div>

//   return (
//     <div className="grid md:grid-cols-2 gap-6">
//       <img src={p.image} alt={p.title} className="w-full h-96 object-cover rounded-lg" />
//       <div>
//         <h1 className="text-2xl font-bold mb-2">{p.title}</h1>
//         <div className="text-xl font-semibold mb-4">₹{p.price}</div>
//         <p className="mb-4">{p.description}</p>
//         <div className="mb-4">Stock: {p.stock}</div>
//         <button disabled={p.stock<=0} onClick={() => add(p.id,1)} className="px-4 py-2 bg-indigo-600 text-white rounded">Add to cart</button>
//       </div>
//     </div>
//   )
// }



import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { getPublicProductsApi } from "../services/AllApi";

const FALLBACK_IMG = "/mnt/data/be2de2bc-1eea-48a4-824a-376993aff157.png";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    setLoading(true);
    try {
      const data = await getPublicProductsApi();
      const list = Array.isArray(data)
        ? data
        : data?.products ?? data?.data ?? [];

      // find specific product
      const item = list.find(
        (p) => p._id?.toString() === id || p.id?.toString() === id
      );

      setProduct(item || null);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!product)
    return (
      <p className="text-center mt-20 text-gray-600">
        Product not found.
        <button
          onClick={() => navigate("/products")}
          className="ml-2 underline text-indigo-600"
        >
          Go back
        </button>
      </p>
    );

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-8" style={{height:"80vh"}}>
      <img
        src={product.imgurl || product.image || FALLBACK_IMG}
        alt={product.name}
        onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
        className="w-full h-96 object-cover rounded-lg shadow"
      />

      <div>
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <div className="text-xl font-semibold mb-4 text-indigo-700">
          ₹{product.price}
        </div>

        <p className="mb-4 text-gray-700">{product.description}</p>

        <button
          className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
          onClick={() => addItem(product, 1)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
