import axios from 'axios'

const api = axios.create({
    baseURL: 'http://35.163.165.1:3000/'
})

const apis = {
    getShows: (date, callback) => api.get('?date=' + date)
        .then((response) => {
            callback(response.data.inventory)
        })
}

export default apis