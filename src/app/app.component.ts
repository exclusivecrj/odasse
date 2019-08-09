import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/inicio',
      icon: 'home'
    },


    {
      title: 'Cadastrar Roupas',
      url: '/cadastrar-roupa',
      icon: 'md-add'
    },
    {
      title: 'Cadastrar Perfil',
      url: '/cadastrar-perfil',
      icon: 'md-add'
    },
    {
      title: 'Cadastrar-se como Lojista',
      url: '/cadastrar-lojista',
      icon: 'md-add'
    },
    {
      title: 'Cadastrar Marcas',
      url: '/cadastrar-marca',
      icon: 'md-add'
    },

    
    {
      title: 'Lista de Roupas',
      url: '/roupas',
      icon: 'md-list'
    },
    {
      title: 'Lista de Perfis',
      url: '/perfil',
      icon: 'md-list'
    },
    {
      title: 'Lista de Perfis de Lojistas',
      url: '/lojista',
      icon: 'md-list'
    },
    {
      title: 'Lista de Marcas',
      url: '/marca',
      icon: 'md-list'
    },

  ];
// 
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private firebaseauth : AngularFireAuth,
    private router : Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logoff(){
    this.router.navigate(['/logoff']);
  }
  perfil(){
    this.router.navigate(['/view-perfil']);
  }
  testcart(){
    this.router.navigate(['/carrinho']);
  }

}
