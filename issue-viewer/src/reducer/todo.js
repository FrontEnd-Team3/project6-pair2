
const initialState = [
    {
        id: 1,
        title: "todo-1",
        content: 'todo-1',
        state: false
    }
]

const reducer = (state = initialState, action) => {
    switch(action.type){
        case "ADD_TODO":
            return [...state, action.payload]
        case "UPDATE_TODO":
            const todoList = [...state];
            const index = todoList.findIndex((todo)=>todo.id === action.payload.id);
            todoList[index].content = action.payload.content;
            todoList[index].state = action.payload.state;
            return todoList;
        case "DELETE_TODO":
            return state.filter((todo) => todo.id !== action.payload)
        default:
            return state;
    }
}
export default reducer