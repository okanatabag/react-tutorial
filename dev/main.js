
import React from 'react';
import ReactDOM from 'react-dom';

require('./main.less');
class App extends React.Component {
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
    toggleTodo(id){
        var self = this;
        fetch('http://localhost:8000/todo', {
            mode: 'cors',
            method: 'PUT',
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
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
        fetch('http://localhost:8000/todo', {
            mode: 'cors',
            method: 'delete',
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            })
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
                                name={value.name}
                                toggleFunc={() =>self.toggleTodo(value.id)}
                                delFunc={()=>self.delTodo(value.id)}  />
                    })}
                </ul>
            </div>
        );
    }
}
function TodoListItem(props) {
    return (<li><a className="text" href="javascript:void(0)" onClick={props.toggleFunc}>{props.name}</a> <a className="del" href="javascript:void(0)" onClick={props.delFunc}><span>&times;</span></a></li>);
}

ReactDOM.render(<App/>, document.getElementById('app'));
