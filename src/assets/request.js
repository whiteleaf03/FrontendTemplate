import axios from "axios";
import { ElMessage } from "element-plus";
import { getCookie } from "./utils.js";
import { router } from "./router.js";

async function sentRequest(method, url, params, data) {
    let response
    await axios({
        url: url,
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'token': getCookie('token')
        },
        params: method === 'GET' ? params : undefined,
        data: method !== 'GET' ? JSON.stringify(data) : undefined
    }).then((res) => {
        response = res.data
    })
    if (response.msg === 'token已过期') {
        // token过期
        router.push('/login')
        ElMessage.error(response.msg)
        return
    }
    return response
}

export async function getRequest(url, params) {
    return await sentRequest('GET', url, params, null)
}

export async function postRequest(url, data) {
    return await sentRequest('POST', url, null, data)
}

export async function putRequest(url, data) {
    return await sentRequest('PUT', url, null, data)
}

export async function deleteRequest(url, data) {
    return await sentRequest('DELETE', url, null, data)
}