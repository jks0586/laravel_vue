<template>
  <Frontheader />
  <div class="container mt-3">
    <div class="row" v-for="post in posts">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <h3>{{ post.name }}</h3>
            <div class="post-image"><img :src="post.imageurl"></div>
            <div class="post-description" v-html="post.description"></div>
            <div class="auth-section">
                    <img class="author-img" src=""/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Post from '../../services/post';
export default{
 name:"Home",
 data(){
     return {
         posts:[],
     }
 },
 mounted(){

    //  alert(localStorage.getItem('isAdmin'));

     Post.posts().then(response=>{
         console.log(response);
         if(response.status==200){
             this.posts=response.data.data;
         }
     }).catch(error=>{
         console.log('aaa');
     })
  },
}
</script>
