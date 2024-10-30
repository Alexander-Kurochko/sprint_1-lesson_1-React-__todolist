import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from '../App';
import {Button} from './Button';

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTasks: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTasksStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}

export const Todolist = ({title, tasks, removeTasks, changeFilter, addTask, changeTasksStatus, filter}: PropsType) => {

    const [newTaskTitel, setNewTaskTitel] = useState('')
    const [error, setError] = useState <string | null> (null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitel(e.currentTarget.value)
    }

    const onKeyDownHendler = (e: KeyboardEvent<HTMLInputElement>) => {
        /*console.log(e)*/
        setError(null)
        if (e.code === 'Enter' && e.shiftKey && newTaskTitel.trim() !== '') {
            addTask(newTaskTitel)
            setNewTaskTitel('')
        }
    }

    const addTasks = () => {
        if (newTaskTitel.trim() !== '') {
            addTask(newTaskTitel.trim())
            setNewTaskTitel('')
        } else {
            setError('Title if required')
        }
    }

    const onAllClickHandler = () => changeFilter('all')
    const onActiveClickHandler = () => changeFilter('active')
    const onCompletedClickHandler = () => changeFilter('completed')

    const onRemoveTasksHandler = (id: string) => {
        removeTasks(id)
    }
    const onChangeHandler = (taskId: string, isDone: boolean) => {
        changeTasksStatus(taskId, isDone)
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={newTaskTitel}
                       onChange={onNewTitleChangeHandler}
                       onKeyDown={onKeyDownHendler}
                       className={error ? 'error' : ''}
                />
                <button onClick={addTasks}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            {!tasks.length
                ? <p>Not tasks</p>
                : (
                    <ul>
                        {tasks.map((t, index) => {
                                /*const onRemoveHandler = () => removeTasks(t.id)*/
                                return (
                                    <li key={t.id} className={t.isDone ? 'id-done' : ''}>
                                        <input type="checkbox"
                                               onChange={() => onChangeHandler(t.id, !t.isDone)}
                                               checked={t.isDone}/>
                                        <span>{t.title}</span>
                                        <button onClick={() => onRemoveTasksHandler(t.id)}>x
                                        </button>
                                    </li>
                                )
                            }
                        )}
                    </ul>
                )
            }
            {/*                <li><input type="checkbox" checked={tasks[0].isDone}/> <span>{tasks[0].title}</span></li>
                <li><input type="checkbox" checked={tasks[1].isDone}/> <span>{tasks[1].title}</span></li>
                <li><input type="checkbox" checked={tasks[2].isDone}/> <span>{tasks[2].title}</span></li>*/}
            <div>
                {/*                <Button title={'All'} onClick={() => changeFilter('all')}/>
                <Button title={'Active'} onClick={() => changeFilter('active')}/>
                <Button title={'Completed'} onClick={() => changeFilter('completed')}/>    */}

                <button className={filter === 'all' ? 'active-filter' : ''}
                        onClick={onAllClickHandler}>All</button>
                <button className={filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active</button>
                <button className={filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )

}