const initData = {
    isAuth:false,
    isAuthenticated:localStorage.getItem('token')!==null ? true : false
};

export default function mainReducer(state=initData, action) {
    switch (action.type) {
        case "IN_AUTH" :
            return {...state, isAuth:action.payload};
        break;
        case "IS_AUTHENTICATED" :
            return {...state, isAuthenticated:action.payload};
        break;

        default :
            return state;
    }
    
}