import { useState } from "react";
import Contato from "../core/Contato";
import { IconAdd, IconCancel, IconDelete, IconEdit, IconSave } from "./Icons";
import Input from "./Input";
import api from '../config/apiConfig';
import UploadImage from "./UploadImage";

interface DetailsProps {
    contact: Contato
    fInfoContato: (bool: boolean) => void
    fListarTodos: (bool: boolean) => void
    fAdd: (bool: boolean) => void
    setContatos: (contatos: []) => void
    url: string
    fErr: (bool: boolean) => void
    fAlert: (alert: string) => void
    fColor: (cor: string) => void
}

export default function Details(props: DetailsProps) {
    const [NoEdit, setNoEdit] = useState(true);
    const [nome, setNome] = useState(props.contact.nome);
    const [telefone, setTelefone] = useState(props.contact.telefone);
    const [email, setEmail] = useState(props.contact.email);
    const [imagem, setImagem] = useState(props.contact.imagem);
    const [newImagem, setNewImagem] = useState<File | null | string>(props.contact.imagem);
    const [id, setId] = useState(props.contact.id);
    const [filename, setFilename] = useState(props.contact.imagem)
    const [semimg, setSemImg] = useState<"sim" | "nao">(props.contact.imagem == "null.png" ? "sim" : "nao")

    async function salvarEdicao() {
        const fd = new FormData();
        const headers = { "Content-Type": "multipart/form-data" }

        if(nome.length > 0 && email.length>0 && telefone.length>0){
            if(newImagem == null) fd.append('image', "");
            else { fd.append('image', newImagem); }
            fd.append('nome', nome);
            fd.append('email', email);
            fd.append('telefone', telefone);
            fd.append('id', id);
            fd.append('filename', imagem);
            fd.append('semimg', semimg)
            await api.put("/editContato", fd, {headers: headers}).then(
                res => {
                    setImagem(res.data.newImagem)
                    props.fErr(true);
                    props.fAlert(res.data.mensagem);
                    props.fColor(res.data.color);
                }
            );
            
        }
        else {
            props.fErr(true);
            props.fAlert("Dados Inválidos.");
            props.fColor('red');
        }
    }

    async function excluirContato() {
        await api.delete(`/delete/${id}/${filename}`)
        .then(res => {
                props.fErr(true);
                props.fAlert(res.data.mensagem);
                props.fColor(res.data.color);
            })
        props.fInfoContato(false);
        props.fListarTodos(true);
    }

    return (
        <div className={`p-4 rounded`}>
            <form className="w-full max-w-lg">
                
                <div className="flex flex-wrap shadow p-4 -mx-3 mb-2">
                    <label className="ml-4 block uppercase tracking-wide text-gray-700 text-md font-bold mb-2">
                        {NoEdit ? "Detalhes do Contato" : "Editando Contato" }
                    </label>

                    <div className="rounded-xl flex w-full justify-center">
                        <img src={props.url + imagem} className="w-1/3 h-auto rounded-full" />
                    </div>

                    {
                        NoEdit ? 
                        <></>
                        :
                        <div className="flex justify-center">
                            <UploadImage setImagem={setNewImagem} setSemImg={setSemImg}/>
                            <small className="flex items-center mt-10 mb-6 bg-slate-500 hover:-translate-y-1 hover:scale-110 hover:bg-slate-900 rounded-full text-white">
                                <button onClick={() => {
                                    setNewImagem(null);
                                    setSemImg("sim");
                                }} type="button">Apagar Imagem</button>
                            </small>
                        </div>
            
                    }

                    <Input nome="ID" fSet={setId} type={"text"} value={id} readonly={true} />
                    <Input nome="Nome" fSet={setNome} type={"text"}  value={nome} readonly={NoEdit} />
                    <Input nome="E-mail" fSet={setEmail} type={"email"}  value={email} readonly={NoEdit} />
                    <Input nome="Telefone" fSet={setTelefone} type={"text"}  value={telefone} readonly={NoEdit} />
                </div>
                <div className="flex justify-end">
                    {
                        NoEdit ?
                        <button className="ml-2 flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 border-4 font-bold text-white py-1 px-2 rounded-md" type="button"
                        onClick={() => {
                            setNoEdit(false);
                            }}>
                            <small className="flex items-center text-md">Editar {IconEdit}</small>
                        </button>

                        :
                        <div>
                            <button className="flex-shrink-0 bg-green-500 hover:bg-green-700 border-green-500 hover:border-green-700 font-bold border-4 text-white py-1 px-2 rounded-md" type="button"
                            onClick={() => {
                                setNoEdit(true);
                                salvarEdicao();
                            }}>
                                <small className="flex items-center text-md">Salvar {IconSave}</small>
                            </button>

                            <button className="ml-2 shadow bg-transparent hover:bg-red-500 text-red-700 font-bold hover:text-white py-2 px-3 border border-red-500 hover:border-transparent rounded-md" type="button"
                            onClick={() => {
                                excluirContato();
                                props.fInfoContato(false);
                                props.fListarTodos(true);
                            }}>
                                <small className="flex items-center text-md">Apagar {IconDelete}</small>
                            </button>
                        </div>
                        

                    }
                    <button className="ml-2 shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-2 rounded-md" type="button"
                    onClick={() => {
                        props.fInfoContato(true);
                        props.fAdd(false);
                        props.fListarTodos(false);
                    }}>
                        <small className="flex items-center text-md">Cancelar {IconCancel}</small>
                    </button>
                </div>
            </form>
        </div>
    )
}