interface PaginationProps {
    pages: number
    pageAtual: number
    AlterandoStartIndex: (page: number) => void
}

function GenerateRange(n: number, atual: number, pages: number) {
    let range = [];
    if (atual < 3) for (let i = 0; i < n-atual+1; i++) range[i] = i + 1;
    if (n>pages) for (let i = atual-3; i < pages; i++) range[i] = i + 1;
    else for (let i = atual-3; i < n-2; i++) range[i] = i + 1;
    return range;
}

function GenerateRangeSimple(n: number, atual: number){
    let range = [];
    for (let i = 0; i < n; i++) range[i] = i + 1;
    return range;
}

export default function Pagination(props: PaginationProps) {
    const arrayNumbers = props.pages > 5 ? 
                        GenerateRange(props.pageAtual+4, props.pageAtual, props.pages) : 
                        GenerateRangeSimple(props.pages, props.pageAtual)

    const next = props.pageAtual == arrayNumbers[arrayNumbers.length-1] ? true : false
    return (
        <div className="flex items-center space-x-1 my-4 justify-center">
            {
                props.pageAtual > 1 ?
                <button onClick={() => props.AlterandoStartIndex(props.pageAtual-1)} className="px-4 py-2 text-gray-500 bg-gray-200 rounded-md hover:bg-blue-400 hover:text-white">
                    <small className="font-bold">{"<"}</small>
                </button> 
                :
                <></>
            }
            
            {arrayNumbers.map((page: number,index) => {
                return(
                    <div key={index}>
                        { page === props.pageAtual ?
                            <button onClick={() => props.AlterandoStartIndex(page)} className="px-4 py-2 text-gray-100 bg-gray-700 rounded-md hover:bg-blue-400 hover:text-white">
                                {page}
                            </button> 

                            :
                            <button onClick={() => props.AlterandoStartIndex(page)} className="px-4 py-2 text-gray-500 bg-gray-200 rounded-md hover:bg-blue-400 hover:text-white">
                                {page}
                            </button>

                        }
                    </div>
                )
                
            })}

            {
                next ?
                <></>
                :
                <button onClick={() => props.AlterandoStartIndex(props.pageAtual+1)} className="px-4 py-2 text-gray-500 bg-gray-200 rounded-md hover:bg-blue-400 hover:text-white">
                    <small className="font-bold">{">"}</small>
                </button> 
            }
        </div>
    )
}

