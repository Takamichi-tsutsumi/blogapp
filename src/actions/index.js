import axios from 'axios';

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_A_POST = 'FETCH_A_POSTS';
export const CREATE_POST = 'CREATE_POSTS';
export const DELETE_POST = 'DELETE_POST';

const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=takaaasaaaas';

export function fetchPosts() {
    "use strict";
    const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);

    return {
        type: FETCH_POSTS,
        payload: request
    };
}

export function fetchAPost(id) {
    "use strict";
    const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);

    return {
        type: FETCH_A_POST,
        payload: request
    }
}

export function createPost(props) {
    "use strict";
    const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, props);

    return {
        type: CREATE_POST,
        payload: request
    }
}

export function deletePost(id) {
    "use strict";
    const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`);

    return {
        type: DELETE_POST,
        payload: request
    };
}