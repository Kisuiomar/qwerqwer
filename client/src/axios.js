import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000'
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token');
    return config;
});
  

// axios.get('/posts')
    // .then(response => {
    //     console.log(response.data);
    // })
    // .catch(error => {
    //     console.error('Error fetching posts:', error);
    // });


export default instance