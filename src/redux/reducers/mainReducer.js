const initData = {
    title: "UMNENIE",
    isAuth: false,
    isPhoneNumber: false,
    isExitApp: false,
    isAuthenticated: localStorage.getItem('token') !== null ? true : false,
    user: {
        userFIO: null,
        userName: null,
        userImage: null,
        userPhone: false,
        access_token: null,
        userId: null,
        role: null
    },
};

export default function mainReducer(state = initData, action) {
    switch (action.type) {
        case "IN_AUTH" :
            return {...state, isAuth: action.payload};
        case "IS_PHONE" :
            return {...state, isPhoneNumber: action.payload};

        case "TITLE" :
            return {...state, title: action.payload};
        case "IS_AUTHENTICATED" :
            return {...state, isAuthenticated: action.payload};
        case "EXIT_APP" :
            return {...state, isExitApp: action.payload};

        case "USER_DATA" :
            return {
                ...state, user: {
                    ...state.user,
                    userFIO: action.payload.userFIO,
                    userName: action.payload.userName,
                    userImage: action.payload.userImage,
                    userPhone: action.payload.userPhone,
                    userType: action.payload.userType,
                    access_token: action.payload.access_token,
                    userId: action.payload.userId,
                    role: action.payload.role,
                }
            };


        default :
            return state;
    }

}