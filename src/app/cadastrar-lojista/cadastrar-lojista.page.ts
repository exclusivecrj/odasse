import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { lojista } from '../model/lojista';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-cadastrar-lojista',
  templateUrl: './cadastrar-lojista.page.html',
  styleUrls: ['./cadastrar-lojista.page.scss'],
})
export class CadastrarLojistaPage implements OnInit {

  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true };
  formGroup: FormGroup;

  Lojista: lojista = new lojista();
  idUsuario: string = "";
  imagem: string = "";


  constructor(public formBuilder: FormBuilder,
    public router: Router,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public activateRoute: ActivatedRoute,
    public fire: AngularFireAuth) {

      this.fire.authState.subscribe(obj=>{
        this.idUsuario = this.fire.auth.currentUser.uid;
        console.log(this.idUsuario); // pega o ID
      });

    this.idUsuario = this.activateRoute.snapshot.paramMap.get('lojista');

    this.formGroup = this.formBuilder.group({
      nome: [''],
      telefone: [''],
      email: [''],
      endereco: [''],
      cep: [''],
      bairro: [''],
      cidade: [''],
      estado: [''],
      complemento: [''],
      cnpj: [''],
      numero: [''],
      nomeLoja: [''],
    })
  }
  ngOnInit() {
  }

  async loading() {
    const loading = await this.loadingController.create({
      message: 'Carregando',
      duration: 1000
    });
    await loading.present();
  }

  async toast(msg : string) {
    const toast = await this.toastController.create({
      message: 'Cadastrado com sucesso!',
      duration: 2000
    });
    toast.present();
  }

  cadastrar(){
    this.loading();
    let ref = this.firestore.collection('lojista').doc(this.idUsuario)
    ref.set(this.formGroup.value)
      .then(() =>{
        this.toast('Perfil de Lojista Cadastrado com sucesso');
        this.router.navigate(['/inicio']);
        this.loadingController.dismiss();
      }).catch(()=>{
        this.toast("Erro ao Cadastrar!");
        this.loadingController.dismiss();
      })
  }

}

