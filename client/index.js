import React from "react";
import ReactDOM from "react-dom";
import TodoList from "./Containers/Todos/TodoList";
import {Provider} from "react-redux";
import store from "./store";
import css from "./index.css";

ReactDOM.render(<Provider store={store}><TodoList/></Provider>, document.getElementById("app"));
