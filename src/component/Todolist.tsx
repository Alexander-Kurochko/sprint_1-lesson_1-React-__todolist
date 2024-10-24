import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from '../App';
import {Button} from './Button';

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTasks: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export const Todolist = ({title, tasks, removeTasks, changeFilter, addTask}: PropsType) => {

    const [newTaskTitel, setNewTaskTitel] = useState('')

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitel(e.currentTarget.value)
    }

    const onKeyDownHendler = (e: KeyboardEvent<HTMLInputElement>) => {
        /*console.log(e)*/
        if (e.code === 'Enter' && e.shiftKey) {
            addTask(newTaskTitel)
            setNewTaskTitel('')
        }
    }

    const addTasks = () => {
        addTask(newTaskTitel)
        setNewTaskTitel('')
    }

    const onAllClickHandler = () => changeFilter('all')
    const onActiveClickHandler = () => changeFilter('active')
    const onCompletedClickHandler = () => changeFilter('completed')

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={newTaskTitel}
                       onChange={onNewTitleChangeHandler}
                       onKeyDown={onKeyDownHendler} />
                <button onClick={addTasks}>+</button>
            </div>
            {!tasks.length
                ? <p>Not tasks</p>
                : (
                    <ul>
                        {tasks.map((t, index) => {
                            const onRemoveHandler = () => removeTasks(t.id)
                                return (
                                    <li key={t.id}>
                                        <input type="checkbox" checked={t.isDone}/>
                                        <span>{t.title}</span>
                                        <button onClick={onRemoveHandler}>x
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

                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )

}