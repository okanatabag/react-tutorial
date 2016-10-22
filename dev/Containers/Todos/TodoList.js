import React from 'react';
import ReactDOM from 'react-dom';
import TodoListItem from '../../Components/Todos/TodoListItem';
import TodoInputs from '../../Components/Todos/TodoInputs';
import css from './TodoList.css';
export default class TodoList extends React.Component{
    constructor() {
        super();
        this.state = {
            data: [],
            todo_text_input:'',
            todo_id_input:''
        };
    }
    componentWillMount() {
        this.getTodoList();
    }
    handleChange(event) {
        this.setState({todo_text_input: event.target.value});
    }
    getTodoList() {
        var self = this;
        fetch('http://localhost:8000/todo').then((response) => {
            return response.json();
        }).then((json) => {
            self.setState({data: json});
        });
    };
    prepareSetTodo(todoId,todoText){
        this.setState({todo_id_input:todoId,todo_text_input:todoText});
    }
    cancelSetTodo(){
        this.setState({todo_id_input:'',todo_text_input:''});
    }
    setTodo() {
        var self = this;
        if(self.state.todo_id_input==''){
            fetch('http://localhost:8000/todo', {
                mode: 'cors',
                method: 'post',
                headers: {
                    'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    todo_text:self.state.todo_text_input
                })
            }).then(function(response) {
                return response.json();
            })
            .then(function(json) {
                self.state.data.push({date:Date.now(),id:json.result.insertId,process:0,todo_text:self.state.todo_text_input});
                self.setState({data:self.state.data,todo_text_input:'',todo_id_input:''});
            });
        }else{
            fetch('http://localhost:8000/todo', {
                mode: 'cors',
                method: 'PUT',
                headers: {
                    'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: self.state.todo_id_input,
                    todo_text:self.state.todo_text_input
                })
            }).then(function(response) {
                self.state.data.map(function(value,i){
                    if(value.id==self.state.todo_id_input){
                        self.state.data[i].todo_text=self.state.todo_text_input
                        self.setState({data:self.state.data,todo_text_input:'',todo_id_input:''})
                    }
                });
            })
        }
    }
    setTodoByEnter(event){
        if(event.code=='Enter'){
            this.setTodo();
        }
    }
    setStatusTodo(id,proc){
        var self = this;
        fetch('http://localhost:8000/todo', {
            mode: 'cors',
            method: 'PUT',
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                process:(proc==0) ? 1:0
            })
        }).then(function(response) {
            self.state.data.map(function(value,i){
                if(value.id==id){
                    self.state.data[i].process=(proc==0) ? 1:0
                    self.setState({data:self.state.data})
                }
            });
        })

    }
    delTodo(id) {
        var self = this;
        fetch('http://localhost:8000/todo/'+id, {
            mode: 'cors',
            method: 'delete',
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/json'
            }
        }).then(function(response) {
            self.state.data.map(function(value,i){
                if(value.id==id){
                    self.state.data.splice(i,1);
                    self.setState({data:self.state.data})
                }
            });
        })

    }
    render() {
        var self = this;
        var todoInputsProps ={
            todoIdElement:{element:'id',val:self.state.todo_id_input},
            todoTextElement:{element:'todo_text_input',val:self.state.todo_text_input},
            funcSetTodo:() => self.setTodo(),
            funcCancelSetTodo:() => self.cancelSetTodo(),
            funcSetTodoByEnter:() => self.setTodoByEnter(event),
            funcOnChangeHandler:() => self.handleChange(event)
        }
        return (
              <div>
                  <TodoInputs todoInputsProps={todoInputsProps}></TodoInputs>
                  <ul>
                      {this.state.data.map(function(value,i) {
                          var todoListItemProp= {
                              todoStatus:(value.process==0) ? {textDecoration:'none',color:'#000000'}:{textDecoration:'line-through',color:'#666666'},
                              todoElementString:value.todo_text,
                              todoElementId:'todo'+value.id,
                              funcSetPrepare:()=>self.prepareSetTodo(value.id,value.todo_text),
                              funcSetStatus:()=>self.setStatusTodo(value.id,value.process),
                              funcDel:()=>self.delTodo(value.id)
                          }
                          return <TodoListItem key={'item'+value.id} todoListItemProp={todoListItemProp}/>
                      })}
                  </ul>
              </div>
        );
    }
}
