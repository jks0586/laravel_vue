import http from './../http-common'

class PostService {
    create (data) {
        const headers = { 'Content-Type': 'multipart/form-data' }
        return http.post('/post', data, { headers })
    }
    index (url) {
        return http.get(url)
    }
    posts (cat_id) {
        let data = { cat_id: cat_id }
        // console.log(data);
        return http.post('/posts', data)
    }
    frontposts () {
        return http.get('/front/posts')
    }
    get (id) {
        return http.get('/post/' + id)
    }
    postdetail (id) {
        return http.get('/post-detail/' + id)
    }
    update (data) {
        return http.post('/post/postupdate', data)
    }
    delete (id) {
        return http.delete('/post/' + id)
    }
}

export default new PostService()
