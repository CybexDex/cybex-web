// import * as Type from "../constants/ActionType.js";

// import FUC from "src/utils/func";

let initialState = {
    
};

export default (state = initialState, action)=>{
    switch (action.type){
        case "DEMO":
            return Object.assign({}, initialState, action.payload);
        // case Type.GET_PRODUCT_LIST:
        //     return FUC.extendObj(initialState, {productList: action.payload})

        default:
            return state;
    }
}

