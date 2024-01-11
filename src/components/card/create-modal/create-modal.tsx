import { useEffect, useState } from "react"
import { useFoodDataMutate } from "../../../hooks/useFoodDataMutate";
import { FoodData } from "../../../interface/FoodData";

import "./modal.css"

interface InputProps {
    label: string,
    value: string | number,
    updateValue(value: any): void
}

interface ModalProps {
    closeModal(): void
}


const Input = ({ label, value, updateValue } : InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input value={value} onChange={event => updateValue(event.target.value)}></input>
        </>
    )
}

export function CreateModal({ closeModal }: ModalProps){
    const [id, setId] = useState(0);
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const { mutate, isSuccess, isPending} = useFoodDataMutate();

    const submit = () => {
        const foodData: FoodData = {
            id,
            title,
            price,
            image
        }
        mutate(foodData)
        console.log("Valor do item que acabou de ser salvo no banco " + JSON.stringify(foodData, null, 2))
    }

    useEffect(() => {
        if(!isSuccess) return
            closeModal();
    })

    return(
        <div className="modal-overlay">
            <div className="modal-body">
                <div style={{ display:"grid", alignSelf:"end" }}>
                    <button onClick={closeModal} style={{ background:"red", padding:8, position:'initial' }}>X</button>
                </div>
                <div style={{ marginLeft:50 }}>
                    <h2>Cadastre um novo item no Cardapio</h2>
                </div>
                <form className="input-container">
                    <div className="item">
                        <Input label="id" value={id} updateValue={setId}/>
                    </div>
                    <div className="item">
                        <Input label="titulo" value={title} updateValue={setTitle}/>
                    </div>
                    <div className="item2">
                        <Input label="preco" value={price} updateValue={setPrice}/>
                    </div>
                    <div className="item2">
                        <Input label="imagem" value={image} updateValue={setImage}/>
                    </div>
                </form>
                <div style={{ display:"grid", alignSelf:"end" }}>
                    <button onClick={submit} className="btn-secondary">
                        {isPending ? 'postando...' : 'postar'}
                    </button>
                </div>

            </div>
        </div>
    )
    
}