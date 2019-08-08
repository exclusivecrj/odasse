import { Component, OnInit } from '@angular/core';
import { Pedido } from '../model/pedido';
import { StorageService } from '../service/storage.service';
import { roupas } from '../model/roupas';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage implements OnInit {

  firestore = firebase.firestore();
  imagem;
  settings = { timestampsInSnapshots: true };
  filtro;
  valor;
  id: string;

  pedido: Pedido = new Pedido();

  constructor(public storageServ: StorageService,
    public router: Router, ) {
    this.pedido = storageServ.getCart();

  }

  ngOnInit() {
  }

  removeCar(r : roupas){
    console.log(r)
    this.storageServ.setRemoveCart(r);
    this.pedido = this.storageServ.getCart();
  }


  // ion-fab dos redirecionamentos

  finalizarCompra(){
    this.router.navigate(['/finalizar-compra']);
  }

  downloadFoto() {
    let ref = firebase.storage().ref()
      .child(`carrinho/${this.id}.jpg`);

    ref.getDownloadURL().then(url => {
      this.imagem = url;
    })
  }
}



