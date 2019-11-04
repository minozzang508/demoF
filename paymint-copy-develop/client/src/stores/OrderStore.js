import { observable, action, computed, runInAction } from "mobx";
import OrderRepository from '../Repository/OrderRepository';
import OrderModel from '../models/order';
import * as lodashUtil from 'lodash';

class OrderStore {
  @observable state = "pending"; // "pending" / "done" / "error"
  @observable paymentMethods=[];
  @observable selectedItems= [];
  @observable selectedPaymentId= 0;
  @observable agreement= false;
  @observable user= {
    phone: "01033146318"
  };
  @observable orderRequest= '';
  @observable errorMassage='';

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action
  reset = () =>{
    this.selectedItems = []
    this.selectedPaymentId = 0;
    this.agreement = false;
    this.user = {};
    this.orderRequest= '';
    this.errorMassage='';
  }

  @action
  setAsyncState = state => {
    this.asyncState = state;
  }; // 3개의 state에 따라 페이지 렌더링

  @action
  increaseQuantity = (name, price) => {
    // 존재하는지 찾고
    let exists = this.selectedItems.find(
      item => item.name === name && item.price === price
    );

    exists.count++;
    exists = null;
  };

  @action
  put = (name, price, count) => {
    // 존재하는지 찾고
    let exists = this.selectedItems.find(
      item => item.name === name && item.price === price
    );
    if (!exists) {
      // 존재하지 않는다면 새로 집어넣습니다.
      this.selectedItems.push({
        name,
        price,
        count
      });

      return;
    }
    exists.count += count;
    exists = null;
  };

  @action
  take = (name, price) => {
    let itemToTake = this.selectedItems.find(
      item => item.name === name && item.price === price
    );

    if (typeof itemToTake === "undefined") {
      return;
    } else {
      itemToTake.count--;
    }
    if (itemToTake.count === 0) {
      // 갯수가 0 이면
      const idx = this.selectedItems.findIndex(
        item => item.name === name && item.price === price
      );
      this.selectedItems.splice(idx, 1); // 배열에서 제거처리합니다.
    }
    itemToTake = null;
  };

  @action
  removeItem = (name, price) => {
    let itemIndex = this.selectedItems.findIndex(
      item => item.name === name && item.price === price
    );

    if (typeof itemIndex === "undefined") {
      return;
    } else {
      this.selectedItems.splice(itemIndex, 1);
    }

    itemIndex = null;
  };

  @computed
  get paymentMethodName(){
    if(this.selectedPaymentId >0){
      return  this.paymentMethods.find(
        item => item.id === this.selectedPaymentId
      ).name;
    } else{
      return ''
    }
  }

  @computed
  get total() {
    return this.selectedItems.reduce((previous, current) => {
      return previous + current.price * current.count;
    }, 0);
  }
  @computed
  get quantity() {
    return this.selectedItems.reduce((previous, current) => {
      return previous + current.count;
    }, 0);
  }

  @computed
  get summaryOrder(){
    if(this.selectedItems.length >0){
      return this.selectedItems[0].name + " 외 " + this.quantity + "개";
    }else{
      return '메뉴가 없음';
    }
  }

  @action
  setSelectedPaymentId = selectedPaymentId => {
    this.selectedPaymentId = selectedPaymentId;
  };

  @computed
  get getSelectedPaymentId() {
    return this.selectedPaymentId;
  }
  @action
  setAgreement = (agreement) => {
    this.agreement = agreement;
  };
  @computed
  get getAgreement(){
    return this.agreement;
  }
  
  @action
  fetchPaymentMethod = async () => {
      this.paymentMethods=[];
      this.state='pending';
      try{
          const res = await OrderRepository.getPaymentMethod();
          if(!res) throw new Error('Data is empty');
          runInAction( () => {
              this.state = 'done';
              this.paymentMethods = res;
          })

      }catch(error){
          runInAction( () => {
              this.state='error';
          })
      }
  }

  @action
  setOrderRequest = (orderRequest) => {
    this.orderRequest = orderRequest;
  }

  @computed
  get getOrderRequest(){
    return this.orderRequest;
  }x

  @action
  postOrder = async () => {
    this.state='pending';

    const selectedItems = lodashUtil.map(this.selectedItems, lodashUtil.clone);
  
    const values = {
     selectedItems ,
     selectedPaymentId: this.selectedPaymentId,
     ageement: this.agreement,
     restaurantId: this.rootStore.restaurantStore.info.id,
     orderRequest: this.orderRequest,
     createdAt: new Date(),
     updatedAt: new Date()
    }
   
    const orderModel = new OrderModel(values);
    try{
      const res = await OrderRepository.postOrder(
        orderModel
         );
      runInAction( () => {
        this.state = 'done';
        this.rootStore.paymentStore.setOrder(res.data);
        // this.reset();
      })
    }catch(error){
      runInAction( () => {
        this.state='error';

    })
    }
  }

}

export default OrderStore;
