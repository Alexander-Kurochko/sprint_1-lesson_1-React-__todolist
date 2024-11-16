import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm({addItem}: AddItemFormPropsType) {
    const [newTaskTitel, setNewTaskTitel] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitel(e.currentTarget.value)
    }

    const onKeyDownHendler = (e: KeyboardEvent<HTMLInputElement>) => {
        /*console.log(e)*/
        setError(null)
        if (e.code === 'Enter' && e.shiftKey && newTaskTitel.trim() !== '') {
            addItem(newTaskTitel)
            setNewTaskTitel('')
        }
    }

    const addTasks = () => {
        if (newTaskTitel.trim() !== '') {
            addItem(newTaskTitel.trim())
            setNewTaskTitel('')
        } else {
            setError('Title if required')
        }
    }


    return <div>
        <input value={newTaskTitel}
               onChange={onNewTitleChangeHandler}
               onKeyDown={onKeyDownHendler}
               className={error ? 'error' : ''}
        />
        <button onClick={addTasks}>+</button>
        {error && <div className={'error-message'}>{error}</div>}
    </div>
}