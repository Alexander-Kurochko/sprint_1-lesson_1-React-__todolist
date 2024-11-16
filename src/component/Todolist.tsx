import React from 'react';
import {FilterValuesType, TaskType} from '../App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';

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
                <button onClick={removeTodolist}>x</button>
            </h3>
            <AddItemForm addItem={addItem}/>
            {!tasks.length
                ? <p>Not tasks</p>
                : (
                    <ul>
                        {tasks.map((t, index) => {
                                /*const onRemoveHandler = () => removeTasks(t.id)*/

                                const onChangeTitleHandler = (newValue: string) => {
                                    changeTaskTitle(t.id, newValue, id)
                                }
                                return (
                                    <li key={t.id} className={t.isDone ? 'id-done' : ''}>
                                        <input type="checkbox"
                                               onChange={() => onChangeStatusHandler(t.id, !t.isDone)}
                                               checked={t.isDone}/>
                                        <EditableSpan title={t.title}
                                                      onChange={onChangeTitleHandler}/>
                                        <button onClick={() => onRemoveTasksHandler(t.id)}>x
                                        </button>
                                    </li>
                                )
                            }
                        )}
                    </ul>
                )
            }
            <div>
                <button className={filter === 'all' ? 'active-filter' : ''}
                        onClick={onAllClickHandler}>All
                </button>
                <button className={filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}