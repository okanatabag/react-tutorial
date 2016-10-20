import React from 'react';
import ReactDOM from 'react-dom';
import TodoListItem from '../../Components/Todos/TodoListItem';
import css from './TodoList.css';
export default class TodoList extends React.Component{
    constructor() {
        super();
        this.state = {
            data: []
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
    addTodo() {
        var self = this;
        fetch('http://localhost:8000/todo', {
            mode: 'cors',
            method: 'post',
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: ReactDOM.findDOMNode(this.refs.input).value
            })
        }).then(function(response) {
            return response.json();
        })
        .then(function(json) {
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
            return response.json();
        })
    .then(function(json) {
        self.getTodoList();
    });
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
    render() {
        var self = this;
        return (
            <div>
              <input name="name" ref="input" type="text" defaultValue=""/>
              <button type="button" onClick={self.addTodo.bind(this)}>Ekle</button>
                <ul>
                    {this.state.data.map(function(value,i) {
                        return <TodoListItem
                                key={value.id}
                                prc={(value.process==0) ? {textDecoration:'none',color:'#000000'}:{textDecoration:'line-through',color:'#666666'}}
                                name={value.name}
                                toggleFunc={() =>self.toggleTodo(value.id,value.process)}
                                delFunc={()=>self.delTodo(value.id)}  />
                    })}
                </ul>
            </div>
        );
    }
}
