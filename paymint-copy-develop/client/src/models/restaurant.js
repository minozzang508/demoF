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
  id:yup.number().required(),
  name:yup.string().required(),
  address:yup.string().required(),
  phone:yup.string().required(),
  openHour:yup.number().required(),
  openMin:yup.number().required(),
  closeHour:yup.number().required(),
  closeMin:yup.number().required(),
  description:yup.string().required()
})

class RestaurantModel {
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
        id: this.id,
        name: this.name,
        address : this.address,
        phone : this.phone,
        openHour: this.openHour,
        openMin: this.openMin,
        closeHour: this.closeHour,
        closeMin: this.closeMin,
        description : this.description
    };
  }

}


export default RestaurantModel;