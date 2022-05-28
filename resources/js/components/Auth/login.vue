<template>
  <div class="row">
    <div class="col-md-6 offset-3  mt-5">
      <div class="card-box">
        <div class="header-title mb-4 text-center">Login</div>
        <div class="alert alert-danger" v-if="errors.message">
          {{ errors.message }}
        </div>
        <form action="" id="login" method="POSt" @submit="login">
          <div class="form-group">
            <label for="">Email</label>
            <input
              class="form-control"
              name="email"
              id="email"
              placeholder="Enter Email"
              v-model="email"
            />
            <div class="alert alert-danger" v-if="errors.email">{{ errors.email }}</div>
          </div>
          <div class="form-group">
            <label for="">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              name="password"
              placeholder="Enter Password"
              v-model="password"
            />
            <div class="alert alert-danger" v-if="errors.password">
              {{ errors.password }}
            </div>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary m-auto">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import UserService from "../../services/auth";
export default {
  data() {
    return {
      errors: {
        email: "",
        password: "",
        message: "",
      },
      email: null,
      password: null,
    };
  },
  mounted() {
      // if(localStorage.getItem('letscms_user_token')){
      //     this.$router.push({ path: "/admin/dashboard" });
      // }
      // alert('aaaaaa');
  },
  methods: {
    login(e) {
      e.preventDefault();
      this.errors = [];
      if (!this.email) {
        this.errors.email = "Email is Required";
      }
      if (!this.password) {
        this.errors.password = "Password is Required";
      }
      if (this.errors.length == 0) {
        var data = {
          email: this.email,
          password: this.password,
        };
        UserService.login(data)
          .then((response) => {
            if (!response.data.status) {
              if (response.data.message) {
                this.errors.message = response.data.message;
                const Toast = this.$swal.mixin({
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                    toast.addEventListener("mouseenter", this.$swal.stopTimer);
                    toast.addEventListener("mouseleave", this.$swal.resumeTimer);
                  },
                });
                Toast.fire({
                  icon: "error",
                  title: this.errors.message,
                });
              }
              if (response.data.errors.email) {
                this.errors.email = response.data.errors.email;
              }
              if (response.data.errors.password) {
                this.errors.password = response.data.errors.password;
              }
            } else {
                // console.log(response.data.data.user.is_admin);
              localStorage.setItem("letscms_user_token", response.data.data.token);
              if(response.data.data.user.is_admin===1){
                  localStorage.setItem("isAdmin", 1);
              } else if(response.data.data.user.is_admin===0){
                  localStorage.setItem("isAuth", 1);
              }
              localStorage.setItem("user",  JSON.stringify(response.data.data.user));

              this.$swal({
                position: "center",
                icon: "success",
                title: "You have Loged In Successfully",
                showConfirmButton: false,
                timer: 1000,
              });
             if(response.data.data.user.is_admin===1){
                 this.$router.push({ path: "/admin/dashboard/" });
              } else if(response.data.data.user.is_admin===0){
                  this.$router.push({ path: "/" });
              }

            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>
