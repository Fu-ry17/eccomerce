import { IOrders, IProducts, IUserRegister } from "./TypeScript";


export const validRegister = (user: IUserRegister) => {
    const { name, account, password, cf_password } = user

    if(!name) {
        return ({ msg: 'username is required!'})
    }

    if(!account) {
        return({ msg: 'e-mail is required!'})
    }else if(!validateEmail(account)){
        return ({ msg: 'enter a valid e-mail address!'})
    }

    if(!password){
        return ({ msg: 'password is required!'})
     }else if(password.length < 8){
        return ({ msg: 'password should be atleast 8 characters!'})
    }

    if(!cf_password){
        return ({ msg: 'confirm your password'})
     }else if(cf_password !== password){
        return ({ msg: `the two passwords don't match!`})
    }
}

export const validPassword =(password: string, cf_password: string) => {
    if(!password){
        return ({ msg: 'password is required!'})
     }else if(password.length < 8){
        return ({ msg: 'password should be atleast 8 characters!'})
    }

    if(!cf_password){
        return ({ msg: 'confirm your password'})
     }else if(cf_password !== password){
        return ({ msg: `the two passwords don't match!`})
    }
}

export const validProducts = (data: IProducts ) =>{
     const { title, description, category, quantityInStock, price} = data

    if(!title) {
        return ({ msg: 'title is required'})
    }
        
    if(!description) {
        return ({ msg: 'description is required'})
    }
            
    if(!category){ 
        return ({ msg: 'category is required'})
    }

    if(!price){
        return ({ msg: 'price is required'})
    }
        
    if(!quantityInStock){
        return ({ msg: 'quantity is required'})
    }
}

export const validOrder = ( phone: string, data: IOrders, cart: IProducts[]) => {
     const { paymentMethod, location } = data
    if(!phone){
        return ({ msg: 'phone number is required'})
    }

    if(!paymentMethod){
        return ({ msg: 'a payment method is required'})
    }

    if(!location){
        return ({ msg: 'delivery location is required'})
    }

    if(cart.length === 0){
        return ({ msg: 'cannot place order with empty cart'})
    }

}

export const validateEmail = (email: string) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const permissionCheck = () => {
        // Let's check if the browser supports notifications
        if (!("Notification" in window)) {
          alert("This browser does not support desktop notification");
        }
      
        // Let's check whether notification permissions have already been granted
        else if (Notification.permission === "granted") {
          // If it's okay let's create a notification  
          localStorage.setItem('notified', "true")
        }

      
        // Otherwise, we need to ask the user for permission
        else if (Notification.permission === "denied" || Notification.permission === "default" ) {
          Notification.requestPermission().then(function (permission) {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
              localStorage.setItem('notified', "true")
            }
          });
        }
}