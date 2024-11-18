import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, Icon, IconButton, Stack, TextField} from '@mui/material';
import {ControlPoint} from '@mui/icons-material';

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
        <TextField
            variant="outlined" label="Type value"
            value={newTaskTitel}
            onChange={onNewTitleChangeHandler}
            onKeyDown={onKeyDownHendler}
            error={!!error}
            helperText={error}
        />
        <IconButton onClick={addTasks} color={'primary'}>
            <ControlPoint/>
            </IconButton>
    </div>
}