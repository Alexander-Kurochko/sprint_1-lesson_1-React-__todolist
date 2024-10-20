import React from 'react';
import {FilterValuesType, TaskType} from '../App';
import {Button} from './Button';

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTasks: (id: number) => void
    changeFilter: (value: FilterValuesType) => void
}

export const Todolist = ({title, tasks, removeTasks, changeFilter}: PropsType) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            {!tasks.length
                ? <p>Not tasks</p>
                : (
                    <ul>
                        {tasks.map((t, index) => {
                                return (
                                    <li key={t.id}>
                                        <input type="checkbox" checked={t.isDone}/>
                                        <span>{t.title}</span>
                                        <button onClick={() => { removeTasks(t.id)}}>x</button>
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

                <button onClick={() => changeFilter('all')}>All</button>
                <button onClick={() => changeFilter('active')}>Active</button>
                <button onClick={() => changeFilter('completed')}>Completed</button>
            </div>
        </div>
    )

}