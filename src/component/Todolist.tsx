import React from 'react';
import {FilterValuesType, TaskType} from '../App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';

type PropsType = {
    id: string
    title: string
    tasks: TaskType[]
    removeTasks: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTasksStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (taskId: string, newTitle: string) => void
    filter: FilterValuesType
    removeTodolistId: (todolistId: string) => void
}

export const Todolist = ({
                             id,
                             title,
                             tasks,
                             removeTasks,
                             changeFilter,
                             addTask,
                             changeTasksStatus,
                             changeTaskTitle,
                             changeTodolistTitle,
                             filter,
                             removeTodolistId
                         }: PropsType) => {

    const onAllClickHandler = () => changeFilter('all', id)
    const onActiveClickHandler = () => changeFilter('active', id)
    const onCompletedClickHandler = () => changeFilter('completed', id)

    const onRemoveTasksHandler = (idTasks: string) => {
        removeTasks(idTasks, id)
    }
    const onChangeStatusHandler = (taskId: string, isDone: boolean) => {
        changeTasksStatus(taskId, isDone, id)
    }

    const removeTodolist = () => {
        removeTodolistId(id)
    }

    const changeTodolistTitles = (newTitle: string) => {
        changeTodolistTitle(id, newTitle)
    }

    const addItem = (title: string) => {
        addTask(title, id)
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
                        {tasks.map((t, index) => {
                                /*const onRemoveHandler = () => removeTasks(t.id)*/

                                const onChangeTitleHandler = (newValue: string) => {
                                    changeTaskTitle(t.id, newValue, id)
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