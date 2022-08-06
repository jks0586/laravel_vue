import http from './../http-common'
class FrontService {
    createComment (data) {
        const headers = { 'Content-Type': 'multipart/form-data' }
        return http.post('/comment', data, { headers })
    }
    listComment (data) {
        const headers = { 'Content-Type': 'multipart/form-data' }
        return http.get('/comment', data, { headers })
    }
}
export default new FrontService()
