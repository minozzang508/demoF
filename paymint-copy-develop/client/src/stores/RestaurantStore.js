import { observable,action, computed } from "mobx";
import RestaurantModel from "../models/restaurant";
import RestaurantRepository from '../Repository/RestaurantRepository';
import * as moment from 'moment'


class RestaurantStore{

    
    @observable open=false;
    @observable info= [] ; // service에서 fetch받아와야함 RestaurantModel 형태로 받아서. 
    @observable asyncState = '1'; // "pending" / "done" / "error"


    @action
    setAsyncState = (state) => {
      this.asyncState = state;
    }// 3개의 state에 따라 페이지 렌더링 
    
    @action setOpen(open){
        this.open = open;
    }

    @action setInfo = (data) => {
        this.info = data;
    }

    @action setMenu(menu){
        //this.menu = services.getMenu;  // 객체 타입으로 받아오기 . 
    }

    @action setTotalPrice(totalPrice){
        this.totalPrice = totalPrice + this.totalPrice;
    }

    @computed
    get getOpen(){
        return this.open;
    }


   

    @action
    fetchRestaurantInfo = async (id) =>{
        this.setAsyncState('pending') // loading bar로 보여지게 
        try{
            let res = await RestaurantRepository.getRestaurantInfo(id);
            // console.log(res.name);
            if(!res) throw new Error('Data is empty');
            let data = new RestaurantModel(res);
            
            this.setInfo(data.asJson);
            this.checkOpen();
            this.setAsyncState('done') // 완료. 
            res=null;
        }catch(error){
            this.setAsyncState('error');// error 페이지 렌더링
           
        }
        // try-catch를 사용해 데이터를 비동기로 받아오게 구현. 
    } 

    @action
    checkOpen() {
        let openTime = moment({ hour:this.info.openHour, minute:this.info.openMin });

        let closeTime = moment({ hour:this.info.closeHour, minute:this.info.closeMin });

        let date = moment();

        if( date.diff(openTime) > 0 && closeTime.diff(date) > 0 ){
                this.setOpen(true);
        }
        
        // console.log(date.diff(openTime, 'hours'));
        // console.log(closeTime.diff(date, 'hours'));
        // console.log(this.open);

        date = null;
        openTime = null;
        closeTime = null;
        return this.open;
    }
    // 현재 시간을 구해서 open~ close 사이면 영업 아니면 영업준비중 으로 표시 .
    // 


}

export default RestaurantStore;
