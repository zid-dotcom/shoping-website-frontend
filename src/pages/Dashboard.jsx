


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { addproductsApi, getPublicProductsApi, deleteProductApi } from "../services/AllApi"; 
// // make sure getPublicProductsApi and deleteProductApi exist in your AllApi.
// // If deleteProductApi is not available, the UI will still remove items locally and log a warning.

// export default function Dashboard() {
//   const navigate = useNavigate();

//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [apiMessage, setApiMessage] = useState("");

//   const [form, setForm] = useState({
//     name: "",
//     price: "",
//     description: "",
//     imgurl: "",
//   });

//   // products list state
//   const [products, setProducts] = useState([]);
//   const [listLoading, setListLoading] = useState(false);

//   const onChange = (e) => {
//     const { name, value } = e.target;
//     setForm((p) => ({ ...p, [name]: value }));
//   };

//   const validate = () => {
//     if (!form.name.trim()) return "Name is required";
//     if (!form.price.toString().trim()) return "Price is required";
//     if (isNaN(Number(form.price))) return "Price must be a number";
//     if (!form.description.trim()) return "Description is required";
//     if (!form.imgurl.trim()) return "Image URL is required";
//     return null;
//   };

//   // load products from API
//   const loadProducts = async () => {
//     setListLoading(true);
//     try {
//       const data = await getPublicProductsApi();
//       const items = Array.isArray(data) ? data : data?.products ?? data?.data ?? [];
//       setProducts(items);
//     } catch (err) {
//       console.error("Failed to load products:", err);
//       setApiMessage("Failed to load products. See console for details.");
//     } finally {
//       setListLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadProducts();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setApiMessage("");
//     const v = validate();
//     if (v) {
//       setApiMessage(v);
//       return;
//     }

//     const payload = {
//       name: form.name.trim(),
//       price: Number(form.price),
//       description: form.description.trim(),
//       imgurl: form.imgurl.trim(),
//     };

//     try {
//       setLoading(true);
//       console.log("ADD PRODUCT - request body:", payload);

//       const resp = await addproductsApi(payload);
//       console.log("ADD PRODUCT - response:", resp);

//       const data = resp?.data ?? resp;
//       const message = data?.message || data?.msg || "Product added.";
//       setApiMessage(message);

//       // clear form
//       setForm({ name: "", price: "", description: "", imgurl: "" });

//       // reload products list so admin sees the newly added product
//       await loadProducts();
//     } catch (err) {
//       console.error("ADD PRODUCT - error:", err);
//       const msg =
//         err?.response?.data?.message ||
//         err?.response?.data?.error ||
//         err?.message ||
//         "Add product failed. See console for details.";
//       setApiMessage(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (prodId) => {
//     if (!confirm("Delete this product? This cannot be undone.")) return;

//     // optimistic UI: remove locally first
//     const prev = [...products];
//     setProducts((p) => p.filter((it) => (it._id || it.id) !== prodId));

//     try {
//       if (typeof deleteProductApi === "function") {
//         await deleteProductApi(prodId);
//         setApiMessage("Product deleted.");
//       } else {
//         console.warn("deleteProductApi not available — deletion only in UI.");
//         setApiMessage("Product removed from view (API delete not configured).");
//       }
//     } catch (err) {
//       console.error("Delete failed:", err);
//       setApiMessage("Delete failed — reverting list. See console.");
//       setProducts(prev); // revert
//     }
//   };

//   const handleLogout = () => {
//     try {
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       localStorage.removeItem("username");
//     } catch (e) {}
//     navigate("/");
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex">
//       {sidebarOpen && <div className="fixed inset-0 bg-black/30 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} aria-hidden />}

//       <aside className={`fixed z-40 inset-y-0 left-0 transform bg-white border-r w-64 transition-transform duration-200 ease-in-out
//           ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:inset-auto`} role="complementary">
//         <div className="p-6 h-full flex flex-col justify-between">
//           <div>
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-xl font-semibold">Admin</h2>
//               <button className="lg:hidden text-gray-600" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">✕</button>
//             </div>

//             <nav className="space-y-2">
//               <button className="w-full text-left px-3 py-2 rounded-lg bg-indigo-50 text-indigo-700 font-medium"
//                 onClick={() => { setSidebarOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
//                 ➤ Add Product
//               </button>
//               <button className="w-full text-left px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100" disabled title="coming soon">
//                 Products (coming)
//               </button>
//               <button className="w-full text-left px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100" disabled title="coming soon">
//                 Orders (coming)
//               </button>
//             </nav>
//           </div>

//           <div className="mt-6">
//             <button onClick={handleLogout} className="w-full text-left px-3 py-2 rounded-lg border hover:bg-gray-50">Logout</button>
//             <div className="mt-3 text-xs text-gray-400">
//               Logged in as: <span className="text-gray-700">{localStorage.getItem("username") || localStorage.getItem("user") || "Admin"}</span>
//             </div>
//           </div>
//         </div>
//       </aside>

//       <div className="flex-1 lg:pl-64">
//         <div className="sticky top-0 z-20 bg-white border-b">
//           <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <button className="lg:hidden px-2 py-1 rounded-md text-gray-700 border" onClick={() => setSidebarOpen(true)} aria-label="Open sidebar">☰</button>
//               <h1 className="text-lg font-semibold">Dashboard</h1>
//             </div>
//             <div className="text-sm text-gray-500">Add new products to the store</div>
//           </div>
//         </div>

//         <main className="p-6">
//           <div className="max-w-3xl mx-auto space-y-8">
//             <section className="bg-white p-6 rounded-2xl shadow-sm">
//               <h3 className="text-lg font-medium mb-4">Add Product</h3>

//               {apiMessage && <div className="mb-4 text-sm px-4 py-2 rounded border bg-gray-50">{apiMessage}</div>}

//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
//                   <input name="name" value={form.name} onChange={onChange} className="w-full px-3 py-2 border rounded-lg" placeholder="Product name" disabled={loading} />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
//                   <input name="price" value={form.price} onChange={onChange} className="w-full px-3 py-2 border rounded-lg" placeholder="e.g. 499.99" disabled={loading} />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                   <textarea name="description" value={form.description} onChange={onChange} className="w-full px-3 py-2 border rounded-lg" placeholder="Short product description" rows={4} disabled={loading} />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
//                   <input name="imgurl" value={form.imgurl} onChange={onChange} className="w-full px-3 py-2 border rounded-lg" placeholder="https://..." disabled={loading} />
//                 </div>

//                 {form.imgurl.trim() && (
//                   <div className="pt-2">
//                     <div className="text-sm text-gray-600 mb-1">Preview</div>
//                     <div className="w-40 h-40 border rounded overflow-hidden">
//                       <img src={form.imgurl} alt="preview" onError={(e) => { e.currentTarget.src = ""; }} className="w-full h-full object-cover" />
//                     </div>
//                   </div>
//                 )}

//                 <div className="flex items-center gap-3 pt-4">
//                   <button type="submit" disabled={loading} className={`px-4 py-2 rounded-lg text-white ${loading ? "bg-indigo-400 cursor-wait" : "bg-indigo-600 hover:bg-indigo-700"}`}>
//                     {loading ? "Adding..." : "Add Product"}
//                   </button>

//                   <button type="button" onClick={() => setForm({ name: "", price: "", description: "", imgurl: "" })} className="px-3 py-2 rounded-lg border" disabled={loading}>
//                     Reset
//                   </button>
//                 </div>
//               </form>
//             </section>

//             {/* Products list for admin */}
//             <section className="bg-white p-6 rounded-2xl shadow-sm">
//               <h3 className="text-lg font-medium mb-4">Products (admin view)</h3>

//               {listLoading ? (
//                 <div className="text-center text-gray-500">Loading products…</div>
//               ) : products.length === 0 ? (
//                 <div className="text-center text-gray-500">No products found</div>
//               ) : (
//                 <div className="space-y-4">
//                   {products.map((p) => {
//                     const id = p._id || p.id;
//                     return (
//                       <div key={id} className="flex items-center gap-4 border rounded p-3">
//                         <div className="w-24 h-24 bg-gray-100 rounded overflow-hidden flex-shrink-0">
//                           <img src={p.imgurl || p.image || ""} alt={p.name} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = "")} />
//                         </div>

//                         <div className="flex-1">
//                           <div className="flex items-center justify-between gap-4">
//                             <div>
//                               <div className="font-semibold">{p.name}</div>
//                               <div className="text-sm text-gray-600">₹{p.price}</div>
//                             </div>

//                             <div className="text-sm text-gray-500">Stock: {p.stock ?? "—"}</div>
//                           </div>

//                           <div className="mt-2 text-sm text-gray-700">{p.description}</div>

//                           <div className="mt-3 flex gap-2">
//                             <button onClick={() => navigate(`/products/${id}`)} className="px-3 py-1 border rounded text-sm">View</button>
//                             <button onClick={() => handleDelete(id)} className="px-3 py-1 bg-red-500 text-white rounded text-sm">Delete</button>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}
//             </section>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }






// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  addproductsApi,
  getPublicProductsApi,
  deleteProductApi,
  updateProductApi, // <- new
} from "../services/AllApi";

export default function Dashboard() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState("");

  // form state (used for both Add & Edit)
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    imgurl: "",
  });

  // editing state: null = adding new product; otherwise holds id being edited
  const [editingId, setEditingId] = useState(null);

  // products list state
  const [products, setProducts] = useState([]);
  const [listLoading, setListLoading] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const validate = () => {
    if (!form.name.trim()) return "Name is required";
    if (!form.price.toString().trim()) return "Price is required";
    if (isNaN(Number(form.price))) return "Price must be a number";
    if (!form.description.trim()) return "Description is required";
    if (!form.imgurl.trim()) return "Image URL is required";
    return null;
  };

  // load products from API
  const loadProducts = async () => {
    setListLoading(true);
    try {
      const data = await getPublicProductsApi();
      const items = Array.isArray(data) ? data : data?.products ?? data?.data ?? [];
      setProducts(items);
    } catch (err) {
      console.error("Failed to load products:", err);
      setApiMessage("Failed to load products. See console for details.");
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // handle add or edit submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiMessage("");
    const v = validate();
    if (v) {
      setApiMessage(v);
      return;
    }

    const payload = {
      name: form.name.trim(),
      price: Number(form.price),
      description: form.description.trim(),
      imgurl: form.imgurl.trim(),
    };

    try {
      setLoading(true);
      console.log(editingId ? "EDIT PRODUCT - request body:" : "ADD PRODUCT - request body:", payload);

      if (editingId) {
        // update product
        const resp = await updateProductApi(editingId, payload);
        console.log("EDIT PRODUCT - response:", resp);
        const data = resp?.data ?? resp;
        const message = data?.message || data?.msg || "Product updated.";
        setApiMessage(message);
        setEditingId(null);
      } else {
        // add new product
        const resp = await addproductsApi(payload);
        console.log("ADD PRODUCT - response:", resp);
        const data = resp?.data ?? resp;
        const message = data?.message || data?.msg || "Product added.";
        setApiMessage(message);
      }

      setForm({ name: "", price: "", description: "", imgurl: "" });
      await loadProducts();
      // scroll to products section (optional)
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("ADD/EDIT PRODUCT - error:", err);
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Operation failed. See console for details.";
      setApiMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    const id = product._id || product.id;
    setEditingId(id);
    setForm({
      name: product.name ?? "",
      price: product.price ?? "",
      description: product.description ?? "",
      imgurl: product.imgurl ?? product.image ?? "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm({ name: "", price: "", description: "", imgurl: "" });
    setApiMessage("");
  };

  const handleDelete = async (prodId) => {
    if (!confirm("Delete this product? This cannot be undone.")) return;

    // optimistic UI: remove locally first
    const prev = [...products];
    setProducts((p) => p.filter((it) => (it._id || it.id) !== prodId));

    try {
      if (typeof deleteProductApi === "function") {
        await deleteProductApi(prodId);
        setApiMessage("Product deleted.");
      } else {
        console.warn("deleteProductApi not available — deletion only in UI.");
        setApiMessage("Product removed from view (API delete not configured).");
      }
    } catch (err) {
      console.error("Delete failed:", err);
      setApiMessage("Delete failed — reverting list. See console.");
      setProducts(prev); // revert
    } finally {
      // refresh list to get current state from backend
      await loadProducts();
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("username");
    } catch (e) {}
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {sidebarOpen && <div className="fixed inset-0 bg-black/30 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} aria-hidden />}

      {/* Sidebar - simplified (removed Products & Orders buttons) */}
      <aside
        className={`fixed z-40 inset-y-0 left-0 transform bg-white border-r w-64 transition-transform duration-200 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:inset-auto`}
        role="complementary"
      >
        <div className="p-6 h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Admin</h2>
              <button className="lg:hidden text-gray-600" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">✕</button>
            </div>

            <nav className="space-y-2">
              <button
                className="w-full text-left px-3 py-2 rounded-lg bg-indigo-50 text-indigo-700 font-medium"
                onClick={() => { setSidebarOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              >
                ➤ Add / Edit Product
              </button>

              {/* removed Products and Orders buttons per request */}
            </nav>
          </div>

          <div className="mt-6">
            <button onClick={handleLogout} className="w-full text-left px-3 py-2 rounded-lg border hover:bg-gray-50">Logout</button>
            <div className="mt-3 text-xs text-gray-400">
              Logged in as: <span className="text-gray-700">{localStorage.getItem("username") || localStorage.getItem("user") || "Admin"}</span>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 lg:pl-64">
        <div className="sticky top-0 z-20 bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className="lg:hidden px-2 py-1 rounded-md text-gray-700 border" onClick={() => setSidebarOpen(true)} aria-label="Open sidebar">☰</button>
              <h1 className="text-lg font-semibold">Dashboard</h1>
            </div>
            <div className="text-sm text-gray-500">{editingId ? "Editing product" : "Add new products to the store"}</div>
          </div>
        </div>

        <main className="p-6">
          <div className="max-w-3xl mx-auto space-y-8">
            <section className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="text-lg font-medium mb-4">{editingId ? "Edit Product" : "Add Product"}</h3>

              {apiMessage && <div className="mb-4 text-sm px-4 py-2 rounded border bg-gray-50">{apiMessage}</div>}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input name="name" value={form.name} onChange={onChange} className="w-full px-3 py-2 border rounded-lg" placeholder="Product name" disabled={loading} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                  <input name="price" value={form.price} onChange={onChange} className="w-full px-3 py-2 border rounded-lg" placeholder="e.g. 499.99" disabled={loading} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea name="description" value={form.description} onChange={onChange} className="w-full px-3 py-2 border rounded-lg" placeholder="Short product description" rows={4} disabled={loading} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input name="imgurl" value={form.imgurl} onChange={onChange} className="w-full px-3 py-2 border rounded-lg" placeholder="https://..." disabled={loading} />
                </div>

                {form.imgurl.trim() && (
                  <div className="pt-2">
                    <div className="text-sm text-gray-600 mb-1">Preview</div>
                    <div className="w-40 h-40 border rounded overflow-hidden">
                      <img src={form.imgurl} alt="preview" onError={(e) => { e.currentTarget.src = ""; }} className="w-full h-full object-cover" />
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3 pt-4">
                  <button type="submit" disabled={loading} className={`px-4 py-2 rounded-lg text-white ${loading ? "bg-indigo-400 cursor-wait" : "bg-indigo-600 hover:bg-indigo-700"}`}>
                    {loading ? (editingId ? "Updating..." : "Adding...") : (editingId ? "Update Product" : "Add Product")}
                  </button>

                  <button type="button" onClick={() => {
                    setForm({ name: "", price: "", description: "", imgurl: "" });
                    setEditingId(null);
                  }} className="px-3 py-2 rounded-lg border" disabled={loading}>
                    Reset
                  </button>

                  {editingId && (
                    <button type="button" onClick={handleCancelEdit} className="px-3 py-2 rounded-lg border text-sm">
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>
            </section>

            {/* Products list for admin */}
            <section className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="text-lg font-medium mb-4">Products (admin view)</h3>

              {listLoading ? (
                <div className="text-center text-gray-500">Loading products…</div>
              ) : products.length === 0 ? (
                <div className="text-center text-gray-500">No products found</div>
              ) : (
                <div className="space-y-4">
                  {products.map((p) => {
                    const id = p._id || p.id;
                    return (
                      <div key={id} className="flex items-center gap-4 border rounded p-3">
                        <div className="w-24 h-24 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                          <img src={p.imgurl || p.image || ""} alt={p.name} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = "")} />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-4">
                            <div>
                              <div className="font-semibold">{p.name}</div>
                              <div className="text-sm text-gray-600">₹{p.price}</div>
                            </div>

                            <div className="text-sm text-gray-500">Stock: {p.stock ?? "—"}</div>
                          </div>

                          <div className="mt-2 text-sm text-gray-700">{p.description}</div>

                          <div className="mt-3 flex gap-2">
                            <button onClick={() => navigate(`/products/${id}`)} className="px-3 py-1 border rounded text-sm">View</button>

                            <button onClick={() => handleEdit(p)} className="px-3 py-1 bg-yellow-500 text-white rounded text-sm">
                              Edit
                            </button>

                            <button onClick={() => handleDelete(id)} className="px-3 py-1 bg-red-500 text-white rounded text-sm">
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
