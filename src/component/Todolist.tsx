import React from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from '../state/store';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from '../state/tasks-reducer';
import {FilterValuesType, TaskType} from '../AppWithRedux';

type PropsType = {
    id: string
    title: string
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    changeTodolistTitle: (taskId: string, newTitle: string) => void
    filter: FilterValuesType
    removeTodolistId: (todolistId: string) => void
}

export const Todolist = ({
                             id,
                             title,
                             changeFilter,
                             changeTodolistTitle,
                             filter,
                             removeTodolistId
                         }: PropsType) => {

    const dispatch = useDispatch()
    const tasks = useSelector<AppRootState, TaskType[]>(state => state.tasks[id])

    const onAllClickHandler = () => changeFilter('all', id)
    const onActiveClickHandler = () => changeFilter('active', id)
    const onCompletedClickHandler = () => changeFilter('completed', id)

    const onRemoveTasksHandler = (idTasks: string) => {
        dispatch(removeTaskAC(idTasks, id)) //(id, idTasks)
    }
    const onChangeStatusHandler = (taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(taskId, isDone, id))
    }

    const removeTodolist = () => {
        removeTodolistId(id)
    }

    const changeTodolistTitles = (newTitle: string) => {
        changeTodolistTitle(id, newTitle)
    }

    const addItem = (title: string) => {
        dispatch(addTaskAC(title, id))
    }


    let tasksForTodolist = tasks

    if (filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
    }
    if (filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={title} onChange={changeTodolistTitles}/>
                <IconButton aria-label="delete" onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addItem}/>
            {!tasks.length
                ? <p>Not tasks</p>
                : (
                    <div>
                        {tasksForTodolist.map((t, index) => {
                                /*const onRemoveHandler = () => removeTasks(t.id)*/

                                const onChangeTitleHandler = (newValue: string) => {
                                    dispatch(changeTaskTitleAC(t.id, newValue, id))
                                    // changeTaskTitle(t.id, newValue, id)
                                }
                                return (
                                    <div key={t.id} className={t.isDone ? 'id-done' : ''}>
                                        <Checkbox
                                            onChange={() => onChangeStatusHandler(t.id, !t.isDone)}
                                            checked={t.isDone}
                                            color="secondary"
                                        />
                                        <EditableSpan title={t.title}
                                                      onChange={onChangeTitleHandler}/>
                                        <IconButton aria-label="delete" onClick={() => onRemoveTasksHandler(t.id)}>
                                            <Delete/>
                                        </IconButton>
                                    </div>
                                )
                            }
                        )}
                    </div>
                )
            }
            <div>
                <Button variant={filter === 'all' ? 'contained' : 'text'}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button color={'primary'} variant={filter === 'active' ? 'contained' : 'text'}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button color={'secondary'} variant={filter === 'completed' ? 'contained' : 'text'}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
}