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
            todoText:'',
            todoId:''
        };
    }
    componentWillMount() {
        this.getTodoList();
    }
    getTodoList() {
        var self = this;
        fetch('http://localhost:8000/todo').then((response) => {
            return response.json();
        }).then((json) => {
            self.setState({data: json});
        });
    };
    addTodo(text) {
        var self = this;
        //console.log(ReactDOM.findDOMNode(this).children['todo-inputs-container'].children['set-todo-text'].value);
        fetch('http://localhost:8000/todo', {
            mode: 'cors',
            method: 'post',
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name:text.value
            })
        }).then(function(response) {
            return response.json();
        })
        .then(function(json) {
            text.value='';
            self.getTodoList();
        });
    }
    toggleTodo(id,proc){
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
            return response.json();
        })
      .then(function(json) {
          self.getTodoList();
      });
    }
    prepareTodoSet(id,text){
        this.setState({todoId:id,todoText:text});
    }
    render() {
        var self = this;
        return (
              <div>
                  <TodoInputs
                  addFunc={() => self.addTodo(document.getElementById('name'))}
                  todoTextElement="name"
                  todoText={self.state.todoText}
                  todoId={self.state.todoId}>
                  </TodoInputs>
                  <ul>
                      {this.state.data.map(function(value,i) {
                          return <TodoListItem
                                  key={i}
                                  prc={(value.process==0) ? {textDecoration:'none',color:'#000000'}:{textDecoration:'line-through',color:'#666666'}}
                                  name={value.name}
                                  prepareSetFunc={()=>self.prepareTodoSet(value.id,value.name)}
                                  toggleFunc={() =>self.toggleTodo(value.id,value.process)}
                                  delFunc={()=>self.delTodo(value.id)}  />
                      })}
                  </ul>
              </div>
        );
    }
}
