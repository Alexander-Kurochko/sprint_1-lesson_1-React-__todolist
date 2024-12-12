import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from './component/Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './component/AddItemForm';
import {AppBar, Button, Container, Grid2, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';

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

export type TasksStateType = {
    [key: string]: TaskType[]
}

function AppWithReducers() {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'React Book', isDone: true},
        ],
    })

    function removeTasks(id: string, todolistId: string) {
        const action = removeTaskAC(id, todolistId)
        dispatchToTasksReducer(action)
    }

    function addTasks(title: string, todolistId: string) {
        const action = addTaskAC(title, todolistId)
        dispatchToTasksReducer(action)
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        const action = changeTaskStatusAC(taskId, isDone, todolistId)
        dispatchToTasksReducer(action)
    }

    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        dispatchToTasksReducer(changeTaskTitleAC(taskId, newTitle, todolistId))
    }

    function changeTodolistTitle(taskId: string, newTitle: string) {
        dispatchToTodolistsReducer(changeTodolistTitleAC(taskId, newTitle))
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatchToTodolistsReducer(changeTodolistFilterAC(todolistId, value))
    }

    function removeTodolistId (todolistId: string) {
        const action = removeTodolistAC(todolistId)
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
    }

    function addTodolist(title: string) {
        const action = addTodolistAC(title)
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid2 container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid2>

                <Grid2 container spacing={3}>
                    {
                        todolists.map(tl => {
                                let tasksForTodolist = tasks[tl.id]

                                if (tl.filter === 'completed') {
                                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
                                }
                                if (tl.filter === 'active') {
                                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
                                }
                                return <Grid2>
                                    <Paper style={{padding: '10px'}}>
                                        <Todolist
                                            key={tl.id}
                                            id={tl.id}
                                            title={tl.title}
                                            tasks={tasksForTodolist}
                                            removeTasks={removeTasks}
                                            changeFilter={changeFilter}
                                            addTask={addTasks}
                                            changeTasksStatus={changeStatus}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodolistTitle={changeTodolistTitle}
                                            filter={tl.filter}
                                            removeTodolistId={removeTodolistId}
                                        />
                                    </Paper>
                                </Grid2>
                            }
                        )}
                </Grid2>
            </Container>
        </div>
    )
}


export default AppWithReducers;
