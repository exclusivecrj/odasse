import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pre-login',
  templateUrl: './pre-login.page.html',
  styleUrls: ['./pre-login.page.scss'],
})
export class PreLoginPage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  login(){
    this.router.navigate(['/home']);
  }


}
