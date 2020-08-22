import axios from "axios";
import {
    CHAT_INSERT_LOADING,
    CHAT_INSERT_SUCCESS,
    CHAT_INSERT_FAILURE,
    CHAT_LIST_LOADING,
    CHAT_LIST_SUCCESS,
    CHAT_LIST_FAILURE,
} from '../actions/constants';
import { SERVERURL } from '../../config';

export function chatInsertLOADING() {
    return {
        type: CHAT_INSERT_LOADING,
    };
}
export function chatInsertSUCCESS(payload) {
    return {
        type: CHAT_INSERT_SUCCESS,
        payload: payload
    };
}

export function chatInsertFAILURE(payload) {
    return {
        type: CHAT_INSERT_FAILURE,
        payload: payload
    };
}

export function chatInsert(chatdetails) {
    const data = chatdetails;
    return (dispatch) => {
        dispatch(chatInsertLOADING());
        axios({
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            url: `${SERVERURL}chatinsert`,
            crossDomain: true,
            data,
        }).then((res) => {
            if (res.status === 200) {
                dispatch(chatInsertSUCCESS(res.data));
            }
        }).catch((error) => {
            if (error.response) {
                dispatch(chatInsertFAILURE(error.response));
            }
        });
    };
}

export function chatListLOADING() {
    return {
        type: CHAT_LIST_LOADING,
    };
}
export function chatListSUCCESS(payload) {
    return {
        type: CHAT_LIST_SUCCESS,
        payload: payload
    };
}

export function chatListFAILURE(payload) {
    return {
        type: CHAT_LIST_FAILURE,
        payload: payload
    };
}

export function chatList(data) {
    return (dispatch) => {
        dispatch(chatListLOADING());
        axios({
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            url: `${SERVERURL}chatlist`,
            crossDomain: true,
            data,
        }).then((res) => {
            if (res.status === 200) {
                dispatch(chatListSUCCESS(res.data));
            }
        }).catch((error) => {
            if (error.response) {
                dispatch(chatListFAILURE(error.response));
            }
        });
    };
}