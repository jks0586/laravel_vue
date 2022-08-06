<template>
  <div class="row">
    <div class="col-md-12" v-if="comments">
      <div class="label">Comments</div>
      <div class="">
        <li v-for="(comment, key) in comments" :key="key">
          {{ comment.commentbody }} {{ comment.user.email }}
        </li>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-md-12">
      <button class="btn btn-primary" v-on:click="commentPost">Post Comment</button>
      <div class="row" v-if="showcommentBox">
        <form
          name="comment"
          id="comment"
          ref="comment"
          type="post"
          @submit="commentSubmit"
        >
          <div class="form-group">
            <label for="">Reply Comment</label>
            <ckeditor
              :editor="editor"
              name="commentbody"
              id="commentbody"
              v-model="commentbody"
            ></ckeditor>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary m-auto">Post</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Modal } from "bootstrap";
import FrontService from "../../../services/front";
export default {
  name: "Comment",
  data() {
    return {
      errors: {
        commentbody: "",
      },
      loginM: null,
      showcommentBox: false,
      editor: ClassicEditor,
      editorData: "<p>Content of the editor.</p>",
      editorConfig: {},
      commentbody: "",
      user: "",
      comments: [],
    };
  },
  methods: {
    commentSubmit(e) {
      e.preventDefault();
      this.errors = [];
      //   alert(this.commentbody);
      if (!this.commentbody) {
        this.errors.commentbody = "Please fill in comment box";
      }

      //   console.log(this.errors.length);

      if (this.errors.length == 0) {
        const formData = new FormData();
        formData.append("commentbody", this.commentbody);
        formData.append("post_id", this.$route.params.id);
        formData.append("user_id", this.user.id);
        formData.append("status", 0);
        console.log(formData);
        FrontService.createComment(formData)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      //   console.log(formData);
      // console.log(this.commentbody);
    },
    commentPost() {
      if (localStorage.getItem("isAuth") == null) {
        this.loginM = new Modal(document.getElementById("loginModal"));
        this.loginM.show();
      } else {
        this.showcommentBox = true;
      }
    },
  },
  mounted() {
    if (localStorage.getItem("user")) {
      this.user = JSON.parse(localStorage.getItem("user"));
    }
    const formData = new FormData();
    formData.append("post_id", this.$route.params.id);
    formData.append("user_id", this.user.id);
    formData.append("status", 0);
    FrontService.listComment()
      .then((response) => {
        console.log(response.data.data);
        this.comments = response.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
    // alert(this.$route.params.id);
  },
};
</script>
