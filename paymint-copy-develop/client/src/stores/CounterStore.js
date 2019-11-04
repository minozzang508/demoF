import { observable, action } from 'mobx';

class CounterStore {
    
  @observable number = 0;

  constructor(rootStore){
      this.rootStore = rootStore;
      
  }

  @action increase = () => {
    this.number++;
  }

  @action decrease = () => {
    this.number--;
  }
}

export default CounterStore;