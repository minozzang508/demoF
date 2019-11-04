import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';



@observer
@inject('counterStore')
// **** 최하단에 잇던 observer 가 이렇게 위로 올라옵니다.
class Counter extends Component {


  componentDidMount(){
    console.log('Home did mount');
    // console.log(this.props);
    
  }

  render() {
    const counterStore = this.props.counterStore;
    return (
      <div>
        <h1>{counterStore.number}</h1>
        <button onClick={counterStore.increase} style={{background:'gray'}}>+1</button>
        <button onClick={counterStore.decrease} style={{background:'gray'}}>-1</button>
      </div>
    );
  }
}


// **** decorate 는 더 이상 필요 없어집니다.
// decorate(Counter, {
//   number: observable,
//   increase: action,
//   decrease: action
// })

// export default observer(Counter);
// **** observer 는 코드의 상단으로 올라갑니다.
export default Counter;