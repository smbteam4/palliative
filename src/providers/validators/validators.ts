export class ValidationService {
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config = {
      'required': 'Required',
      'acceptPrivacy':'Please Accept Privacy Policy'
    };

    return config[validatorName];
  }

  static acceptPrivacy(control) {
    // console.log(control.value,'valueeeeeeeeeeeeeee');
    var cardNum = control.value;
     if(cardNum){
       return null
     } else {
      return { 'acceptPrivacy': true };
     }
    // // Visa, MasterCard, American Express, Diners Club, Discover, JCB
    // if (cardNum.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
    //   return null;
    // } else {
    //   return { 'invalidCreditCard': true };
    // }
  }



  // static locationValidator(control){
  //   if (!control.root.value['selectedFlag']) {
  //     return null;
  //   } else {
  //     return { 'invalidLocation': true };
  //   }
   
  // }

  static passwordValidator(control) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
      return null;
    } else {
      return { 'invalidPassword': true };
    }
  }

  static setting_confirm_passwordValidator(control){
    // console.log(control.value,'1234569879');
    // console.log(control.root.value['new_password'],'12345678933333333');
    if (control.value == control.root.value['new_password']) {
      console.log('passwords  match');
      return null;
    } else {
      return { passwordNotMatch: true };
    }
  }
  static confirm_passwordValidator(control) {
    if (control.value == control.root.value['password']) {
      console.log('passwords  match');
      return null;
    } else {
      return { passwordNotMatch: true };
    }
      // if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
      //   return null;
      // } else {
      //   return { 'invalidPassword': true };
      // }
  }
  static cn_passwordValidator(control) {
    if (control.value == control.root.value['new_password']) {
      console.log('passwords  match');
      return null;
    } else {
      return { passwordNotMatch: true };
    }
  }
  
}