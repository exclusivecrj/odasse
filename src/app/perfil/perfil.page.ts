import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Perfil } from 'src/app/model/perfil';
import * as firebase from 'firebase';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  listaDePerfis: Perfil[] = [];
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

  //listar e funções

  getList() {
    this.loading();

    var ref = firebase.firestore().collection("perfil");
    ref.get().then(query => {
      query.forEach(doc => {
        let r = new Perfil();
        r.setDados(doc.data());
        r.id = doc.id;

        let ref = firebase.storage().ref().child(`perfil/${doc.id}.jpg`).getDownloadURL().then(url => {
          r.img = url;

          this.listaDePerfis.push(r);
        }).catch(err => {
          this.listaDePerfis.push(r);
        })
      });
      this.loadingController.dismiss();
    });
  }

  remove(obj: Perfil) {
    var ref = firebase.firestore().collection("perfil");
    ref.doc(obj.id).delete()
      .then(() => {
        this.listaDePerfis = [];
        this.getList();
      }).catch(() => {
        console.log('Erro ao atualizar');
      })
  }

  perfilEdit(obj: Perfil) {
    this.router.navigate(['/edita-perfil', { 'perfil' : obj.id }]);
  }

  perfil(obj: Perfil) {
    this.router.navigate(['/view-perfil', { 'perfil' : obj.id }]);
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
