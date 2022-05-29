<template>
    <Frontheader />
    <div class="content-page-front">
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <img class="card-img-top img-fluid" :src="avatarPreview" alt="Card image cap">
              <div class="card-body">
                  <h5 class="card-title"><strong>Name:</strong> {{name}} <span class="btn btn-primary float-right" v-on:click="editAccount">Edit Account</span></h5>
                  <h5 class="card-title"><strong>Email:</strong> {{email}}</h5>

                  <p class="card-text"><strong>About Me:</strong> <span v-html="about"></span></p>
              </div>
              <div class="card-body">
                  <a :href="github_url" class="card-link text-primary" target="_blank">{{github_name}}</a>
                  <a :href="twitter_url" class="card-link text-primary" target="_blank">{{twitter_name}}</a>
                  <a :href="linkedin_url" class="card-link text-primary"  target="_blank">{{linkedin_name}}</a>
              </div>
          </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import UserService from '../../../services/auth';
export default {
    name: "Account",
    data() {
    return {
      errors: {
        name: "",
        avatar: "",
        email:"",
        is_admin:"",

      },
      id: null,
      name: null,
      email: null,
      avatar: null,
      is_admin: null,
      avatarname: null,
      avatarPreview: null,
      editor: ClassicEditor,
      editorData: "<p>Content of the editor.</p>",
      editorConfig: {
        // The configuration of the editor.
      },
      about :null,
      github_name :null,
      github_url :null,
      twitter_name :null,
      twitter_url :null,
      linkedin_name :null,
      linkedin_url :null,
    };
  },

beforeCreate() {
    this.id = JSON.parse(localStorage.getItem('user')).id;
    UserService.get(this.id)
      .then((response) => {
          // console.log(response.data.data.user);
        if (response.data.status) {
          this.id = response.data.data.user.id;
          this.name = response.data.data.user.name;
          this.email= response.data.data.user.email;
          this.avatar= response.data.data.user.avatar;
          this.is_admin= response.data.data.user.is_admin;
          this.avatarPreview = response.data.data.user.avatarurl;
          this.about = response.data.data.user.about;
          this.github_name = response.data.data.user.github_name;
          this.github_url = response.data.data.user.github_url;
          this.twitter_name = response.data.data.user.twitter_name;
          this.twitter_url = response.data.data.user.twitter_url;
          this.linkedin_name = response.data.data.user.linkedin_name;
          this.linkedin_url = response.data.data.user.linkedin_url;
          // let imgset = document.getElementById("avatarPreview");
          // imgset.setAttribute("src", this.avatarPreview);
          // imgset.setAttribute("width", 50);
          // imgset.setAttribute("height", 50);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    editAccount(e){
      e.preventDefault();
      this.$router.push("/account/edit");
    },
    uploadImage(e) {
      e.preventDefault();
      this.avatar = e.target.files[0];
      this.previewFile(this.avatar);
    },
    previewFile(file) {
      const reader = new FileReader();
      reader.addEventListener("load",function () {
          this.avatarPreview = reader.result;
          let imgset = document.getElementById("avatarPreview");
          imgset.setAttribute("src", reader.result);
          imgset.setAttribute("width", 50);
          imgset.setAttribute("height", 50);
        },
        false
      );

      if (file) {
        reader.readAsDataURL(file);
      }
    },
    onSubmit(e) {
      e.preventDefault();
      this.errors = [];

      if (!this.name) {
        this.errors.name = "Name is Required.";
      }

      //   if (!this.image) {
      //     this.errors.image = "Image is Required.";
      //   }
      if (!this.email) {
        this.errors.email = "Email is Required.";
      }

      if (this.errors.length == 0) {
        const formData = new FormData();
        formData.append("id", this.id);
        formData.append("avatar", this.avatar);
        formData.append("name", this.name);
        formData.append("email", this.email);
        formData.append("is_admin", this.is_admin);
        formData.append("about", this.about);
        formData.append("github_name", this.github_name);
        formData.append("github_url", this.github_url);
        formData.append("twitter_name", this.twitter_name);
        formData.append("twitter_url", this.twitter_url);
        formData.append("linkedin_name", this.linkedin_name);
        formData.append("linkedin_url", this.linkedin_url);


        UserService.post(formData)
          .then((response) => {
            console.log(response);
            if (!response.data.status) {
              if (response.data.errors.name) {
                this.errors.name = response.data.errors.name;
              }

              if (response.data.errors.email) {
                this.errors.emai = response.data.errors.email;
              }

              if (response.data.errors.avatar) {
                this.errors.avatar = response.data.errors.avatar;
              }

            } else {
              this.$swal({
                position: "center",
                icon: "success",
                title: "User has been updated Successfully",
                showConfirmButton: false,
                timer: 1500,
              });

              this.$router.push("/account");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
}
</script>
