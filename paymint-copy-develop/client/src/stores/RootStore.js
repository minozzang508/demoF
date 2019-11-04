import CommonStore from './CommonStore';
import RestaurantStore from './RestaurantStore';
import CounterStore from './CounterStore';
import MenuStore from './MenuStore';
import CategoryStore from './CategoryStore';
import NavigationStore from './NavigationStore';
import OrderStore from './OrderStore';
import PaymentStore from './PaymentStore';

class RootStore {
  constructor() {
    this.commonStore = new CommonStore(this);
    this.restaurantStore = new RestaurantStore(this);
    this.counterStore = new CounterStore(this);
    this.menuStore = new MenuStore(this);
    this.categoryStore = new CategoryStore(this);
    this.navigationStore = new NavigationStore(this);
    this.orderStore = new OrderStore(this);
    this.paymentStore = new PaymentStore(this);
  }
}
export default new RootStore();
