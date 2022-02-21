import { useState } from "react"

interface InputProps {
    nome: string
    value: string
    readonly: boolean
    fSet?: (value: string) => void
    type: string
}

export default function Input (props: InputProps) {
    return (
        <div className="w-full px-3 mb-6 mt-4 xl:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                {props.nome}
            </label>
            <input readOnly={props.readonly} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            onChange={(e: any) => props.fSet?.(e.target.value)} type={props.type} value={props.value} />
        </div>
    )
}