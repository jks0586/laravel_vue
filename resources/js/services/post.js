import http from './../http-common'

class PostService{

    create(data){
        const headers = { 'Content-Type': 'multipart/form-data' };
        return http.post('/post',data,{headers});
    }
    index(url){
        return http.get(url);
    }
    get(id){
        return http.get('/post/'+id);
    }
    update(data){
        return http.post('/post/postupdate',data);
    }

    delete(id){
        return http.delete('/post/'+id);
    }

}

export default new PostService();
