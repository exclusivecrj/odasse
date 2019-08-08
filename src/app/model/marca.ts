export class Marca{

    id: string;
    nome: string;
    desc: string;
    slogan: string;
    img: string;

    constructor(){

    }
     // Dados do firebase
     setDados(obj : any){
        this.nome = obj.nome;
        this.desc = obj.desc;
        this.slogan = obj.slogan;
        this.img = obj.img;
    }
}