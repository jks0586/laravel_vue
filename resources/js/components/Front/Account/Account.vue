<template>
    <Frontheader />
    <div class="content-page-front">
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="card-box">
              <div class="header-title mb-4 text-left">edit User</div>
              <form @submit="onSubmit" action="" id="register" method="POST">
                <div class="form-group">
                  <label for="">Name</label>
                  <input
                    class="form-control"
                    name="name"
                    id="name"
                    placeholder="Enter Name"
                    v-model="name"
                  />
                  <div class="alert alert-danger" v-if="errors.name">
                    {{ errors.name }}
                  </div>
                  <!-- <div class="alert alert-danger"></div> -->
                </div>

                <div class="form-group">
                  <label for="">Email</label>
                  <input
                    class="form-control"
                    name="email"
                    id="email"
                    placeholder="Enter Email"
                    v-model="email"
                  />
                  <div class="alert alert-danger" v-if="errors.email">
                    {{ errors.email }}
                  </div>
                  <!-- <div class="alert alert-danger"></div> -->
                </div>

                <div class="form-group">
                  <label>User Avatar </label>
                  <input
                    type="file"
                    class="form-control"
                    name="avatar"
                    id="avatar"
                    @change="uploadImage"
                    placeholder="Choose File"
                  />
                  <img id="avatarPreview" width="" height="" src="" />
                  <div class="alert alert-danger" v-if="errors.avatar">
                    {{ errors.avatar }}
                  </div>
                </div>
                <div class="form-group">
                  <label for="">About Me</label>
                  <ckeditor
                    :editor="editor"
                    name="about"
                    id="about"
                    v-model="about"
                  ></ckeditor>

                  <div class="alert alert-danger" v-if="errors.about">
                    {{ errors.about }}
                  </div>
                </div>
                <div class="form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    name="is_admin"
                    id="is_admin"
                    v-model="is_admin"
                    true-value="1"
                    false-value="0"
                  />
                  <label class="form-check-label" for="top">Is Admin</label>
                </div>

                <div class="clear-fix"></div>
                <div class="form-group">
                  <label for="">GitHub Name</label>
                  <input
                    class="form-control"
                    name="github_name"
                    id="github_name"
                    placeholder="Github Name"
                    v-model="github_name"
                  />
                  <div class="alert alert-danger" v-if="errors.github_name">
                    {{ errors.github_name }}
                  </div>
                </div>
                <div class="form-group">
                  <label for="">GitHub Url</label>
                  <input
                    class="form-control"
                    name="github_url"
                    id="github_url"
                    placeholder="Github Url"
                    v-model="github_url"
                  />
                  <div class="alert alert-danger" v-if="errors.github_url">
                    {{ errors.github_url }}
                  </div>
                </div>

                <div class="form-group">
                  <label for="">Twitter Name</label>
                  <input
                    class="form-control"
                    name="twitter_name"
                    id="twitter_name"
                    placeholder="Twitter Name"
                    v-model="twitter_name"
                  />
                  <div class="alert alert-danger" v-if="errors.twitter_name">
                    {{ errors.twitter_name }}
                  </div>
                </div>
                <div class="form-group">
                  <label for="">Twitter Url</label>
                  <input
                    class="form-control"
                    name="twitter_url"
                    id="twitter_url"
                    placeholder="Twitter Url"
                    v-model="twitter_url"
                  />
                  <div class="alert alert-danger" v-if="errors.twitter_url">
                    {{ errors.twitter_url }}
                  </div>
                </div>


                <div class="form-group">
                  <label for="">Linkedin  Name</label>
                  <input
                    class="form-control"
                    name="linkedin_name"
                    id="linkedin_name"
                    placeholder="linkedin  Name"
                    v-model="linkedin_name"
                  />
                  <div class="alert alert-danger" v-if="errors.linkedin_name">
                    {{ errors.linkedin_name }}
                  </div>
                </div>
                <div class="form-group">
                  <label for="">linkedin Url</label>
                  <input
                    class="form-control"
                    name="linkedin_url"
                    id="linkedinin_url"
                    placeholder="linkedinin Url"
                    v-model="linkedin_url"
                  />
                  <div class="alert alert-danger" v-if="errors.linkedin_url">
                    {{ errors.linkedin_url }}
                  </div>
                </div>

                <div class="form-group">
                  <button type="submit" class="btn btn-primary m-auto">Update</button>
                </div>
              </form>
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
        //   console.log(response.data.data.user);
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
          let imgset = document.getElementById("avatarPreview");
          imgset.setAttribute("src", this.avatarPreview);
          imgset.setAttribute("width", 50);
          imgset.setAttribute("height", 50);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
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
