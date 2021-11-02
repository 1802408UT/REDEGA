import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dataemail = 'adminredega@gmail.com';
  datapassword = '123456789';
  
  constructor(public auth: AngularFireAuth,
    private router:Router) { }

  ngOnInit(): void {
  
  }
  logout() {
    this.auth.signOut();
    this.router.navigate(['']);
  }
  
  login(){
    this.auth.signInWithEmailAndPassword(this.dataemail, this.datapassword)
  .then((userCredential) => {
    // Signed in
    //this.router.navigate(['Inicio']);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  }
}
