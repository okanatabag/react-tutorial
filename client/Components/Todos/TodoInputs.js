import React from "react";
import css from "./TodoInputs.css";
export default function TodoInputs(props) {
    return(<div>
                <div className="inputs_container">
                    <input className="todo_inputs" id={props.todoTextElement.element} name={props.todoTextElement.element} onChange={props.handleChange} onKeyPress={props.setTodoByEnter} type="text" value={props.todoTextElement.val}/>
                    <input id={props.todoIdElement.element} name={props.todoIdElement.element} type="hidden"  value={props.todoIdElement.val}/>
                </div>
                <div className="buttons_container">
                  <button type="button" onClick={props.setTodo}>Kaydet</button>&nbsp;
                  <button type="button" onClick={props.cancelSetTodo}>İptal</button>
                </div>
                <div className="clear"></div>
            </div>);
};
