import axios from "axios";


const axiosApi=axios.create(

{//handeling async http requests 
baseURL:process.env.REACT_APP_SERVER_DOMAIN

}

)
export default axiosApi
