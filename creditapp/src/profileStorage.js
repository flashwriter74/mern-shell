export class storageUtility {
    constructor (pf) {
        this.profileSetup = pf;


        this.startBracket = this.startBracket.bind(this);

    }

    supports_html5_storage() {
        try {
            console.log(window['localStorage'] !== null);
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
          return false;
        }
      }
    
    isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    storeLocal(goods) {
        //localStorage workaround
        var canStore = supports_html5_storage();
    
        if (canStore) {
            // window.localStorage is available!
            console.log("storage available");
            localStorage.setItem('userAlias', goods.alias);
            localStorage.setItem('userEmail', goods.email);
            localStorage.setItem('userFname', goods.fname);
            localStorage.setItem('userLname', goods.lname);
            localStorage.setItem('fullAdmin', goods.fullAdmin);
            const fullname = `${goods.fname} ${goods.lname}`;
            localStorage.setItem('userName', fullname);
            /*
            const rememberMe = localStorage.getItem('accessProfile');
            console.log(rememberMe);
            */
        } else {
            // no native support for HTML5 storage :(
            // maybe try dojox.storage or a third-party solution
        }
            
    }


    

}