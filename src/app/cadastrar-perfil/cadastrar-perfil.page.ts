import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Perfil } from '../model/perfil';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-cadastrar-perfil',
  templateUrl: './cadastrar-perfil.page.html',
  styleUrls: ['./cadastrar-perfil.page.scss'],
})
export class CadastrarPerfilPage implements OnInit {
  
  firestore = firebase.firestore();
  settings = {timestampsInSnapshots: true};
  formGroup : FormGroup; 

  perfil: Perfil = new Perfil();
  id: string;
  imagem : string = "";

  idUsuario : string = "";

  constructor(public formBuilder : FormBuilder,
    public router : Router,
    public loadingController : LoadingController,
    public toastController : ToastController,
    public activateRoute: ActivatedRoute,
    public fire : AngularFireAuth) {

      this.fire.authState.subscribe(obj=>{
        this.idUsuario = this.fire.auth.currentUser.uid;
        console.log(this.idUsuario); // pega o ID
      });


      this.id = this.activateRoute.snapshot.paramMap.get('roupas');
            
      this.formGroup = this.formBuilder.group({
      nome : [''],
      telefone : [''],
      email : [''],
      endereco : [''],
      cep : [''],
      bairro : [''],
      cidade : [''],
      estado : [''],
      complemento : [''],
      cpf : [''],
      numero : [''],
      
    }) }

  ngOnInit() {
  }

  ionViewDidLoad(){
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
    let ref = this.firestore.collection('perfil').doc(this.idUsuario)
    ref.set(this.formGroup.value)
      .then(() =>{
        this.toast('Perfil Cadastrado com sucesso');
        this.router.navigate(['/inicio']);
        this.loadingController.dismiss();
        // console.log(getList{{marcas.nome}});
      }).catch(()=>{
        this.toast("Erro ao Cadastrar!");
        this.loadingController.dismiss();
      })
  }

}