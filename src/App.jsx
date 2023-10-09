import { useState, useEffect } from 'react'
import { NewTodoForm } from './NewTodoForm'
import { TodoList } from './TodoList'
import './styles.css'

export default function App() {
    // useState creates relationship between setTodos() func and todos[]
    const [todos, setTodos] = useState(() => {
        const localValue = localStorage.getItem('ITEMS')
        if (localValue === null) return []
        return JSON.parse(localValue)
    })

    // useEffect runs any time todos array changes
    useEffect(() => {
        localStorage.setItem('ITEMS', JSON.stringify(todos))
    }, [todos])

    function addTodo(title) {
        setTodos(currentTodos => {
            return [
                ...currentTodos,
                { id: crypto.randomUUID(), title, completed: false },
            ]
        })
    }

    function toggleTodo(id, completed) {
        setTodos(currentTodos => {
            return currentTodos.map(todo => {
                if (todo.id === id) {
                    return { ...todo, completed }
                }
                return todo
            })
        })
    }

    function deleteTodo(id) {
        setTodos(currentTodos => {
            return currentTodos.filter(todo => todo.id !== id)
        })
    }

    return (
        <>
            <NewTodoForm onSubmit={addTodo} />
            <h1 className="header">Todo List</h1>
            <TodoList
                todos={todos}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
            />
        </>
    )
}
