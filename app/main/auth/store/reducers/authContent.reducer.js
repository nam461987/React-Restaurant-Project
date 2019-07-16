import * as Actions from '../actions';

const initialState = {
    data: {
        title:"Welcome to VANGIE HOUSE",
        description:"Enjoy with our services we bring to you"
    }
};

const welcomeContents = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_WELCOME_CONTENTS:
            return {
                initialState
            };
        default:
            return state;
    }
};

export default welcomeContents;