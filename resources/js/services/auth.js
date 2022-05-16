import http from './../http-common'
class UserService {
    register (data) {
        return http.post('/register', data)
    }
    login (data) {
        return http.post('/login', data)
    }
    index(url){
        // alert('aaaaa');
        return http.get(url);
    }
    get(id){
        return http.get('/user/'+id);
    }
    post(data){
        return http.post('/user',data);
    }
    delete(id){
        return http.delete('/user/'+id);
    }
}

export default new UserService();
