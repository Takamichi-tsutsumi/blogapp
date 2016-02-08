/**
 * Created by Takamichi on 2/7/16.
 **/
import { FETCH_POSTS, FETCH_A_POST, SELECT_CATEGORY } from '../actions/index';
const INITIAL_STATE = { all: [], post: null, category: null };

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case FETCH_POSTS:
            return { ...state, all: action.payload.data };
        case FETCH_A_POST:
            return { ...state, post: action.payload.data };
        case SELECT_CATEGORY:
            return { ...state, category: action.payload.category };
        default:
            return state;
    }
}
