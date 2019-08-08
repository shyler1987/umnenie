const initData = {
  isAuth:false
};

export default function mainReducer(state=initData, action) {
    switch (action.type) {
        case "IN_AUTH" :
            return {...state, isAuth:action.payload};
        break;
        default :
            return state;
    }
    
}