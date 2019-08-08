import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { NavController, IonSlides, ToastController, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('email') email;
  @ViewChild('senha') senha;

  @ViewChild('email2') email2;
  @ViewChild('senha2') senha2;

  @ViewChild(IonSlides) slides: IonSlides;

  constructor(public router: Router,
    public fire: AngularFireAuth,
    public loadingController : LoadingController,
    public toastController : ToastController){
  }

  slideOpts = {
    initialSlide: 1,
    speed: 500
  };

  proximo(){
    this.slides.slideNext();
  }

  anterior(){
    this.slides.slidePrev();
  }

  logar() {
    this.fire.auth.signInWithEmailAndPassword(this.email2.value, this.senha2.value)
      .then(() => {
        console.log('Logado com sucesso');
        this.toast('Login efetuado com sucesso');
        this.loadingController.dismiss();
        this.router.navigate(['/inicio']);
      })
      .catch(() => {
        console.log('Login Inválido');
        this.toast('Não fou possível concluir o login');
        this.loadingController.dismiss();
      })
  }

  cadastrar() {
    this.fire.auth.createUserWithEmailAndPassword(this.email.value, this.senha.value)
      .then(() => {
        console.log("Cadastrado com sucesso!");
        this.toast('Cadastrado com sucesso');
        this.router.navigate(['/cadastro-de-cliente']);
        this.loadingController.dismiss();
      }).catch(() => {
        console.log("Usuário inválido");
        this.toast('Não fou possível concluir o Cadastro');
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
      message: 'Login efetuado com sucesso',
      duration: 2000
    });
    toast.present();
  }

  logista(){
    this.router.navigate(['/login']);
    this.loadingController.dismiss();
  }

}
