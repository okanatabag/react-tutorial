import React from "react";
import {render} from "react-dom";
import {connect} from "react-redux";
import {fetchTodos,addTodo,updateTodo,deleteTodo,toggleTodo} from "../../Actions/todoAction";
import {setInputTodoText,setInputTodoId} from "../../Actions/inputAction";
import TodoListItem from "../../Components/Todos/TodoListItem";
import TodoInputs from "../../Components/Todos/TodoInputs";
import css from "./TodoList.css";

@connect((store)=>{
    return{
        inputs:store.inputs,
        todos:store.todos
    }
})
export default class TodoList extends React.Component{
    componentWillMount() {
        this.props.dispatch(fetchTodos());
    }
    handleChange(event) {
        this.props.dispatch(setInputTodoText(event.target.value));
    }
    prepareSetTodo(e,todoId,todoText) {
        e.preventDefault();
        this.props.dispatch(setInputTodoText(todoText));
        this.props.dispatch(setInputTodoId(todoId));
    }
    cancelSetTodo(){
        this.props.dispatch(setInputTodoText(""));
        this.props.dispatch(setInputTodoId(""));
    }
    setTodo() {
        const {inputs} = this.props;
        if(inputs.todo_id_input==""){
            this.props.dispatch(addTodo(inputs.todo_text_input));

        }else{
            this.props.dispatch(updateTodo(inputs.todo_id_input,inputs.todo_text_input));
        }
        this.props.dispatch(setInputTodoText(""));
        this.props.dispatch(setInputTodoId(""));
    }
    setTodoByEnter(event){
        if(event.code=="Enter"){
            this.setTodo();
        }
    }
    setStatusTodo(e,id,isCompleted){
        e.preventDefault();
        this.props.dispatch(toggleTodo(id,isCompleted))
    }
    delTodo(e,id) {
        e.preventDefault();
        this.props.dispatch(deleteTodo(id));
    }
    render() {
        let self = this;
        const { todos,inputs} = self.props;
        return (
              <div>
                  <TodoInputs
                      todoIdElement={{element:"id",val:inputs.todo_id_input}}
                      todoTextElement={{element:"todo_text_input",val:inputs.todo_text_input}}
                      setTodo={() => self.setTodo()}
                      cancelSetTodo={() => self.cancelSetTodo()}
                      setTodoByEnter={() => self.setTodoByEnter(event)}
                      handleChange={()=> self.handleChange(event)}
                  />
                  <ul>
                      {todos.todos.map(function(value,i) {
                          return <TodoListItem
                                    key={value.id}
                                    todoStatus={(value.process==0) ? {textDecoration:"none",color:"#000000"}:{textDecoration:"line-through",color:"#666666"}}
                                    todoText={value.todo_text}
                                    prepareSetTodo={()=>self.prepareSetTodo(event,value.id,value.todo_text)}
                                    setStatusTodo={()=>self.setStatusTodo(event,value.id,value.process)}
                                    delTodo={()=>self.delTodo(event,value.id)}
                                  />
                      })}
                  </ul>
              </div>
        );
    }
}
