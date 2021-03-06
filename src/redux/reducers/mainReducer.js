const initData = {
    title: "UMNENIE",
    notify: 0,
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
        notify: 0,
        role: null
    },
};

export default function mainReducer(state = initData, action) {
    switch (action.type) {
        case "IN_AUTH" :
            return {...state, isAuth: action.payload};
            case "NOTIFY" :
            return {...state, notify: action.payload};
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
                    notify: action.payload.notify,
                    userId: action.payload.userId,
                    role: action.payload.role,
                }, notify:action.payload.notify
            };


        default :
            return state;
    }

}