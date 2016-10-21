import React from 'react';
import ReactDOM from 'react-dom';
export default function TodoInputs(props) {
    return(<div>
                <input id={props.todoTextElement} name={props.todoTextElement} type="text" defaultValue={(props.todoText!='') ? props.todoText:''}/>
                <input name="id" type="hidden"  defaultValue={(props.todoId!='') ? props.todoId:''}/>
                <button type="button" onClick={props.addFunc}>Ekle</button>
            </div>);
};
