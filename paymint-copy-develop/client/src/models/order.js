import {
    extendObservable,
  } from 'mobx';
  import * as yup from 'yup';
  
  const schema = yup.object().shape({
    seletedItems: yup.array(
      yup.object().shape({
        name: yup.string().required(),
        price: yup.number().required(),
        count: yup.number().required()
      })
    ),
    selectedPaymentId: yup.number().required(),
    ageement: yup.boolean().required(),
    restaurantId: yup.number().required(),
    orderRequest: yup.string(),
    createdAt: yup.date().required(),
    updatedAt: yup.date(),
  });
  
  export default class OrderModel {
    constructor(data) {
      try {
        const casted = schema.cast(data);
        extendObservable(this, casted);
      } catch (e) {
        throw TypeError('type error during instantiating OrderItemModel');
      }
    }
    
  }
  
  /*
  const schema = yup.object().shape({
    seletedItems: array().of(
      object({

      })
    ),
    selectedPaymentId: yup.number().required(),
    ageement: yup.boolean().required(),
    restaurantId: yup.number().required(),
    orderRequest: yup.string(),
    createdAt: yup.date().required(),
    updatedAt: yup.date(),
  });
  
  {
  "orderDetail": {
    "seletedItems": [
      {
        "name": "와인 젤라또",
        "price": 3900,
        "count": 1
      }
    ],
    "selectedPaymentId": 3,
    "agreement": false,
    "restaurantId": 2
  },
  "id":1
}
*/