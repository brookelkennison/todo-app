import { useState } from 'react';
import data from '../data.json';

function Todo() {
    const [todo, setTodo] = useState(data);
    const [userInput, setUserInput] = useState('');
    const list = [];
    data.forEach((todo) => {
        list.push(
            <li
                key={todo.task + todo.id}
                onClick={() => {
                    toggleIsDone(todo);
                }}
                className={`${todo.complete ? 'doneTodo' : ''}`}>
                {todo.task}
                <button onClick={() => {deleteTodo(todo)}}>x</button>
            </li>
        );
    });

    const toggleIsDone = (todo) => {
        setTodo((data[todo.id - 1].complete = !todo.complete));
    };

    const deleteTodo = (e) => {
        console.log(e.id - 1);
        setTodo(
            data.splice(e.id - 1 , 1)
            // update all item ids
            // for each item after the one deleted, subtract 1 from the ids
        );
    }

    const handleChange = (e) => {
        setUserInput(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Submitting Todo ${userInput}`);

        setTodo(
            data.push({ id: data.length + 1, task: userInput, complete: false })
        );
        console.log(data);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Add new todo:
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => {
                            handleChange(e);
                        }}
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
            {list}
        </>
    );
}

export default Todo;
