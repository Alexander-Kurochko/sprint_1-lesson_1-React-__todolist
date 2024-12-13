import React from 'react';
import './App.css';
import {Todolist} from './component/Todolist';
import {AddItemForm} from './component/AddItemForm';
import {AppBar, Button, Container, Grid2, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from './state/todolists-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from './state/store';

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

function AppWithRedux() {
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, TodolistType[]>(state => state.todolists)

    function changeTodolistTitle(taskId: string, newTitle: string) {
        dispatch(changeTodolistTitleAC(taskId, newTitle))
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatch(changeTodolistFilterAC(todolistId, value))
    }

    function removeTodolistId (todolistId: string) {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }

    function addTodolist(title: string) {
        const action = addTodolistAC(title)
        dispatch(action)
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
                                return <Grid2>
                                    <Paper style={{padding: '10px'}}>
                                        <Todolist
                                            key={tl.id}
                                            id={tl.id}
                                            title={tl.title}
                                            changeFilter={changeFilter}
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


export default AppWithRedux;
