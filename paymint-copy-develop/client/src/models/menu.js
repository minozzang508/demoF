import { extendObservable, action, computed } from 'mobx';
import * as yup from 'yup';


// import restaurantService from '../services/restaurantService';

  /*
  "openHour":17,
        "openMin":00,
        "closeHour":02,
        "closeMin":00,
  */


const scheme = yup.object().shape({
  id : yup.number().required(),
  name : yup.string().required(),
  price : yup.number().required(),
  quantity: yup.number().required(),
  img : yup.string().required(),
  delivery : yup.array().required(),
  restaurantId : yup.number().required()
})

class MenuModel {
  constructor(data) {
    try {
      const casted = scheme.cast(data);
      extendObservable(this, casted);
    } catch (e) {
      throw TypeError('type error during instantiating RestaurantModel');
    }
  }



  @action
  setName = (value) => {
    this.name = value;
  }

  @computed get asJson() {
    return {
      id : this.id  ,
      name : this.name ,
      price : this.price ,
      quantity : this.quantity ,
      img : this.img ,
      delivery : this.delivery ,
      restaurantId : this.restaurantId
    };
  }

}


export default MenuModel;