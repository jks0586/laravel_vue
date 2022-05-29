<template>
<div class="row">
    <div class="col-md-12">
        <button class="btn btn-primary" v-on:click="commentPost">Post Comment</button>
        <div class="row" v-if="showcommentBox">
            <form name="comment" id="comment" ref="comment" type="post" @submit="commentSubmit">
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
import {Modal} from 'bootstrap';
export default{
    name: "Comment",
    data(){
        return {
            errors: {
                commentbody:'',
            },
            loginM:null,
            showcommentBox:false,
            editor: ClassicEditor,
            editorData: "<p>Content of the editor.</p>",
            editorConfig: {
            },
            commentbody:'',
            user:'',
        }
            
    },
    methods:{
        commentSubmit(e){
            e.preventDefault();
            this.errors = [];

            if (!this.commentbody) {
                this.errors.commentbody = "Please fill in comment box";
            }
            if (this.errors.length == 0) {
                   const formData = new FormData();
                   formData.append("comment", this.commentBody); 
                   formData.append("post_id", this.$route.params.id); 
                   formData.append("user_id", this.user.id); 
                   
            }
            // console.log(this.commentbody);
        },
        commentPost(){
            if(localStorage.getItem('isAuth')==null){
                this.loginM = new Modal(document.getElementById('loginModal'));
                this.loginM.show();
            } else {
                this.showcommentBox=true;
            }
        }
    },
    mounted(){
        if (localStorage.getItem("user")) {
            this.user = JSON.parse(localStorage.getItem("user"));
        }
        // alert(this.$route.params.id);

    }
}
</script>