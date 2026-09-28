import axios from "axios"

export const API_BASE_URL="http://localhost:5454"

export const authHeaders=()=>({
    Authorization:`Bearer ${localStorage.getItem("jwt")}`
})

export const getApiError=(error)=>
    error?.response?.data?.message || error?.response?.data || error?.message || "Request failed"

const api=axios.create(
    {
        baseURL:API_BASE_URL,
        headers:{

            "Content-Type":"application/json"
        }
    })

export default api;