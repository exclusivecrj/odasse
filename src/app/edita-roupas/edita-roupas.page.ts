import { Component, OnInit } from '@angular/core';
import { roupas } from 'src/app/model/roupas';
import * as firebase from 'firebase';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-edita-roupas',
  templateUrl: './edita-roupas.page.html',
  styleUrls: ['./edita-roupas.page.scss'],
})
export class EditaRoupasPage implements OnInit {

  roupas: roupas = new roupas();
  id: string;
  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true };

  formGroup: FormGroup;

  imagem: string = "";

  constructor(public activateRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    public router: Router,
    public loadingController: LoadingController) {

    this.id = this.activateRoute.snapshot.paramMap.get('roupas');
    this.form();
  }

  form() {
    this.formGroup = this.formBuilder.group({
      roupa: [this.roupas.roupa],
      preco: [this.roupas.preco],
      modelo: [this.roupas.modelo],
      marca: [this.roupas.marca],
      img: [this.roupas.img],
      cor: [this.roupas.cor],
    });
  }

  ngOnInit() {
    this.obterRoupa();
    
  }

  obterRoupa() {
    var ref = firebase.firestore().collection("roupas").doc(this.id);
    ref.get().then(doc => {
      this.roupas.setDados(doc.data());
      this.form();
      
    }).catch(function (error) {
      console.log("Error getting document: ", error);
    });
    
  }

  atualizar() {
    this.loading();
    let ref = this.firestore.collection('roupas')
    ref.doc(this.id).set(this.formGroup.value)
      .then(() => {
        console.log('Atualizado com sucesso');
        this.router.navigate(['/roupas']);
      }).catch(() => {
        console.log('Erro ao Atualizar');
      })
  }

  enviaArquivo(event) {
    let imagem = event.srcElement.files[0];
    //console.log(imagem.name);
    let ref = firebase.storage().ref().child(`roupas/${this.id}.jpg`);

    ref.put(imagem).then(url => {
      console.log("Enviado com sucesso!");
      this.downloadFoto();
    })

  }

  downloadFoto() {
    let ref = firebase.storage().ref()
      .child(`roupas/${this.roupas.id}.jpg`);

    ref.getDownloadURL().then(url => {
      this.imagem = url;
    })
  }


  async loading() {
    const loading = await this.loadingController.create({
      message: 'Carregando',
      duration: 1000
    });
    await loading.present();
  }

}
