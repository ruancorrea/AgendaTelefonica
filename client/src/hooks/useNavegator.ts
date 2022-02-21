import { useState } from "react"

export default function useNavegator() {
    const [visivel, setVisivel] = useState<'listarTodos' | 'adicionarContato' | 'infoContato' >('listarTodos')

    const exibirListarTodos = () => setVisivel('listarTodos')
    const exibirAdicionarContato = () => setVisivel('adicionarContato')
    const exibirInfoContato= () => setVisivel('infoContato')

    return {
        listarTodosVisivel: visivel === 'listarTodos',
        adicionarContatoVisivel: visivel === 'adicionarContato',
        infoContatoVisivel: visivel === 'infoContato',
        exibirListarTodos,
        exibirAdicionarContato,
        exibirInfoContato,
        visivel,
    }
}