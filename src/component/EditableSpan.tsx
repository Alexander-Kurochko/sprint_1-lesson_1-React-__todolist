import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@mui/material';

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export function EditableSpan({title, onChange}: EditableSpanPropsType){

    const [editMode, setEditMode] = useState(false)
    const [text, setText] = useState('')

    const activateEditMode = () => {
        setEditMode(true)
        setText(title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        onChange(text)
    }
    const onChangeTitleHandler = (e:  ChangeEvent<HTMLInputElement> ) => setText(e.currentTarget.value)

    return editMode ?
        <TextField
            variant={'standard'}
            onBlur={activateViewMode}
            onChange={onChangeTitleHandler}
            value={text}
            autoFocus
        /> :
        <span onDoubleClick={activateEditMode}>{title}</span>
}