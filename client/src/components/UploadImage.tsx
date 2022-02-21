interface UploadImageProps {
    setImagem: (image_name: any) => void
    setSemImg?: (sn: any) => void
}

export default function UploadImage(props: UploadImageProps) {
    return (
        <div className="w-full px-3 mb-6 mt-4 xl:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Imagem
            </label>
            <input 
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type={"file"}
                accept="image/png, image/jpeg, image/jpg"
                onChange={(e: any) => {
                    props.setImagem(e.target.files[0]);
                    props.setSemImg?.("nao")
                }
            }
            />
        </div>
    )
}