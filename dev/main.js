import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(){
      super();
       this.state = {
           data: []
       };
       this.addTodo = this.addTodo.bind(this);
       this.getData = this.getData.bind(this);
    }
    addTodo(e){
      fetch("http://localhost:8000/todo", {
        mode: 'cors',
        method: "post",
        headers: {
         'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
         'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            name:ReactDOM.findDOMNode(this.refs.new_todo_input.refs.new_todo).value,
        })
      })
      .then(function(res){
        this.getData();
      })
    }
    getData(){
      fetch("http://localhost:8000/todo")
          .then( (response) => {
              return response.json() })
          .then( (json) => {
              this.setState({data: json});
          });
    }
    componentDidMount() {
      this.getData();
    }
    render() {
        return (<div>
            <ul>
              {this.state.data.map(function(value){
                return <TodoListItem name={value.name} />
              })}
            </ul>
            <TodoAddElements ref="new_todo_input" event={this.addTodo} />
          </div>
        );
    }
}


class TodoListItem extends React.Component {
  render() {
    return (
      <li>{this.props.name}</li>
    );
  }
}

class TodoAddElements extends React.Component {
  render() {
    return (
      <div>
        <input name="name" ref="new_todo" type="text" defaultValue=""/>
        <button type="button" onClick={this.props.event}>Ekle</button>
      </div>
    );
  }

}

ReactDOM.render(<App /> ,document.getElementById('app'));
