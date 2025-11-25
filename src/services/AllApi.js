import basurl from "./baeURl";
import axios from "axios";


// registerApi

export const LoginuserApi=async(data)=>{
    return await axios.post(`${basurl}/login`,data)
}


// resgisteruserApi
export const registeruserApi=async(data)=>{
    return await axios.post(`${basurl}/reg`,data)
}



// products Api



export const getPublicProductsApi = async () => {
  const resp = await axios.get(`${basurl}/public/get`, { headers: { Accept: 'application/json' } });
  return resp.data ?? resp;
};


export const addproductsApi = async (data) => {
  try {
    const token = localStorage.getItem("token"); // JWT stored at login
    console.log("AllApi.addproductsApi - token:", token);
    console.log("AllApi.addproductsApi - sending:", data);

    const resp = await axios.post(`${basurl}/add`, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // include token only if present
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    console.log("AllApi.addproductsApi - response:", resp);
    return resp;
  } catch (err) {
    console.error("AllApi.addproductsApi - error:", err);
    throw err;
  }
};




// DELETE product by ID (requires JWT)
export const deleteProductApi = async (id) => {
  try {
    const token = localStorage.getItem("token");
    console.log("AllApi.deleteProductApi - deleting id:", id, " token:", !!token);

    const resp = await axios.delete(`${basurl}/delete/${id}`, {
      headers: {
        Accept: "application/json",
        // include token only if present
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    console.log("AllApi.deleteProductApi - response:", resp);
    return resp.data ?? resp;
  } catch (err) {
    console.error("AllApi.deleteProductApi - error:", err);
    throw err;
  }
};




// UPDATE product by ID (requires JWT)
export const updateProductApi = async (id, data) => {
  try {
    const token = localStorage.getItem("token");
    console.log("AllApi.updateProductApi - id:", id, " token:", !!token, " payload:", data);

    const resp = await axios.put(`${basurl}/edit/${id}`, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    console.log("AllApi.updateProductApi - response:", resp);
    return resp.data ?? resp;
  } catch (err) {
    console.error("AllApi.updateProductApi - error:", err);
    throw err;
  }
};
