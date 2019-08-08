import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cadastrar-marca',
  templateUrl: './cadastrar-marca.page.html',
  styleUrls: ['./cadastrar-marca.page.scss'],
})
export class CadastrarMarcaPage implements OnInit {

  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true };
  formGroup: FormGroup;

  constructor(public formBuilder: FormBuilder,
    public router: Router,
    public loadingController: LoadingController,
    public toastController: ToastController) {

    this.formGroup = this.formBuilder.group({
      nome: [''],
      desc: [''],
      slogan: [''],
      img: [''],
    })
  }
    ngOnInit() {
    }

    cadastrar(){
      this.loading();
      let ref = this.firestore.collection('marca')
      ref.add(this.formGroup.value)
        .then(resp => {
          console.log(resp);
          this.toast('Cadastrado com sucesso');
          this.router.navigate(['/marca']);
          this.loadingController.dismiss();
        }).catch(() => {
          this.toast("Erro ao Cadastrar!");
          this.loadingController.dismiss();
        })
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

}
