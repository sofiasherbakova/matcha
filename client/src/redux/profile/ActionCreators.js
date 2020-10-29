import * as ActionTypes from './ActionTypes';
import { request } from '../../util/http';

export const profileLoading = () => ({
    type: ActionTypes.PROFILE_LOADING
});

export const profileAdd = (info) => ({
    type: ActionTypes.PROFILE_ADD,
    payload: info.result
});

export const profileFailed = (msg) => ({
    type: ActionTypes.PROFILE_FAILED,
    payload: msg
});

export const fetchProfile = (nickname) => (dispatch) => {
    dispatch(profileLoading());

    return request('/api/user/' + nickname)
        .then(response => response.json())
        .then(result => dispatch(profileAdd(result)))
        .catch(error => dispatch(profileFailed(error.message)));
};

export const viewAdd = (views) => ({
    type: ActionTypes.VIEW_ADD,
    payload: views.result
});

export const viewFailed = (msg) => ({
    type: ActionTypes.VIEW_FAILED,
    payload: msg
});

export const fetchView = (nickname) => (dispatch) => {
    dispatch(profileLoading());

    return request('/api/user/views/' + nickname)
        .then(response => response.json())
        .then(result => dispatch(viewAdd(result)))
        .catch(error => dispatch(viewFailed(error.message)));
};

export const likeAdd = (likes) => ({
    type: ActionTypes.LIKE_ADD,
    payload: likes.result
});

export const likeFailed = (msg) => ({
    type: ActionTypes.LIKE_FAILED,
    payload: msg
});

export const fetchLike = (nickname) => (dispatch) => {
    dispatch(profileLoading());

    return request('/api/user/likes/' + nickname)
        .then(response => response.json())
        .then(result => dispatch(likeAdd(result)))
        .catch(error => dispatch(likeFailed(error.message)));
};

export const statusAdd = (status) => ({
    type: ActionTypes.STATUS_ADD,
    payload: status.result
});

export const statusFailed = (msg) => ({
    type: ActionTypes.STATUS_FAILED,
    payload: msg
});

export const fetchStatus = (me, you) => (dispatch) => {
    dispatch(profileLoading());

    const data = {
        me: me,
        you: you
    }

    return request('/api/user/status', data, 'POST')
        .then(response => response.json())
        .then(result => dispatch(statusAdd(result)))
        .catch(error => dispatch(statusFailed(error.message)));
};

export const fetchReport = (data) => () => {
    console.log("DATA - ", data);
    return request('/api/user/report', data, 'POST')
        .then(response => response.json())
        //.catch(error => dispatch(reportFailed(error.message)));
};

export const fetchUpdateStatus = (me, you, status, newStatus) => (dispatch) => {
    dispatch(profileLoading());

    const data = {
        me: me,
        you: you,
        status: status,
        newStatus: newStatus
    }

    return request('/api/user/update', data, 'POST')
        .then(response => response.json())
        // .then(result => dispatch(statusAdd(result)))
        .then(result => {
            if (result.message === 'Ok') {
                dispatch(statusAdd(result));
            }
            else {
                dispatch(statusFailed(result.message));
            }
        })
        .catch(error => dispatch(statusFailed(error.message)));
};

export const updateViewFailed = (msg) => ({
    type: ActionTypes.UPDATE_VIEW_FAILED,
    payload: msg
});

export const fetchUpdateView = (me, you) => (dispatch) => {
    dispatch(profileLoading());

    const data = {
        me: me,
        you: you
    }

    return request('/api/user/view', data, 'POST')
        .then(response => response.json())
        .catch(error => dispatch(updateViewFailed(error.message)));
};