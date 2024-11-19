import axios from'axios'

export default new class ApiService {
    
    BASE_URL="https://jsonplaceholder.typicode.com/users";
   
    getListApi(){
        return axios.get(`${this.BASE_URL}`);
    }

    deleteApi(apiId:number){
        return axios.delete(`${this.BASE_URL}${apiId}`)
    }

    getUserMesseges(id:number){
        return axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
    }
}