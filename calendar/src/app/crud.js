import axiosApi from "./config/axios"

const Date_ENDPOINT="http://localhost:5000"

const addDATE=async(data)=>
    {
    return await axiosApi.post(`${Date_ENDPOINT}/date`,data)
    }
const deleteDATE = async (id)=>
    {
        return await axiosApi.delete(`${Date_ENDPOINT}/${id}`)
    }
const updateDATE = async (id, data) => {
        return await axiosApi.patch(`${Date_ENDPOINT}/${id}`, data);
    };
export default {addDATE,deleteDATE,updateDATE}
    
