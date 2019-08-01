import * as actionTypes from '../actions';
       

const initialState = {

     productList: [{
        name:'sitting',
        code:124981233212,
        provider:"Ferguson"
        },{
            name:"pompell",
            code:12312312,
            provider:"Provider 2"
        },{
            name:"soft",
            code:546433322,
            provider:"Provider 2"
        },{
            name:"junior",
            code:223423234,
            provider:"Provider 2" 
        }],
    providersList:["Ferguson","Provider 2","Provider 3"]

}


const list = (state = initialState, action) => {


    switch(action.type){


    }
    return state;
};

export default list;