import { observable, action, runInAction } from "mobx";
import PaymentRepository from "../Repository/PaymentRepository";
import { cloneDeep } from "lodash";

class PaymentStore {
  @observable order = observable.map();
  @observable state = "pending";

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action
  setOrder(orderDetail) {
    this.order = cloneDeep(orderDetail);
    console.log(this.order);
  }

  @action
  cancelOrder = async () => {
    const id = this.order.id;
    try {
      const res = await PaymentRepository.deleteOrder(id);
      runInAction(() => {
        this.state = "done";
        if( res.status === 200){
          alert("주문 취소에 성공했습니다." );
          this.rootStore.orderStore.reset();
        }else{
          alert('주문 취소에 실패 했습니다.');
        }
        
      });
    } catch (error) {
      runInAction(() => {
        this.state = "error";
      });
    }
  };
  
  @action
  changeOrder = async () =>{
     
      
  }

}

export default PaymentStore;
