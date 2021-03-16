import React, {useState, useEffect} from 'react';
import {InputTodo} from "./Components/InputTodo/InputTodo";
import {TodoList} from "./Components/TodoList/TodoList";
import {ITodo} from './interfaces';
import style from './App.module.scss';

const App: React.FC = () => {
    //array of all strings to do
    const [todos, setTodos] = useState<Array<ITodo>>([])

    //move all lines to do in localstorage
    useEffect(() => {
        const saveLocal = JSON.parse(localStorage.getItem('todos') || '[]') as Array<ITodo>
        setTodos(saveLocal)
    }, [])

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    //dispatch elements list to do in main array
    const addString = (text: string) => {
        let inputText: ITodo = {
            id: Date.now(),
            text: text,
            check: false
        }
        setTodos(prev => [inputText, ...prev])
    }

    //dispatch boolean value in todos[check]
    const checkedHandler = (id: number) => {
        setTodos(prev => prev.map(todo => {
            if (todo.id === id) {
                return {...todo, check: !todo.check}
            }
            return todo
        }))
    }

    //remove element at click button
    const removeHandler = (id: number) => {
        const questionRemove: boolean = window.confirm('Вы уверены, что хотите удалить запись?')
        if (questionRemove) {
            setTodos(prev => prev.filter(todo => todo.id !== id))
        }
    }

    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <InputTodo addString={addString}/>
                <TodoList todos={todos}
                          checkedHandler={checkedHandler}
                          removeHandler={removeHandler}
                />
            </div>
        </div>
    );
}

export default App;
