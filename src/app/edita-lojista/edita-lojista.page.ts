import { Component, OnInit } from '@angular/core';
import { lojista } from '../model/lojista';
import * as firebase from 'firebase';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-edita-lojista',
  templateUrl: './edita-lojista.page.html',
  styleUrls: ['./edita-lojista.page.scss'],
})
export class EditaLojistaPage implements OnInit {

  lojista: lojista = new lojista();
  id: string;
  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true };

  formGroup: FormGroup;

  img : string = "";

  constructor(public activateRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    public router: Router,
    public loadingController: LoadingController) {

    this.id = this.activateRoute.snapshot.paramMap.get('lojista');
    this.form();

  }

  form() {
    this.formGroup = this.formBuilder.group({
      nome: [this.lojista.nome],
      nomeLoja: [this.lojista.nomeLoja],
      telefone: [this.lojista.telefone],
      email: [this.lojista.email],
      endereco: [this.lojista.endereco],
      cep: [this.lojista.cep],
      bairro: [this.lojista.bairro],
      cidade: [this.lojista.cidade],
      estado: [this.lojista.estado],
      complemento: [this.lojista.complemento],
      cnpj: [this.lojista.cnpj],
      numero: [this.lojista.numero],
      img: [this.lojista.img],
    });
  }

  ngOnInit() {
    this.obterLojista();
  }

  obterLojista() {
    var ref = firebase.firestore().collection("lojista").doc(this.id);
    ref.get().then(doc => {
      this.lojista.setDados(doc.data());
      this.form();
    }).catch(function (error) {
      console.log("Error getting document: ", error);
    });
  }

  atualizar(){
    this.loading();
    let ref = this.firestore.collection('lojista')
    ref.doc(this.id).set(this.formGroup.value)
      .then(() =>{
        console.log('Atualizado com sucesso');
        this.router.navigate(['/lojista']);
      }).catch(()=>{
        console.log('Erro ao Atualizar');
      })
  }

  enviaArquivo(event){
    let img = event.srcElement.files[0];
    //console.log(img.name);
    let ref = firebase.storage().ref().child(`lojista/${this.id}.jpg`);
  
    ref.put(img).then(url=>{
      console.log("Enviado com sucesso!");
      this.downloadFoto();
    })
  }

  downloadFoto(){
    let ref = firebase.storage().ref()
      .child(`lojista/${this.lojista.id}.jpg`);
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
