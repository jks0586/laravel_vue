import http from './../http-common'

class CategoryService{

    list(){
        return http.get('/category-list');
    }

    create(data){
        const headers = { 'Content-Type': 'multipart/form-data' };
        return http.post('/category',data,{headers});
    }
    index(url){
        return http.get(url);
    }
    get(id){
        return http.get('/category/'+id);
    }
    update(data){
        // console.log(data);
        // return data;
        // const headers = { 'Content-Type': 'multipart/form-data' };
        return http.post('/category/categoryupdate',data);
    }

    delete(id){
        return http.delete('/category/'+id);
    }

}

export default new CategoryService();
