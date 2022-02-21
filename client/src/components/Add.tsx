import { IconAdd, IconCancel } from "./Icons";
import Input from "./Input";
import { useState } from "react";
import api from '../config/apiConfig';
import UploadImage from "./UploadImage";

interface AddProps {
    fInfoContato: (bool: boolean) => void
    fListarTodos: (bool: boolean) => void
    fAdd: (bool: boolean) => void
    fErr: (bool: boolean) => void
    fAlert: (alert: string) => void
    fColor: (cor: string) => void
}

export default function Add(props: AddProps) {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [imagem, setImagem] = useState<File | string>("");

    function adicionandoContato() {
        console.log(imagem)
        const fd = new FormData();
        const headers = { "Content-Type": "multipart/form-data" }
        
        if(nome.length > 0 && email.length>0 && telefone.length>0){
            fd.append('image', imagem)
            fd.append('nome', nome)
            fd.append('email', email)
            fd.append('telefone', telefone)
            api.post("/addContato", fd , { headers: headers} ).then(res => {
                console.log(res);
                props.fErr(true);
                props.fAlert(res.data.mensagem);
                props.fColor(res.data.color);
            })
        }
        else {
            props.fErr(true);
            props.fAlert("Dados Inválidos.");
            props.fColor('red');
        }
        props.fAdd(false);
        props.fInfoContato(false);
        props.fListarTodos(true);
        return
    }

    return (
        <div>
            
            <form className="w-full max-w-xl">
                <div className="flex flex-wrap shadow p-4 -mx-3 mb-2">
                    <label className="ml-4 block uppercase tracking-wide text-gray-700 text-md font-bold mb-2">
                        Novo contato
                    </label>
                    <UploadImage setImagem={setImagem} />
                    <Input nome={"Nome"} fSet={setNome} type={"text"}  value={nome} readonly={false} />
                    <Input nome={"E-mail"} fSet={setEmail} type={"email"}  value={email} readonly={false}  />
                    <Input nome={"Telefone"} fSet={setTelefone} type={"text"}  value={telefone} readonly={false}  />

                </div>
                <div className="flex justify-end">
                    <button className="flex-shrink-0 shadow bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 border-4 text-white font-bold py-1 px-2 rounded-md" 
                    type="button" onClick={adicionandoContato}>
                        <small className="flex items-center text-md">Adicionar {IconAdd}</small>                        
                    </button>
                    <button className="ml-2 shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-2 rounded-md" type="button"
                    onClick={() => {
                        props.fInfoContato(false);
                        props.fAdd(true);
                        props.fListarTodos(false);
                        
                    }}>
                        <small className="flex items-center text-md">Cancelar {IconCancel}</small>
                    </button>
                </div>
            </form>
        </div>
    )
}