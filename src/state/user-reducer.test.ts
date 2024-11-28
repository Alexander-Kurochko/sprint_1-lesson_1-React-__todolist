import {userReducer} from './user-reducer';
import {start} from 'node:repl';
import {type} from 'node:os';

test('user reducer should increment only age', () => {
    const startState = { age: 20, childrenCount: 26, name: 'Dimych'}

    const endState = userReducer(startState, { type: 'INCREMENT-AGE'})

    expect(endState.age).toBe(21)
    expect(endState.childrenCount).toBe(26)
})

test('user reducer should increment only childrenCount', () => {
    const startState = { age: 20, childrenCount: 2, name: 'Dimych'}

    const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'})

    expect(endState.age).toBe(20)
    expect(endState.childrenCount).toBe(3)
})

test( 'user reducer should change name of user', () => {
    const startState = { age: 20, childrenCount: 2, name: 'Dimych'}
    const newName = 'Sasha'

    const endState = userReducer(startState, {type: 'CHANGE-NAME', newName: newName})

    expect(endState.name).toBe(newName)
})