import { GET_ENTRIES, DELETE_ENTRIES, ADD_ENTRIES, PUT_ENTRIES} from '../actions/types.js';

const initialState = {
    entries : []
}

export default function(state = initialState, action) {
    switch(action.type){
        case GET_ENTRIES:
            return{
                ...state,
                entries: action.payload
            };
        case DELETE_ENTRIES:
            return{
                ...state,
                entries: state.entries.filter(entry => entry.id != action.payload)
            };

        case ADD_ENTRIES:
            return{
                ...state,
                entries: [...state.entries,action.payload]
            };

        case PUT_ENTRIES:
            return{
                ...state,
                entries: [...state.entries]
            };
        
        default:
            return state
    }

}