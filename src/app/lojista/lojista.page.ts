import { Component, OnInit } from '@angular/core';
import { lojista } from '../model/lojista';
import * as firebase from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-lojista',
  templateUrl: './lojista.page.html',
  styleUrls: ['./lojista.page.scss'],
})
export class LojistaPage implements OnInit {

  listaDeLojista: lojista[] = [];
  firestore = firebase.firestore();
  img;
  settings = { timestampsInSnapshots: true };
  id: string;

  constructor(public router: Router,
    public loadingController: LoadingController,
    public activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.loading();

    var ref = firebase.firestore().collection("lojista");
    ref.get().then(query => {
      query.forEach(doc => {
        let r = new lojista();
        r.setDados(doc.data());
        r.id = doc.id;

        let ref = firebase.storage().ref().child(`lojista/${doc.id}.jpg`).getDownloadURL().then(url => {
          r.img = url;

          this.listaDeLojista.push(r);
        }).catch(err => {
          this.listaDeLojista.push(r);
        })
      });
      this.loadingController.dismiss();
    });
  }

  remove(obj: lojista) {
    var ref = firebase.firestore().collection("lojista");
    ref.doc(obj.id).delete()
      .then(() => {
        this.listaDeLojista = [];
        this.getList();
      }).catch(() => {
        console.log('Erro ao atualizar');
      })
  }

  perfilEdit(obj: lojista) {
    this.router.navigate(['/edita-lojista', { 'lojista' : obj.id }]);
  }

  downloadFoto() {
    let ref = firebase.storage().ref()
      .child(`perfil/${this.id}.jpg`);
    
    ref.getDownloadURL().then(url => {
      this.img = url;
    })
  }

   // Outros

   async loading() {
    const loading = await this.loadingController.create({
      message: 'Carregando',
      duration: 2000
    });
    await loading.present();
  }

}
