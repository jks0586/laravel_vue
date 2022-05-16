<template>
  <admin-sidebar></admin-sidebar>
  <div class="content-page">
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="card-box">
              <div class="header-title mb-4 text-left">Create Post</div>
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

                <div class="form-group">
                  <label>Password </label>
                  <input
                    type="text"
                    class="form-control"
                    name="password"
                    id="password"
                    v-model="password"
                    placeholder="Password"
                  />

                  <div class="alert alert-danger" v-if="errors.password">
                    {{ errors.password }}
                  </div>
                </div>

                <div class="form-group">
                  <button type="submit" class="btn btn-primary m-auto">Save</button>
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
// import PostService from "../../../services/post";
// import CategoryService from "../../../services/category";
import UserService from "../../../services/auth";
export default {
  name: "UserAdd",

  data() {
    return {
      errors: {
        name: "",
        avatar: "",
        email: "",
        password: "",
        is_admin: "",
      },
      id: null,
      name: null,
      avatar: null,
      email: null,
      password: null,
      is_admin: null,
    };
  },
  created() {},
  methods: {
    uploadImage(e) {
      e.preventDefault();
      this.avatar = e.target.files[0];
      this.previewFile(this.avatar);
    },
    previewFile(file) {
      const reader = new FileReader();
      // const preview=document.getElementById('imagePreview');
      reader.addEventListener(
        "load",
        function () {
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

      if (!this.password) {
        this.errors.password = "password is Required.";
      }

      if (this.errors.length == 0) {
        const formData = new FormData();
        formData.append("avatar", this.avatar);
        formData.append("name", this.name);
        formData.append("email", this.email);
        formData.append("avatar", this.avatar);
        formData.append("is_admin", this.is_admin);
        formData.append("password", this.password);

        UserService.post(formData)
          .then((response) => {
            console.log(response);
            if (!response.data.status) {
              if (response.data.errors.name) {
                this.errors.name = response.data.errors.name;
              }
              if (response.data.errors.email) {
                this.errors.email = response.data.errors.email;
              }
              if (response.data.errors.password) {
                this.errors.password = response.data.errors.password;
              }
            } else {
              this.$swal({
                position: "center",
                icon: "success",
                title: "user has been created Successfully",
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
