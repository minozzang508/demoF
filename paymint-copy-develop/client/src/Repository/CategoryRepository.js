import {instance} from '../shared/utils/http';


// axios.post('/user', {
//   firstName: 'Fred',
//   lastName: 'Flintstone'
// })
// .then(function (response) {
//   console.log(response);
// })
// .catch(function (error) {
//   console.log(error);
// });


const CategoryRepository = {
    getCategory : async (id)=>{ // restaurant id
      
      const response = await instance.get('/category?restaurantId='+id);
      //  console.log(response.data);
      return response.data;
    },
    getCategoryById : async (id) => {
      const response = await instance.get('/category?id='+id);
      return response.data;
    }
} 




export default CategoryRepository;


/*

Response Scheme

{
  // `data` is the response that was provided by the server
  data: {},

  // `status` is the HTTP status code from the server response
  status: 200,

  // `statusText` is the HTTP status message from the server response
  statusText: 'OK',

  // `headers` the headers that the server responded with
  // All header names are lower cased
  headers: {},

  // `config` is the config that was provided to `axios` for the request
  config: {},

  // `request` is the request that generated this response
  // It is the last ClientRequest instance in node.js (in redirects)
  // and an XMLHttpRequest instance the browser
  request: {}
}

*/