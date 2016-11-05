export function setInputTodoText(text){
    return function(dispatch){
        dispatch({type:"CHANGE_TEXT_INPUT",payload:text})
    }
}
export function setInputTodoId(id){
    return function(dispatch){
        dispatch({type:"CHANGE_ID_INPUT",payload:id})
    }
}
