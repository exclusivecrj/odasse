import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quem',
  templateUrl: './quem.page.html',
  styleUrls: ['./quem.page.scss'],
})
export class QuemPage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  cart(){
    this.router.navigate(['/carrinho']);
  }

  search(){
    this.router.navigate(['/roupas']);
  }

}
