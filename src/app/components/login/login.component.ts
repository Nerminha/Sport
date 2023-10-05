import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm:FormGroup;
obj:any={};
emailHolder:string="Email ";
title:string="Login";
errorMsg:string;
  constructor(private userService:UserService ,
    private router:Router) { }

  ngOnInit() {
  }
  login(){
    this.userService.login(this.obj).subscribe(
      (response)=>{
        if (response.msg!="2") {
          this.errorMsg="Check your email or pwd";
        }
        else{
          sessionStorage.setItem("token",response.token);
          this.router.navigate([""]);
        }
      }
    );
  }

}
