import { Injectable } from '@angular/core';
import { Pedido } from '../model/pedido';
import { roupas } from '../model/roupas';

@Injectable()
export class StorageService{



    setCart(obj : Pedido){
        localStorage.setItem('carrinho', JSON.stringify(obj));
    }

    getCart() : Pedido{
        let p = new Pedido();

        let str = localStorage.getItem("carrinho");

        if(str==null || str==""){
            console.log("ok");
            let pedido : Pedido = {itens : []};
            localStorage.setItem("carrinho",JSON.stringify(pedido));
            return pedido;           
            
            
        }else{
            console.log("ok 2");
            return JSON.parse(str);
            
        }
    }

    setRemoveCart(roupas : roupas){
        let lista : Pedido = this.getCart();
        
       let pos = lista.itens.findIndex(
           x=>x.roupas.id == roupas.id);
           
       if(pos!= -1){ // -1 -> Não existe
        lista.itens.splice(pos,1);
        }
        
        localStorage.setItem('carrinho', JSON.stringify(lista));
    }
}
