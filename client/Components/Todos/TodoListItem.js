import React from "react";
import css from "./TodoListItem.css";
export default function TodoListItem(props) {
    return (<li><a className="text" href="" style={props.todoStatus} onDoubleClick={props.setStatusTodo} onClick={props.prepareSetTodo}>{props.todoText}</a>
                <a className="del" href="" onClick={props.delTodo}><span>&times;</span></a>
            </li>);
}
