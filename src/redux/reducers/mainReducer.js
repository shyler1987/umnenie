const initData = {
    isAuth:false,
    isAuthenticated:localStorage.getItem('token')!==null ? true : false,
    user: {
        userFIO: null,
        userName: null,
        userImage: null,
        access_token: null,
        user_id: null,
        role: null
    },
};

export default function mainReducer(state=initData, action) {
    switch (action.type) {
        case "IN_AUTH" :
            return {...state, isAuth:action.payload};
        break;
        case "IS_AUTHENTICATED" :
            return {...state, isAuthenticated:action.payload};
        break;
        case "USER_DATA" :
            return {
                ...state, user: {
                    ...state.user,
                    userFIO: action.payload.userFIO,
                    userName: action.payload.userName,
                    userImage: action.payload.userImage,
                    access_token: action.payload.access_token,
                    user_id: action.payload.user_id,
                    role: action.payload.role,
                }
            };

            break;

        default :
            return state;
    }
    
}