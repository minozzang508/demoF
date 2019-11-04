
import { observable, action,runInAction } from 'mobx';
import MenuRepository from '../Repository/MenuRepository';
import { cloneDeep } from 'lodash';

class MenuStore {
    // @observable selectedItems = [];
    @observable menu = [];
    @observable state = 'pending'; // "pending" / "done" / "error"
    // @observable totalPrice=0;
    // @observable totalQuantity=0;

    constructor(rootStore) {
      this.rootStore = rootStore;
    }
    @action
    setAsyncState = (state) => {
      this.asyncState = state;
      
    }// 3개의 state에 따라 페이지 렌더링 


    @action
    fetchMenu = async (id) => {
      this.menu=[];
      this.state = "pending" // loading bar로 보여지게 
      try{
          const res = await MenuRepository.getMenu(id);
         // Array 형태임 response가 따라서 MenuModel Array로 받아야함. 
          if(!res) throw new Error('Data is empty');
        
          runInAction(() => {
            this.state = "done"
            this.menu = cloneDeep(res);
        })
     
      }catch(error){
        runInAction(()=> {
          this.state = "error"// error 페이지 렌더링
        })
       
      }
     
    }
  



  }
  

  export default MenuStore;