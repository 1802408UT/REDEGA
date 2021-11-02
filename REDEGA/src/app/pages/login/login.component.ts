import { Component, OnInit } from '@angular/core';
import { BaseFormUser } from '@shared/utils/base-form-user';
import { FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{
  
  dataemail = new FormControl('', [Validators.required, Validators.email]);
  datapassword = new FormControl('', [Validators.required, Validators.minLength(4)]);
  hide = true;

  constructor(
    public auth: AngularFireAuth,
    public loginForm: BaseFormUser,
    private router:Router){
  
  }
  getErrorMessage() {
    if (this.dataemail.hasError('required')) {
      return 'You must enter a value';
    }

    return this.dataemail.hasError('email') ? 'Not a valid email' : '';
  }
  loginwithGoogle() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.auth.signOut();
  }
  
  login(){
    this.auth.signInWithEmailAndPassword(this.dataemail.value, this.datapassword.value)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    console.log('Exito');
    this.router.navigate(['home']);
    /*
    console.log(user);
    console.log(user?.metadata.lastSignInTime);
    console.log(user?.uid);
    console.log(user?.email);
    console.log(user?.metadata.creationTime);
    console.log(user?.providerData);
*/
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  }
  /*
  change(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
 }*/

}
