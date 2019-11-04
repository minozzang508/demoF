import { observable, reaction,action } from "mobx";


class CommonStore{

    @observable appName = 'paymint-copy';
    @observable token = window.localStorage.getItem('jwt');
    @observable appLoaded = false ;


    constructor(){
        reaction(()=> this.token ,
            token => {
                if(token){
                    window.localStorage.setItem('jwt',token);
                }else{
                    window.localStorage.removeItem('jwt');
                }
            }
        );
    }


    @action setToken(token){
        this.token = token;
    }

    @action setAppLoaded(){
        this.appLoaded = true;
    }


}

export default CommonStore;
