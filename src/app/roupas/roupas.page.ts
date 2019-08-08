import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/model/pedido';
import * as firebase from 'firebase';
import { roupas } from 'src/app/model/roupas';
import { ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../service/storage.service';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Item } from 'src/app/model/item';

@Component({
  selector: 'app-roupas',
  templateUrl: './roupas.page.html',
  styleUrls: ['./roupas.page.scss'],
})
export class RoupasPage implements OnInit {

  @ViewChild("textoBusca") textoBusca;

  listaDeRoupas: roupas[] = [];
  firestore = firebase.firestore();
  imagem;
  settings = { timestampsInSnapshots: true };
  filtro;
  valor;
  id: string;

  pedido: Pedido = new Pedido();
  filtroBox = "none";

  constructor(public router: Router,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public storageServ: StorageService,
    public activateRoute: ActivatedRoute) {

    this.filtro = this.activateRoute.snapshot.paramMap.get('filtro');
    this.valor = this.activateRoute.snapshot.paramMap.get('valor');
    
    
      this.pedido = this.storageServ.getCart();


  }

  ngOnInit() {
    
    if (this.filtro == null)
      this.getList();
  }

  //lista e functions

  getList() {
    this.loading();

    var ref = firebase.firestore().collection("roupas");
    ref.get().then(query => {
      query.forEach(doc => {
        let r = new roupas();
        r.setDados(doc.data());
        r.id = doc.id;

        let ref = firebase.storage().ref().child(`roupas/${doc.id}.jpg`).getDownloadURL().then(url => {
          r.img = url;

          this.listaDeRoupas.push(r);
        }).catch(err => {
          this.listaDeRoupas.push(r);
        })
      });
      this.loadingController.dismiss();
    });
  }

  downloadFoto() {
    let ref = firebase.storage().ref()
      .child(`roupas/${this.id}.jpg`);

    ref.getDownloadURL().then(url => {
      this.imagem = url;
    })
  }

  viewRoupa(obj: roupas) {
    this.router.navigate(['/edita-roupas', { 'roupas': obj.id }]);
    console.log('Hello World');
  }

  remove(obj: roupas) {
    var ref = firebase.firestore().collection("roupas");
    ref.doc(obj.id).delete()
      .then(() => {
        this.listaDeRoupas = [];
        this.getList();
      }).catch(() => {
        console.log('Erro ao atualizar');
      })
  }

  addCarrinho(roupas: roupas) {
    this.pedido = this.storageServ.getCart();
    let add = true;

    let i = new Item();
    i.roupas = roupas;
    i.quantidade = 1;

    console.log(roupas);


    if (this.pedido == null) {
      this.pedido = new Pedido();
      this.pedido.itens = [];
    }

    this.pedido.itens.forEach(p => {
      if (p.roupas.id == roupas.id) {
        add = false;
      }


    })

    if (add == true) this.pedido.itens.push(i);


    this.storageServ.setCart(this.pedido);
    console.log(this.pedido);
  }

  //outros

  async loading() {
    const loading = await this.loadingController.create({
      message: 'Carregando',
      duration: 2000
    });
    await loading.present();
  }

  async toast(msg: string) {
    const toast = await this.toastController.create({
      message: 'Cadastrado com sucesso!',
      duration: 2000
    });
    toast.present();
  }

  showFilter(){
    if(this.filtroBox=='none')
      this.filtroBox = 'block'
    else
      this.filtroBox = 'none'
  }

  cart() {
    this.router.navigate(['/carrinho'])
  }

}
