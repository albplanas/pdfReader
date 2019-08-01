import * as actionTypes from '../actions';

       

const initialState = {

   OldReports:[]

}

const report = (state = initialState, action) => {


    switch(action.type){

        case actionTypes.GETALLREPORTS:
                   
                        return {
                            ...state,
                            OldReports:action.value
                        } 


    }
    return state;
};

export default report;