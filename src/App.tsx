import React, {useState} from 'react';
import './App.css';
import {Todolist} from './component/Todolist';
import {v1} from 'uuid';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'completed' | 'active'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    function removeTasks(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let filteredTasks = tasks.filter(t => t.id !== id/* ?  true :  false*/)
        tasksObj[todolistId] = filteredTasks
        setTasksObj({...tasksObj})
    }

    function addTasks(title: string, todolistId: string) {
        let newTask = {
            id: v1(),
            title: title,
            isDone: false
        }
        let tasks = tasksObj[todolistId]
        let newTasks = [newTask, ...tasks]
        tasksObj[todolistId] = newTasks
        setTasksObj({...tasksObj})
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasksObj({...tasksObj})
        }
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if ( todolist ) {
            todolist.filter = value
            setTodolist([...todolists])
        }
    }

    let dotolistId1 = v1()
    let dotolistId2 = v1()

    let [todolists, setTodolist] = useState<TodolistType[]>([
        {id: dotolistId1, title: 'What to learn', filter: 'active'},
        {id: dotolistId2, title: 'What to buy', filter: 'completed'},
    ])

    let removeTodolistId = (todolistId: string) => {
        let filteredTodolistId = todolists.filter(tl => tl.id !== todolistId)
        setTodolist(filteredTodolistId)

        delete tasksObj[todolistId]
        setTasksObj({...tasksObj})
    }

    const [tasksObj, setTasksObj] = useState({
        [dotolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'Typescript', isDone: false},
            {id: v1(), title: 'RTK query', isDone: false},
        ],
        [dotolistId2]: [
            {id: v1(), title: 'Book', isDone: false},
            {id: v1(), title: 'Milk', isDone: true},
        ],
    })

    return (
        <div className="App">
            {
                todolists.map(tl => {
                        let tasksForTodolist = tasksObj[tl.id]

                        if (tl.filter === 'completed') {
                            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
                        }
                        if (tl.filter === 'active') {
                            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
                        }
                        return <Todolist
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            tasks={tasksForTodolist}
                            removeTasks={removeTasks}
                            changeFilter={changeFilter}
                            addTask={addTasks}
                            changeTasksStatus={changeStatus}
                            filter={tl.filter}
                            removeTodolistId={removeTodolistId}
                        />
                    }
                )}
        </div>
    )
}

export default App;
