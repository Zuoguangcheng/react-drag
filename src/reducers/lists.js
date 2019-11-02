import { Record } from 'immutable';

import {
    GET_LISTS,
} from '../actions/lists';

const InitialState = Record({
    list: [],
});

const initialState = new InitialState;

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_LISTS:
            return state.set('list', action.payload);
        default:
            return state;
    }
}
