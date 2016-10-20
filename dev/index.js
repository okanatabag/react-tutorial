import React from 'react';
import ReactDOM from 'react-dom';
import List from './Containers/Todos/List';
require('./index.css');
class App extends React.Component {
    render(){
        return <List></List>
    }
}
ReactDOM.render(<App/>, document.getElementById('app'));
