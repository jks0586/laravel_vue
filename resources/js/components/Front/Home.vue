<template>
  <Frontheader />
  <div class="container mt-3">

    <div class="row" v-for="post in posts" :key="post.id">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <h3>
              <a :href='`/post/${post.id}/${post.name.toLowerCase()}`'>{{ post.name }}</a>
            </h3>
            <!-- <div class="post-image"><img :src="post.imageurl"></div> -->
            <div class="post-description" v-html="post.short_description"></div>
            <div class="auth-section">
              <Author :user="post.user" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Post from "../../services/post";
import Author from "../common/Author.vue";
export default {
  name: "Home",
  components: {
    Author,
  },
  data() {
    return {
      posts: [],
    };
  },
  methods:{
   
  },
  beforeCreate(){
    //   alert('yuyuyu');
  },
  beforeMount(){
    //   alert('hhhhj');
  },
  mounted() {
    //  alert(localStorage.getItem('isAdmin'));
    
    Post.posts()
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          this.posts = response.data.data;
        }
      })
      .catch((error) => {
        console.log("aaa");
      });
    // document.getElementById('login-modal').style.display='block';
  },
};
</script>
