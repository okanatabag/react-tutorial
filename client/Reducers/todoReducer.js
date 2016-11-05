const initialState={
    todos:[]
};
export default function todoReducer(state=initialState,action){
    switch(action.type){
    case "FETCH_TODO":{
        state.todos=action.payload.todos
        return {...state}
    }
    case "ADD_TODO":{
        state.todos.push({date:Date.now(),id:action.payload.insert_id,process:0,todo_text:action.payload.todo_text});
        return {...state}
    }
    case "UPDATE_TODO":{
        state.todos.map(function(value,i){
            if(value.id==action.payload.id){
                state.todos[i].todo_text=action.payload.todo_text
            }
        });
        return {...state}
    }
    case "DELETE_TODO":{
        state.todos.map(function(value,i){
            if(value.id==action.payload.id){
                state.todos.splice(i,1);
            }
        });
        return {...state}
    }
    case "TOGGLE_TODO":{
        state.todos.map(function(value,i){
            if(value.id==action.payload.id){
                state.todos[i].process=(action.payload.isCompleted==0) ? 1:0
            }
        });
        return {...state}
    }
    default: {
        return {
            ...state
        }
    }
    }
}
