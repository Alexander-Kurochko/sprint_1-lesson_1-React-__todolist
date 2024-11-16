import React, {ChangeEvent, useState} from 'react';

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
        <input onBlur={activateViewMode} onChange={onChangeTitleHandler} value={text} autoFocus/> :
        <span onDoubleClick={activateEditMode}>{title}</span>
}