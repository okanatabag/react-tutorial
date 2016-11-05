const initialState={
    todo_text_input:"",
    todo_id_input:""
}
export default function inputReducer(state=initialState,action){
    switch(action.type){
    case "CHANGE_TEXT_INPUT":{
        return {...state,todo_text_input:action.payload}
    }
    case "CHANGE_ID_INPUT":{
        return{...state,todo_id_input:action.payload}
    }
    default: {
        return {
            ...state
        }
    }
    }
}
