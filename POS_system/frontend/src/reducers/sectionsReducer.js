import { GET_SECTIONS, DELETE_SECTIONS, ADD_SECTIONS, PUT_SECTIONS} from '../actions/types.js';

const initialState = {
    sections : []
}

export default function(state = initialState, action) {
    switch(action.type){
        case GET_SECTIONS:
            return{
                ...state,
                sections: action.payload
            };
        case DELETE_SECTIONS:
            return{
                ...state,
                sections: state.sections.filter(section => section.id != action.payload)
            };

        case ADD_SECTIONS:
            return{
                ...state,
                sections: [...state.sections,action.payload]
            };

        case PUT_SECTIONS:
            return{
                ...state,
                sections: [...state.sections]
            };
        
        default:
            return state
    }

}