import React from 'react';
import {TaskType} from '../App';
import {Button} from './Button';

type PropsType = {
    title: string
    tasks: TaskType[]
    date?: string
}

export const Todolist = ({title, tasks, date}: PropsType) => {
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
                <Button title={'All'}/>
                <Button title={'Active'}/>
                <Button title={'AlCompletedl'}/>
            </div>
            <div>{date}</div>
        </div>
    )

}