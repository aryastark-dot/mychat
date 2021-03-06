import {
    LOGIN_LOADING,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_LOADING,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    USERLIST_LOADING,
    USERLIST_SUCCESS,
    USERLIST_FAILURE,
    USER_AUTH_FAILURE,
    USER_AUTH_SUCCESS,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE
} from '../actions/constants';

const initialState={
    userAuth: {},
    userAuthSuccess: false,
    userLogoutSuccess: false,
    userList:[],
    userListSuccess:false
}

export default function  userReducer(state,action){
    if(typeof state === 'undefined'){
        return initialState
    }
    switch(action.type)
    {
        case LOGIN_LOADING:
            return{
                ...state,
                userAuthSuccess:false
            }
        case LOGIN_SUCCESS:
            return{
                ...state,
                userAuthSuccess: true,
                userAuth: action.payload
            }
        case LOGIN_FAILURE:
            return{
                ...state,
                userAuthSuccess: false,
                userAuth: action.payload
            }
            case REGISTER_LOADING:
            return{
                ...state,
                userAuthSuccess:false
            }
        case REGISTER_SUCCESS:
            return{
                ...state,
                userAuthSuccess: true,
                userAuth: action.payload
            }
        case REGISTER_FAILURE:
            return{
                ...state,
                userAuthSuccess: false,
                userAuth: action.payload
            }
            case USERLIST_LOADING:
                return{
                    ...state,
                    userListSuccess:false
                }
            case USERLIST_SUCCESS:
                return{
                    ...state,
                    userListSuccess: true,
                    userList: action.payload
                }
            case USERLIST_FAILURE:
                return{
                    ...state,
                    userListSuccess: false,
                    userList: action.payload
                }
            case USER_AUTH_SUCCESS:
                return{
                    ...state,
                    userAuthSuccess: true,
                    userAuth: action.payload
                }
            case USER_AUTH_FAILURE:
                return{
                    ...state,
                    userAuthSuccess: false,
                    userAuth: action.payload
                }
            case LOGOUT_SUCCESS:
                 return{
                    ...state,
                    userAuthSuccess: true,
                    userLogoutSuccess: action.payload
                    }
             case LOGOUT_FAILURE:
                    return{
                    ...state,
                    userLogoutSuccess: false,
                    userAuth: action.payload
                    }
            default:
                return state;
    }
}