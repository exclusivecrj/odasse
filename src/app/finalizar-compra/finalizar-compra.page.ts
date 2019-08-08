import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { MenuController, LoadingController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finalizar-compra',
  templateUrl: './finalizar-compra.page.html',
  styleUrls: ['./finalizar-compra.page.scss'],
})
export class FinalizarCompraPage implements OnInit {

  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true };
  idUsuario: string = "";

  constructor(private menu: MenuController,
    public fire: AngularFireAuth,
    private router: Router,
    public loadingController: LoadingController,
    public toastController: ToastController, ) {

    this.fire.authState.subscribe(obj => {
      this.idUsuario = this.fire.auth.currentUser.uid;
      this.verificaClienteCadastro();
      console.log(this.idUsuario);
    });


  }

  ngOnInit() {
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  verificaClienteCadastro() {

    let ref = this.firestore.collection('perfil').doc(this.idUsuario).get().then(doc => {

      if (!doc.exists) {
        this.router.navigate(['/cadastrar-perfil']);
      }
    });
  }

  async loading() {
    const loading = await this.loadingController.create({
      message: 'Carregando',
      duration: 1000
    });
    await loading.present();
  }

  async toast(msg: string) {
    const toast = await this.toastController.create({
      message: 'Compra Finalizada com sucesso!',
      duration: 2000
    });
    toast.present();
  }

  finalizarCompra(){
    this.toast("Erro ao Cadastrar!");
  }

}
