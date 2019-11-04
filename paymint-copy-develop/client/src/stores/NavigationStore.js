import { observable } from 'mobx'
import {createBrowserHistory} from 'history'

class NavigationStore {
  @observable location = null;
  history = createBrowserHistory();

    push(location) {
        this.history.push(location);
    }
    replace(location) {
        this.history.replace(location);
    }
    go(page) {
        this.history.go(page);
    }
    goBack() {
        this.history.goBack();
    }
    goForward() {
        this.history.goForward();
    }
}


export default NavigationStore;