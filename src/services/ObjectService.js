/**
 * Сервис для объекта, где определены http методы
 */

const webApiUrl = `http://96890a116fb0.sn.mynetname.net:8000/api/project`;

class ObjectService {

    get = async (urlParams) => {
        const options = {
            method: "GET",
        }
        const request = new Request(webApiUrl + "?" + urlParams, options);
        const response = await fetch(request);
        return response.json();
    }
    post = async (model) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        var options = {
            method: "POST",
            headers,
            body: JSON.stringify(model)
        }
        const request = new Request(webApiUrl, options);
        return await fetch(request);
    }
    put = async (id, model) => {
        const headers = new Headers()
        headers.append("Content-Type", "application/json");
        var options = {
            method: "PUT",
            headers,
            body: JSON.stringify(model)
        }
        const request = new Request(webApiUrl + "/" + id, options);
        return await fetch(request);
    }
    delete = async (id) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const options = {
            method: "DELETE",
            headers
        }
        const request = new Request(webApiUrl + "/" + id, options);
        return await fetch(request);
    }

}

export default new ObjectService()