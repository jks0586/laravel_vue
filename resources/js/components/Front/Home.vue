<template>
  <Frontheader />
  <div class="container mt-3">
   <!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>


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
