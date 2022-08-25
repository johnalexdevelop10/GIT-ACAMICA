const apiSearch = 'pEo6WXMy7qnbv6QjNIWmRF2ghCLUvM4L';
const baseApi = 'https://api.giphy.com/v1/gifs/';
const uploadGif = 'https://upload.giphy.com/v1/';

/*Get Info Api */
const getIfoApi = async (url) => {
    try {
        let response = await fetch(url);
        response = await response.json();
        return response;
    } catch (e) {
        console.log(e);
    }
}
/*Get Info Api */