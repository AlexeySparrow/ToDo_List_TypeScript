import React, {useState} from "react";
import style from './InputTodo.module.scss';

interface IInputTodo {
    addString(text: string): void
}

export const InputTodo: React.FC<IInputTodo> = (props) => {

    //value input
    const [inputText, setInputText] = useState<string>('')

    //dispatch value
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value)
    }

    //send element in list at click button "Enter"
    const keyHandler = (event: React.KeyboardEvent) => {
        if (inputText.length > 0) {
            if (event.key === 'Enter') {
                props.addString(inputText)
                setInputText('')
            }
        }
    }

    return (
        <div className={style.input}>
            <input
                type="text"
                placeholder="Введите задачу"
                value={inputText}
                onChange={changeHandler}
                onKeyPress={keyHandler}
            />
        </div>
    )
}