<template>
  <header>
    <nav class="navbar-light bg-light">
      <div class="container navbar navbar-expand-lg">
        <div class="container-fluid">
          <a class="navbar-brand" href="#"
            ><img src="/assets/admin/images/askjitendra_logo.png" width="50"
          /></a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">About Me</a>
              </li>
              <li class="nav-item" v-for="item in categories" :key="item.id">
                <a class="nav-link" :href="`${item.name}`">{{ item.name }}</a>
              </li>

              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="myaccount"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  >My Account</a
                >
                <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="myaccount">
                  <li class="nav-item" v-if="!isAuth">
                    <a class="nav-link" href="/login">Login</a>
                  </li>
                  <li class="nav-item" v-if="!isAuth">
                    <a class="nav-link" href="/register">Register</a>
                  </li>
                  <li class="nav-item" v-if="isAuth">
                    <a class="nav-link" href="/account">My Account ( {{ user.name }})</a>
                  </li>
                  <li class="nav-item" v-if="isAuth">
                    <a class="nav-link" href="#" v-on:click="logout">Logout</a>
                  </li>
                </ul>
              </li>
            </ul>
            <form class="d-flex">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </div>
    </nav>
    <b-modal
      id="login-modal"
      noFade
      :show="true"
      :centered="true"
      :scrollable="true"
      title="Login"
      titleTag="h3"
      size="lg"
      :hideOk="true"
    >
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
    </b-modal>
  </header>
</template>

<script>
import CategoryService from "../../services/category";
import UserService from "../../services/auth";

export default {
  name: "Frontheader",
  data() {
    return {
      categories: [],
      errors: {
        email: "",
        password: "",
        message: "",
      },
      email: null,
      password: null,
      isAuth: null,
      user: null,
    };
  },
  setup() {},
  mounted() {
    if (localStorage.getItem("isAuth")) {
      this.isAuth = 1;
    }

    if (localStorage.getItem("user")) {
      this.user = JSON.parse(localStorage.getItem("user"));
    }
    CategoryService.list()
      .then((response) => {
        if (response.status === 200) {
          this.categories = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({ path: "/login" });
    },

    loginPopup() {
      document.getElementById("login-modal").style.display = "block";
    },
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
              if (response.data.data.user.is_admin === 1) {
                localStorage.setItem("isAdmin", response.data.data.user.is_admin);
              }
              localStorage.setItem("user", response.data.data.user);

              this.$swal({
                position: "center",
                icon: "success",
                title: "You have Loged In Successfully",
                showConfirmButton: false,
                timer: 15000,
              });

              this.$router.push({ path: "/admin/dashboard/" });
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
