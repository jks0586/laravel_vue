<template>
  <div class="row">
    <div class="col-md-6 offset-3">
      <div class="card-box">
        <div class="header-title mb-4 text-center">Register</div>
        <form @submit="register" action="" id="register" method="POST">
          <div class="form-group">
            <label for="">Name</label>
            <input class="form-control" name="name" id="email" placeholder="Enter Name" v-model="name" />
            <div class="alert alert-danger" v-if="errors.name">{{errors.name}}</div>
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
            <div class="alert alert-danger" v-if="errors.email">{{errors.email}}</div>
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
            <div class="alert alert-danger" v-if="errors.password">{{errors.password}}</div>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary m-auto">Register</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import UserService from '../../services/auth';
export default {
  name: "Register",
  data() {
    return {
      errors: {
          name:'',
          email:'',
          password:'',
      },
      id: null,
      name: null,
      email: null,
      password: null,
      submitted: false,
    };
  },
  methods: {
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
                timer: 15000
                });
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
  },
};
</script>
