import axios from 'axios'
import join from 'url-join'

const NETWORK_CONNECTION_MESSAGE = 'Cannot connect to server, Please try again.'
const NOT_CONNECT_NETWORK = 'NOT_CONNECT_NETWORK'
const isAbsoluteURLRegex = /^(?:\w+:)\/\//

const apiUrl = 'https://api.iaaaiksu.com/api'
// const apiUrl = 'http://localhost:3000/api'

axios.defaults.withCredentials = true
axios.interceptors.request.use(async (config: any) => {
    if (!isAbsoluteURLRegex.test(config.url)) {
        config.url = join(apiUrl, config.url)
    }
    config.timeout = 10000
    return config
})
axios.interceptors.request.use(
    (res) => {
        return res
    },
    (error) => {
        if (axios.isCancel(error)) {
            return Promise.reject(error)
        } else if (!error.res) {
            return Promise.reject({
                code: NOT_CONNECT_NETWORK,
                message: NETWORK_CONNECTION_MESSAGE,
            })
        }
        return Promise.reject(error)
    }
)

export const httpClient = axios
