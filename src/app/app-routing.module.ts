import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Auth2Guard } from './service/auth2.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pre-login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'logoff',
    loadChildren: './logoff/logoff.module#LogoffPageModule',
    canActivate: [Auth2Guard]
  },
  {
    path: 'pre-login',
    loadChildren: './pre-login/pre-login.module#PreLoginPageModule'
  },
  {
    path: 'cadastrar-roupa',
    loadChildren: './cadastrar-roupa/cadastrar-roupa.module#CadastrarRoupaPageModule'
  },
  {
    path: 'cadastrar-perfil',
    loadChildren: './cadastrar-perfil/cadastrar-perfil.module#CadastrarPerfilPageModule'
  },
  {
    path: 'edita-roupas',
    loadChildren: './edita-roupas/edita-roupas.module#EditaRoupasPageModule'
  },
  {
    path: 'edita-perfil',
    loadChildren: './edita-perfil/edita-perfil.module#EditaPerfilPageModule'
  },
  {
    path: 'carrinho',
    loadChildren: './carrinho/carrinho.module#CarrinhoPageModule'
  },
  {
    path: 'inicio',
    loadChildren: './inicio/inicio.module#InicioPageModule'
  },
  {
    path: 'perfil', loadChildren: './perfil/perfil.module#PerfilPageModule'
  },
  {
    path: 'roupas',
    loadChildren: './roupas/roupas.module#RoupasPageModule'
  },
  {
    path: 'quem',
    loadChildren: './quem/quem.module#QuemPageModule'
  },
  {
    path: 'view-perfil',
    loadChildren: './view-perfil/view-perfil.module#ViewPerfilPageModule'
  },
  {
    path: 'cadastrar-marca',
    loadChildren: './cadastrar-marca/cadastrar-marca.module#CadastrarMarcaPageModule'
  },
  {
    path: 'edita-marca',
    loadChildren: './edita-marca/edita-marca.module#EditaMarcaPageModule'
  },
  {
    path: 'marca',
    loadChildren: './marca/marca.module#MarcaPageModule'
  },
  {
    path: 'finalizar-compra',
    loadChildren: './finalizar-compra/finalizar-compra.module#FinalizarCompraPageModule'
  },
  {
    path: 'cadastrar-lojista',
    loadChildren: './cadastrar-lojista/cadastrar-lojista.module#CadastrarLojistaPageModule'
  },
  {
    path: 'lojista',
    loadChildren: './lojista/lojista.module#LojistaPageModule'
  },  { path: 'edita-lojista', loadChildren: './edita-lojista/edita-lojista.module#EditaLojistaPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' }







];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
