import { Component, OnInit } from '@angular/core';
import { Perfil } from 'src/app/model/perfil';
import * as firebase from 'firebase';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-view-perfil',
  templateUrl: './view-perfil.page.html',
  styleUrls: ['./view-perfil.page.scss'],
})
export class ViewPerfilPage implements OnInit {
  
  perfil: Perfil = new Perfil();
  id: string;
  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true };

  formGroup: FormGroup;

  img : string = "";

  constructor(public activateRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    public router: Router,
    public fire : AngularFireAuth,
    public loadingController: LoadingController) {

    this.id = this.activateRoute.snapshot.paramMap.get('perfil');
    this.form();

    this.fire.authState.subscribe(obj=>{
      this.id = this.fire.auth.currentUser.uid;
      this.obterPerfil();


    });


  }

  form() {
    this.formGroup = this.formBuilder.group({
      nome: [this.perfil.nome],
      telefone: [this.perfil.telefone],
      email: [this.perfil.email],
      endereco: [this.perfil.endereco],
      cep: [this.perfil.cep],
      bairro: [this.perfil.bairro],
      complemento: [this.perfil.complemento],
      cpf: [this.perfil.cpf],
      numero: [this.perfil.numero],
      img: [this.perfil.img],
    });
  }

  ngOnInit() {
   
  }

  obterPerfil() {
    var ref = firebase.firestore().collection("perfil").doc(this.id);
    ref.get().then(doc => {
      console.log(doc.data());
      this.perfil.setDados(doc.data());
      this.form();
    }).catch(function (error) {
      console.log("Error getting document: ", error);
    });
  }

  downloadFoto(){
    let ref = firebase.storage().ref()
      .child(`perfil/${this.perfil.id}.jpg`);
      ref.getDownloadURL().then( url=>{ 
        this.img = url;
      })
  }

}
