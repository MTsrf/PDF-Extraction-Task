import HttpPortalService from '../../axios.js'


export const fetchWrapper = {
    get,
    post,
};


function get(url) {

    return HttpPortalService.get(url).then(handleResponse);
}

function post(url, body) {
    return HttpPortalService.post(url, body).then(handleResponse);
}


function handleResponse(response) {

    if (response === undefined) {
        return null;
    }
    if (response.data.data === undefined) {
        ;
        return response.data;
    }
    else

        return response.data.data;
}


