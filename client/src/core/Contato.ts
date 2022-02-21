export default class Book {
    #id: string
    #nome: string
    #telefone: string
    #email: string
    #imagem: string

    constructor(title: string, nome: string, email: string, telefone: string, imagem: string, id: string){
        this.#id = id
        this.#nome = nome
        this.#email = email
        this.#telefone = telefone
        this.#imagem = imagem
    }

    static vazio() {
        return new Book('', '', "", '',  '', '')
    }

    get id() {
        return this.#id
    }

    get nome() {
        return this.#nome
    }

    get email() {
        return this.#email
    }

    get telefone () {
        return this.#telefone
    }

    get imagem () {
        return this.#imagem
    }

}