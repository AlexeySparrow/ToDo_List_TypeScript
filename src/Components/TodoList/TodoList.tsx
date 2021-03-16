import React from "react";
import {ITodo} from "../../interfaces";
import style from './TodoList.module.scss';
import {DeleteIcon} from "../DeleteIcon";

interface ITodoList {
    todos: Array<ITodo>

    removeHandler(id: number): void

    checkedHandler(id: number): void
}

export const TodoList: React.FC<ITodoList> = (props) => {
    return (
        <div className={style.list}>
            {
                props.todos.length === 0 ? <p>Пока дел нет!</p> : props.todos.map(todo => {

                    //add class if input[checkbox] - active
                    const classNames: Array<string> = []
                    if (todo.check) {
                        classNames.push(style.completed)
                    }

                    return (
                        <div className={classNames.join(' ')} key={todo.id}>
                            <input
                                type="checkbox"
                                checked={todo.check}
                                onChange={() => {
                                    props.checkedHandler(todo.id)
                                }}
                            />
                            <span>{todo.text}</span>
                            <i className="vbk" onClick={() => {
                                props.removeHandler(todo.id)
                            }}><DeleteIcon/></i>
                        </div>
                    )
                })
            }
        </div>
    )
}