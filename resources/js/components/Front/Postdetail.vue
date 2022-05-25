<template>
  <Frontheader />
  <div class="container mt-3">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <h3><a href="">{{ post.name }}</a></h3>
            <div class="row text-center post-image"><img :src="post.imageurl" /></div>
            <div class="post-description" v-html="post.description"></div>
            <!-- {{post.user}} -->
            <div class="auth-section"><Author :user="user"/></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.post-image img{margin:0px auto;}
</style>
<script>
import Post from "../../services/post";
import Author from "../common/Author.vue";
export default {
  name: "Postdetail",
  components: {
    Author,
  },
  data() {
    return {
      post: '',
      user:'',
    };
  },
  mounted() {

    Post.postdetail(this.$route.params.id)
      .then((response) => {
        // console.log(response);
        if (response.status == 200) {
          this.post = response.data.data.post;
          this.user = response.data.data.post.user;
        }
      })
      .catch((error) => {
        console.log("aaa");
      });
  },
};
</script>
