import { combineReducers } from 'redux';
import todoList from './lists';


const rootReducer = combineReducers({
    todoList,
});

export default rootReducer;
