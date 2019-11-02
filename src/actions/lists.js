export const GET_LISTS = 'GET_LISTS_START';


export function setList(list) {
    return {
        type: GET_LISTS,
        payload: list
    }
}


/*export function moveList(lastX, nextX) {
    return (dispatch) => {
        dispatch({ type: MOVE_LIST, lastX, nextX });
    };
}*/
