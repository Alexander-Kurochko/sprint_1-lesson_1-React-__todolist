import {userReducer} from './user-reducer';
import {v1} from 'uuid';
import {useState} from 'react';
import {FilterValuesType, TodolistType} from '../AppWithRedux';
import {
    addTodolistAC,
    changeTodolistFilterAC, changeTodolistTitleAC,
    ChangeTotodlistFilterActionType,
    removeTodolistAC,
    todolistsReducer
} from './todolists-reducer';

test('correct todolist should be removed', () => {

    let dotolistId1 = v1()
    let dotolistId2 = v1()

    const startState: TodolistType[] = [
        {id: dotolistId1, title: 'What to learn', filter: 'all'},
        {id: dotolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todolistsReducer(startState, removeTodolistAC(dotolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(dotolistId2)
})

test('correct todolist should be added', () => {

    let dotolistId1 = v1()
    let dotolistId2 = v1()

    let newTodolistTitle = 'New Todolist'

    const startState: TodolistType[] = [
        {id: dotolistId1, title: 'What to learn', filter: 'all'},
        {id: dotolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
    expect(endState[2].filter).toBe('all')
})

test("correct todolist should change its name", () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodolistTitle = "New Todolist"

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const action = changeTodolistTitleAC(todolistId2, newTodolistTitle)

    const endState = todolistsReducer(startState, action)

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test("correct filter of todolist should be change", () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newFilter: FilterValuesType = "completed"

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const action = changeTodolistFilterAC(todolistId2, newFilter)

    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})

