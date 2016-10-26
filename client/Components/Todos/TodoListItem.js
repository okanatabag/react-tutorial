import React from "react";
import css from "./TodoListItem.css";
export default function TodoListItem(props) {
    let propsObj=props.todoListItemProp;
    return (<li><a id={propsObj.todoElementId} className="text" href="javascript:void(0)" style={propsObj.todoStatus} onDoubleClick={propsObj.funcSetStatus} onClick={propsObj.funcSetPrepare}>{propsObj.todoElementString}</a>
                <a className="del" href="javascript:void(0)" onClick={propsObj.funcDel}><span>&times;</span></a>
            </li>);
}
