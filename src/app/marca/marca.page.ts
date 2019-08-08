import { Component, OnInit } from '@angular/core';
import { Marca } from '../model/marca';
import * as firebase from 'firebase';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.page.html',
  styleUrls: ['./marca.page.scss'],
})
export class MarcaPage implements OnInit {

  listaDeMarcas: Marca[] = [];
  firestore = firebase.firestore();
  img;
  settings = { timestampsInSnapshots: true };
  id: string;

  constructor(public router: Router,
    public loadingController: LoadingController,
    public activateRoute: ActivatedRoute) { 
      
     }

  ngOnInit() {
    this.getList();
  }

  //listar e funções

  getList() {
    this.loading();

    var ref = firebase.firestore().collection("marca");
    ref.get().then(query => {
      query.forEach(doc => {
        

    console.log('tamo ae');
        let r = new Marca();
        r.setDados(doc.data());
        r.id = doc.id;

        let ref = firebase.storage().ref().child(`marca/${doc.id}.jpg`).getDownloadURL().then(url => {
          r.img = url;

          this.listaDeMarcas.push(r);
        }).catch(err => {
          this.listaDeMarcas.push(r);
        })
      });
      this.loadingController.dismiss();
    });
    
  }

  remove(obj: Marca) {
    var ref = firebase.firestore().collection("marca");
    ref.doc(obj.id).delete()
      .then(() => {
        this.listaDeMarcas = [];
        this.getList();
      }).catch(() => {
        console.log('Erro ao atualizar');
      })
  }

  marcaEdit(obj: Marca) {
    this.router.navigate(['/edita-marca', { 'marca' : obj.id }]);
  }

  downloadFoto() {
    let ref = firebase.storage().ref()
      .child(`marca/${this.id}.jpg`);
    
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
