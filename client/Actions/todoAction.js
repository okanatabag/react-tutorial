export function fetchTodos(){
    return function(dispatch){
        fetch("./todo").then((response) => {
            return response.json();
        }).then((json) => {
            dispatch({type:"FETCH_TODO",payload:{todos:json}})
        });
    }
}

export function addTodo(todo_text){
    return function(dispatch){
        fetch("./todo", {
            mode: "cors",
            method: "post",
            headers: {
                "Accept": "application/json, application/xml, text/plain, text/html, *.*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                todo_text:todo_text
            })
        }).then(function(response) {
            return response.json();
        })
        .then(function(json) {
            dispatch({type:"ADD_TODO",payload:{insert_id:json.result.insertId,todo_text:todo_text}});
        });
    }
}

export function updateTodo(id,todo_text){
    return function(dispatch){
        fetch("./todo", {
            mode: "cors",
            method: "PUT",
            headers: {
                "Accept": "application/json, application/xml, text/plain, text/html, *.*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id,
                todo_text:todo_text
            })
        }).then(function(response) {
            dispatch({type:"UPDATE_TODO",payload:{id:id,todo_text:todo_text}});
        })
    }
}

export function deleteTodo(id){
    return function(dispatch){
        fetch("./todo/"+id, {
            mode: "cors",
            method: "delete",
            headers: {
                "Accept": "application/json, application/xml, text/plain, text/html, *.*",
                "Content-Type": "application/json"
            }
        }).then(function(response) {
            dispatch({type:"DELETE_TODO", payload:{id:id}});
        });
    }
}

export function toggleTodo(id,isCompleted){
    return function(dispatch){
        fetch("./todo", {
            mode: "cors",
            method: "PUT",
            headers: {
                "Accept": "application/json, application/xml, text/plain, text/html, *.*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id,
                process:(isCompleted==0) ? 1:0
            })
        }).then(function(response) {
            dispatch({type:"TOGGLE_TODO",payload:{id:id,isCompleted:isCompleted}})
        });
    }
}
