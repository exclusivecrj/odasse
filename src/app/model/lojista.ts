export class lojista{

    id: string;
    nome: string;
    telefone: string;
    email: string;
    endereco: string;
    cep: string;
    bairro: string;
    cidade: string;
    estado: string;
    complemento: string;
    cnpj: string;
    numero: string;
    nomeLoja: string;
    img: string;
    
    constructor(){
    }

    // Dados do firebase
    setDados(obj : any){
        this.nome = obj.nome;
        this.telefone = obj.telefone;
        this.email = obj.email;
        this.endereco = obj.endereco;
        this.cep = obj.cep;
        this.bairro = obj.bairro;
        this.cidade = obj.cidade;
        this.estado = obj.estado;
        this.complemento = obj.complemento;
        this.cnpj = obj.cpf;
        this.numero = obj.numero;
        this.nomeLoja = obj.nomeLoja;
        this.img = obj.img;
    }
}
