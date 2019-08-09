import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  contact(){
    this.router.navigate(['/quem']);
  }

  cart(){
    this.router.navigate(['/carrinho']);
  }

  search(){
    this.router.navigate(['/roupas']);
  }

  logout(){
    this.router.navigate(['/logoff']);
  }

  quem(){
    this.router.navigate(['/quem']);
  }


}
