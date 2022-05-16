<template>
  <admin-sidebar></admin-sidebar>
  <div class="content-page">
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

import UserService from "../../../services/auth";
export default {
  name: "UserEdit",
  beforeCreate() {
    this.id = this.$route.params.id;
    
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
    };
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

              this.$router.push("/admin/users");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>
