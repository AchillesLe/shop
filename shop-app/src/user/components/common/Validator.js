var err = {}
const isRequired = (value,name) =>{
    if(!value){
        err = {...err,[name]:"Trường dưới đây không được rỗng"};
    }else{
        delete err[name]
    }
    
}
const isNumber = (value,name)=>{
    var numberPattern =  new RegExp(/^\d{8,12}$/)
    if(!numberPattern.test(value)){
        err = {...err,[name]:"Trường dưới đây phải là số"};
    }
    else{
       delete err[name]
    }
    
}

const isEmail = (value,name)=>{
    var emailPattern =  new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    if(!emailPattern.test(value)){
        err = {...err,[name]:"Email không hợp lệ"};
    }
    else{
       delete err[name]
    }
}
const isAddress = (value, name) => {
    var addressPattern = new RegExp(/^(\w+\/?)+(\ ?\w+)/)
    if (!addressPattern.test(value)) {
      err = { ...err, [name]: "Địa chỉ không hợp lệ" };
    } else {
      delete err[name];
    }

}
export const validator=(value,name,typeValid)=>{
    typeValid.forEach((type)=>{
        switch(type){
            case "required":
                isRequired(value,name)
                break;
            case 'number':
                isNumber(value,name)
                break;
            case 'email':
                isEmail(value,name)
                 break;
            case 'address':
                isAddress(value,name)
                 break;
            default: err;
        }
    })
   return err;
}