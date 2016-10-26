import React from "react";
import ReactDOM from "react-dom";
import TodoList from "./Containers/Todos/TodoList";
import css from "./index.css";
class App extends React.Component {
    render(){
        return <TodoList></TodoList>
    }
}
ReactDOM.render(<App/>, document.getElementById("app"));
