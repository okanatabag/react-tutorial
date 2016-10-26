import React from "react";
import css from "./TodoInputs.css";
export default function TodoInputs(props) {
    const propObj=props.todoInputsProps;
    return(<div>
                <div className="inputs_container">
                    <input className="todo_inputs" id={propObj.todoTextElement.element} name={propObj.todoTextElement.element} onChange={propObj.funcOnChangeHandler} onKeyPress={propObj.funcSetTodoByEnter} type="text" value={propObj.todoTextElement.val}/>
                    <input id={propObj.todoIdElement.element} name={propObj.todoIdElement.element} type="hidden"  value={propObj.todoIdElement.val}/>
                </div>
                <div className="buttons_container">
                  <button type="button" onClick={propObj.funcSetTodo}>Kaydet</button>&nbsp;
                  <button type="button" onClick={propObj.funcCancelSetTodo}>İptal</button>
                </div>
                <div className="clear"></div>
            </div>);
};
