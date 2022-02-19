import axios from "axios";

export const getAPI = async(url: string, token?: string) => {
    const res = await axios.get(`/api/${url}`, {
        headers: { Authorization: (token as string)}
    })

    return res
}

export const postAPI = async(url: string, data?: object, token?: string) => {
    const res = await axios.post(`/api/${url}`, data, {
        headers: { Authorization: (token as string)}
    })

    return res
}

export const patchAPI = async(url: string, data: object, token?: string) => {
    const res = await axios.patch(`/api/${url}`, data, {
        headers: { Authorization: (token as string)}
    })

    return res
}

export const putAPI = async(url: string, data: object, token?: string) => {
    const res = await axios.put(`/api/${url}`, data, {
        headers: { Authorization: (token as string)}
    })

    return res
}

export const deleteAPI = async(url: string, token?: string) => {
    const res = await axios.delete(`/api/${url}`, {
        headers: { Authorization: (token as string)}
    })

    return res
}

