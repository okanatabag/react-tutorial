import React from 'react';
import ReactDOM from 'react-dom';

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
    getTodoList() {
        var self = this;
        fetch('http://localhost:8000/todo').then((response) => {
            return response.json();
        }).then((json) => {
            self.setState({data: json});
        });
    };
    render() {
        var self = this;
        return (
            <div>
              <input name="name" ref="input" type="text" defaultValue=""/>
              <button type="button" onClick={self.addTodo.bind(this)}>Ekle</button>
                <ul>
                    {this.state.data.map(function(value,i) {
                        return <TodoListItem key={i} name={value.name}/>
                    })}
                </ul>
            </div>
        );
    }
}

function TodoListItem(props) {
    return (<li>{props.name}</li>);
}

ReactDOM.render(<App/>, document.getElementById('app'));
