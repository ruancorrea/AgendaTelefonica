import { useEffect, useState } from "react";
import Contato from "../core/Contato"
import { IconNewContact } from "./Icons"
import Pagination from "./Pagination";

interface ListAllProps {
    contatos: Contato[]
    fAdd: (b: boolean) => void
    fContact: (c: Contato) => void
    fListarTodos: (bool: boolean) => void
    fInfoContato: (bool: boolean) => void
    url: string
    pageAtual: number
    AlterandoStartIndex: (page: number) => void
    pages: number
}

export default function ListAll(props: ListAllProps) {

    return (
        <div>
            <div className="flex justify-center p-2">
                <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded-md" type="button"
                onClick={() => props.fAdd(true)}>
                    <small className="flex items-center text-md">Novo Contato {IconNewContact}</small>
                </button>
            </div>

                    
            <div className="flex justify-center">
                <div className="bg-white rounded-lg shadow w-2/3 xs:w-1/3 p-4">
                    <label className="ml-4 block uppercase tracking-wide text-gray-700 text-md font-bold">
                        Contatos
                    </label>

                    <ul role="list" className="p-6 divide-y divide-slate-200">
                    {props.contatos.map((c, index) => {
                        const src = props.url + c.imagem;
                        return (
                        <li key={index} className="flex py-4 h-full first:pt-4 last:pb-4 cursor-pointer hover:bg-gray-100 rounded-md"
                        onClick={() => {
                            props.fContact(c);
                            props.fAdd(false);
                            props.fListarTodos(false);
                            props.fInfoContato(true);
                        }}>
                            <img className="h-10 w-10 rounded-full" src={src} alt="" />
                            <div className="ml-3 overflow-hidden">
                                <p className="text-sm font-medium text-slate-900">{c.nome}
                                    <small className="ml-4 text-xs text-red-800 truncate italic ">{c.email}</small>
                                </p>
                                <p className="text-sm text-slate-500 truncate">{c.telefone}</p>
                            </div>
                        </li>
                        )
                    })}
                    </ul>
                </div>
            </div>
            {
                props.pages > 1 ?
                <Pagination AlterandoStartIndex={props.AlterandoStartIndex} pages={props.pages} pageAtual={props.pageAtual} />
                :
                <></>

            }
        </div>
    )
}