import { Component, OnInit } from '@angular/core';
import { Marca } from '../model/marca';
import * as firebase from 'firebase';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-edita-marca',
  templateUrl: './edita-marca.page.html',
  styleUrls: ['./edita-marca.page.scss'],
})
export class EditaMarcaPage implements OnInit {

  marca: Marca = new Marca();
  id: string;
  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true };

  formGroup: FormGroup;

  img : string = "";

  constructor(public activateRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    public router: Router,
    public loadingController: LoadingController) {

    this.id = this.activateRoute.snapshot.paramMap.get('marca');
    this.form();

  }

  form() {
    this.formGroup = this.formBuilder.group({
      nome: [this.marca.nome],
      desc: [this.marca.desc],
      slogan: [this.marca.slogan],
      img: [this.marca.img],
    });
  }

  ngOnInit() {
    this.obterPerfil();
  }

  //Atualizar e funções

  obterPerfil() {
    var ref = firebase.firestore().collection("marca").doc(this.id);
    ref.get().then(doc => {
      this.marca.setDados(doc.data());
      this.form();
    }).catch(function (error) {
      console.log("Error getting document: ", error);
    });
  }

  atualizar(){
    this.loading();
    let ref = this.firestore.collection('marca')
    ref.doc(this.id).set(this.formGroup.value)
      .then(() =>{
        console.log('Atualizado com sucesso');
        this.router.navigate(['/marca']);
      }).catch(()=>{
        console.log('Erro ao Atualizar');
      })
  }

  enviaArquivo(event){
    let img = event.srcElement.files[0];
    //console.log(img.name);
    let ref = firebase.storage().ref().child(`marca/${this.id}.jpg`);
  
    ref.put(img).then(url=>{
      console.log("Enviado com sucesso!");
      this.downloadFoto();
    })
  }

  downloadFoto(){
    let ref = firebase.storage().ref()
      .child(`marca/${this.marca.id}.jpg`);
      ref.getDownloadURL().then( url=>{ 
        this.img = url;
      })
  }

  // Outros

  async loading() {
    const loading = await this.loadingController.create({
      message: 'Carregando',
      duration: 1000
    });
    await loading.present();
  }

}
