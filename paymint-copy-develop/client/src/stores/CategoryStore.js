
import { observable, action,runInAction } from 'mobx';
import CategoryRepository from '../Repository/CategoryRepository';
import { cloneDeep } from 'lodash';

class CategoryStore {
    @observable categories = [];
    @observable state = 'pending'; // "pending" / "done" / "error"
 
    @action
    fetchCategories = async (id) => {
      this.categories=[];
      this.state='pending'; // loading bar로 보여지게 
      try{
          const res = await CategoryRepository.getCategory(id);
          if(!res) throw new Error('Data is empty');
          runInAction(() => {
            // console.log(this.categories);
            this.state = "done"
            // this.categories = Object.create(res);
            this.categories  = cloneDeep(res);
        })
      }catch(error){
        runInAction(()=> {
          this.state = "error"// error 페이지 렌더링
        })
      }
     
    }

   


  
}
  

  export default CategoryStore;