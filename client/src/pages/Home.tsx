import React, { useEffect, useState } from "react"
import Add from "../components/Add";
import Details from "../components/Details";
import { IconList } from "../components/Icons";
import ListAll from "../components/ListAll";
import Contato from "../core/Contato"
import useNavegator from "../hooks/useNavegator";
import Alert from "../components/Alert";
import useAlert from "../hooks/useAlert";
import api from '../config/apiConfig';

export default function Home () {
    const [contatos, setContatos] = useState([]);
    const [contato, setContato] = useState<Contato>(Contato.vazio())
    const { exibirMsg, alert, err, setExibirMsg, setAlert, color, setColor, setErr } = useAlert()
    const url = "http://localhost:3001/files/contacts/";
    const [startIndex, setStartIndex] = useState(0);
    const [pageAtual, setPageAtual] = useState(1);
    const [pages, setPages] = useState(0);

    function AlterandoStartIndex(proxPage: number){
        var numero = (proxPage-1) * 5;
        setStartIndex(numero)
        setPageAtual(proxPage)
    }

    useEffect(()=>{
        api.get("/").then(
            res => {
                var itens = res.data[0].id
                setPages(Math.ceil(itens/5));
                console.log("paginas", pages)
            }
        )
    }, [exibirMsg])
    

    const { 
        listarTodosVisivel, 
        adicionarContatoVisivel, 
        infoContatoVisivel,
        exibirListarTodos, 
        exibirAdicionarContato, 
        exibirInfoContato,
    } = useNavegator()

    useEffect(() => {
        setTimeout(()=>{
            carregandoContatos()
        }, 1000)

    }, [listarTodosVisivel, adicionarContatoVisivel, infoContatoVisivel, startIndex]);


    useEffect(() => {
        if(!err) {
            setExibirMsg(false);
            return
        }
        setExibirMsg(true)

        const timer = setTimeout(() => {
            setExibirMsg(false)
            setAlert("")
            setErr(false)
        }, 3000)

        return () => clearTimeout(timer)
    }, [err])

    async function carregandoContatos() {
        await api.get(`/getContatos/${startIndex}`).then(res => {
            setContatos(res.data)
        });
    }
                    
    return (
        <div>
            <div className="flex w-full items-center flex-shrink-0 text-white mr-6 p-6 bg-slate-700 mb-3">
                {IconList}<span className="font-semibold text-xl tracking-tight ml-2">Agenda Telefônica</span>
            </div>

            {
                exibirMsg ?
                    <Alert alert={alert} color={color} />
                    
                :
                <></>
            }

            {
                listarTodosVisivel ? 
                    <ListAll url={url} 
                    AlterandoStartIndex={AlterandoStartIndex}
                    pageAtual={pageAtual}
                    pages={pages}
                    fInfoContato={exibirInfoContato} 
                    fListarTodos={exibirListarTodos} 
                    fAdd={exibirAdicionarContato} 
                    contatos={contatos} 
                    fContact={setContato} />
                :
                <></>
            }

            {
                adicionarContatoVisivel
                ?
                <div className="flex justify-center p-4">
                    <Add 
                    fColor={setColor} 
                    fAlert={setAlert} 
                    fErr={setErr} 
                    fListarTodos={exibirListarTodos} 
                    fAdd={exibirAdicionarContato} 
                    fInfoContato={exibirInfoContato} />
                </div>
                :
                <></>
            }

            {
                infoContatoVisivel
                ?
                <div className="flex justify-center p-4">
                    <Details 
                    url={url} 
                    setContatos={setContatos} 
                    contact={contato} 
                    fColor={setColor} 
                    fAlert={setAlert} 
                    fErr={setErr} 
                    fInfoContato={exibirInfoContato} 
                    fAdd={exibirAdicionarContato} 
                    fListarTodos={exibirListarTodos} />
                </div>
                :
                <></>
            }

            
        </div>

    )
}