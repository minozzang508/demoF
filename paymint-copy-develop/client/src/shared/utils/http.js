import axios from 'axios';


// const baseURL = "http://localhost:7800/";
const baseURL = process.env.REACT_APP_API_HOST;


export const instance = axios.create({
    headers: {
      Accept: 'application/json',
    },
    baseURL,
  });