


// import React, { useState } from "react";

// export default function CartPage() {
//   // Temporary local cart (empty)
//   const [items, setItems] = useState([]);

//   const remove = (id) => {
//     setItems(items.filter((it) => it.id !== id));
//   };

//   const updateQty = (id, qty) => {
//     setItems(
//       items.map((it) =>
//         it.id === id ? { ...it, qty: qty } : it
//       )
//     );
//   };

//   const clear = () => setItems([]);

//   const total = items.reduce(
//     (sum, it) => sum + it.price * it.qty,
//     0
//   );

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

//       {items.length === 0 ? (
//         <div className="p-6 bg-white rounded">Cart is empty</div>
//       ) : (
//         <div className="space-y-4">
//           {items.map((it) => (
//             <div
//               key={it.id}
//               className="p-4 bg-white rounded flex items-center justify-between"
//             >
//               <div className="flex items-center gap-4">
//                 <img
//                   src={it.image}
//                   alt={it.title}
//                   className="w-20 h-20 object-cover rounded"
//                 />
//                 <div>
//                   <div className="font-medium">{it.title}</div>
//                   <div className="text-sm">
//                     ₹{it.price} x {it.qty}
//                   </div>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2">
//                 <input
//                   type="number"
//                   min="1"
//                   value={it.qty}
//                   onChange={(e) =>
//                     updateQty(
//                       it.id,
//                       Math.max(1, parseInt(e.target.value || 1))
//                     )
//                   }
//                   className="w-16 p-1 border rounded"
//                 />
//                 <button
//                   onClick={() => remove(it.id)}
//                   className="px-3 py-1 bg-red-500 text-white rounded"
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))}

//           <div className="p-4 bg-white rounded flex items-center justify-between">
//             <div>Total</div>
//             <div className="font-bold">₹{total}</div>
//           </div>

//           <div className="flex gap-2">
//             <button
//               onClick={() =>
//                 alert("Checkout stub: Connect backend / payment gateway")
//               }
//               className="px-4 py-2 bg-green-600 text-white rounded"
//             >
//               Checkout
//             </button>
//             <button
//               onClick={clear}
//               className="px-4 py-2 border rounded"
//             >
//               Clear
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




import React from 'react';
import { useCart } from "../contexts/CartContext";

export default function CartPage(){
  const { items, remove, updateQty, clear, total } = useCart();

  return (
    <div style={{height:"80vh"}}>
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {items.length === 0 ? (
        <div className="p-6 bg-white rounded">Cart is empty</div>
      ) : (
        <div className="space-y-4">
          {items.map(it => (
            <div key={it.id} className="p-4 bg-white rounded flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src={it.image || "/mnt/data/be2de2bc-1eea-48a4-824a-376993aff157.png"} alt={it.title} className="w-20 h-20 object-cover rounded" />
                <div>
                  <div className="font-medium">{it.title}</div>
                  <div className="text-sm">₹{it.price} x {it.qty}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="number" min="1" value={it.qty} onChange={(e)=> updateQty(it.id, Math.max(1, parseInt(e.target.value||1)))} className="w-16 p-1 border rounded" />
                <button onClick={()=> remove(it.id)} className="px-3 py-1 bg-red-500 text-white rounded">Remove</button>
              </div>
            </div>
          ))}
          <div className="p-4 bg-white rounded flex items-center justify-between">
            <div>Total</div>
            <div className="font-bold">₹{total}</div>
          </div>
          <div className="flex gap-2">
            <button onClick={()=> alert('Checkout stub: integrate your backend / payment gateway')} className="px-4 py-2 bg-green-600 text-white rounded">Checkout</button>
            <button onClick={clear} className="px-4 py-2 border rounded">Clear</button>
          </div>
        </div>
      )}
    </div>
  )
}
