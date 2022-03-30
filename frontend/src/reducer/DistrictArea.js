import {ADD_AREA} from "../actions/district"

const area = (state = [], action) => {
    switch (action.type) {
        case ADD_AREA:
            return {
                state : action.data
            }
        default:
            return state;
    } 
}

export default area;
