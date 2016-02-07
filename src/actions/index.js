import axios from 'axios';

export const FETCH_POSTS = 'FETCH_POSTS';
export const CREATE_POST = 'CREATE_POSTS';

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

export function createPost(props) {
    "use strict";
    const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, props);

    return {
        type: CREATE_POST,
        payload: request
    }
}