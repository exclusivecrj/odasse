import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as firebase from 'firebase';
import { roupas } from '../model/roupas';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cadastrar-roupa',
  templateUrl: './cadastrar-roupa.page.html',
  styleUrls: ['./cadastrar-roupa.page.scss'],
})
export class CadastrarRoupaPage implements OnInit {

  firestore = firebase.firestore();
  settings = {timestampsInSnapshots: true};
  formGroup : FormGroup; 

  roupas: roupas = new roupas();
  id: string;
  imagem : string = "";

  constructor(public formBuilder : FormBuilder,
    public router : Router,
    public loadingController : LoadingController,
    public toastController : ToastController,
    public activateRoute: ActivatedRoute,
 /*   public storageServ: StorageService */) {

      this.id = this.activateRoute.snapshot.paramMap.get('roupas');
            
      this.formGroup = this.formBuilder.group({
      roupa : [''],
      preco : [''],
      modelo : [''],
      marca : [''],
      img : [''],
      cor : [''],
      
    }) }

  ngOnInit() {
  }

  ionViewDidLoad(){
    this.downloadFoto();
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
    let ref = this.firestore.collection('roupas')
    ref.add(this.formGroup.value)
      .then(() =>{
        this.toast('Roupa Cadastrada com sucesso');
        this.router.navigate(['/roupas']);
        this.loadingController.dismiss();
        // console.log(getList{{marcas.nome}});
      }).catch(()=>{
        this.toast("Erro ao Cadastrar!");
        this.loadingController.dismiss();
      })
  }

  enviaArquivo(event){
    let imagem = event.srcElement.files[0];
    //console.log(imagem.name);
    let ref = firebase.storage().ref().child(`roupas/${this.id}.jpg`);
  
    ref.put(imagem).then(url=>{
      console.log("Enviado com sucesso!");
      this.downloadFoto();
    })

  }

  downloadFoto(){
    let ref = firebase.storage().ref()
      .child(`roupas/${this.roupas.id}.jpg`);

      ref.getDownloadURL().then( url=>{ 
        this.imagem = url;
      })
  }

  cart(){
    this.router.navigate(['/carrinho'])
  }
  search(){
    this.router.navigate(['/roupas'])
  } 

}