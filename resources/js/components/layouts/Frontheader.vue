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
                <a class="nav-link" :href="`/category/${item.id}/${item.name}`">{{ item.name }}</a>
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
                    <a class="nav-link" href="#"  data-bs-toggle="modal" data-bs-target="#loginModal">Login</a>
                  </li>
                  <li class="nav-item" v-if="!isAuth">
                    <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#registerModal">Register</a>
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
<div class="modal fade" id="loginModal" ref="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="loginModalLabel">Login User</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
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
</div>

<div class="modal fade" id="registerModal" ref="registerModal" tabindex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="registerModalLabel">Register User</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="alert alert-danger" v-if="errors.message">
        {{ errors.message }}
      </div>
      <form @submit="register" action="" id="register" method="POST">
          <div class="form-group">
            <label for="">Name</label>
            <input class="form-control" name="name" id="register-name" placeholder="Enter Name" v-model="name" />
            <div class="alert alert-danger" v-if="errors.name">{{errors.name}}</div>
          </div>
          <div class="form-group">
            <label for="">Email</label>
            <input
              class="form-control"
              name="email"
              id="register-email"
              placeholder="Enter Email"
              v-model="email"
            />
            <div class="alert alert-danger" v-if="errors.email">{{errors.email}}</div>
          </div>
          <div class="form-group">
            <label for="">Password</label>
            <input
              type="password"
              class="form-control"
              id="register-password"
              name="password"
              placeholder="Enter Password"
              v-model="password"
            />
            <div class="alert alert-danger" v-if="errors.password">{{errors.password}}</div>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary m-auto">Register</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
    
  </header>
</template>

<script>
import CategoryService from "../../services/category";
import UserService from "../../services/auth";
import {Modal} from "bootstrap";
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
      name:null,
      email: null,
      password: null,
      isAuth: null,
      user: null,
      loginM:null,
      registerM:null,
    };
  },
  setup() {},
  mounted() {
    this.loginM = new Modal(this.$refs.loginModal);
    this.registerM = new Modal(this.$refs.registerModal);
    
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
      this.$swal({
        position: "center",
        icon: "success",
        title: "You have Loged Out Successfully",
        showConfirmButton: false,
        timer: 1000,
        })
      this.$router.push({ path: "/login" });
    },
    register(e) {
      this.errors = [];
      if (!this.name) {
        this.errors.name="Name is Required.";
      }
      if (!this.email) {
        this.errors.email="Email is required.";
      } else if (!this.validEmail(this.email)) {
        this.errors.email="Email is Invalid";
      }

      if (!this.password) {
        this.errors.password="password is required";
      }
      if (this.errors.length == 0) {

        var data={
            name:this.name,
            email:this.email,
            password: this.password,
        }

        UserService.register(data).then(response=>{
            if(!response.data.status){
                if(response.data.errors.email){
                    this.errors.email=response.data.errors.email;
                }
                if(response.data.errors.name){
                    this.errors.name=response.data.errors.name;
                }
                if(response.data.errors.name){
                    this.errors.password=response.data.errors.password;
                }
                console.log(response.data.errors);
            } else {
                this.$swal({
                position: 'center',
                icon: 'success',
                title: 'You have Register Successfully',
                showConfirmButton: false,
                timer: 1000
                });
                this.registerM.hide();
                this.loginM.show();
                // this.$router.push({ path: "/login" });
            }
        }).catch(e=>{
            console.log(e);
        });
      }
      e.preventDefault();
    },
    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
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
                  timer: 1000,
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
              console.log(response.data.data);
              localStorage.setItem("letscms_user_token", response.data.data.token);
              if (response.data.data.user.is_admin === 1) {
                localStorage.setItem("isAdmin", response.data.data.user.is_admin);
              } else if(response.data.data.user.is_admin === 0){
                  localStorage.setItem("isAuth", 1);
              }
            localStorage.setItem("user",  JSON.stringify(response.data.data.user));
              this.$swal({
                position: "center",
                icon: "success",
                title: "You have Loged In Successfully",
                showConfirmButton: false,
                timer: 1000,
              }).then((response)=>{
                 this.$router.go(this.$router.currentRoute)
              });

              
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
