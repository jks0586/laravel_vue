<template>
  <!-- ========== Left Sidebar Start ========== -->
  <div class="left-side-menu">
    <div class="slimscroll-menu">
      <!-- LOGO -->
      <div class="logo-box">
        <router-link to="/admin/dashboard" class="logo">
          <span class="logo-lg">
            <img src="/assets/images/logo-light.png" alt="" height="22" />
            <!-- <span class="logo-lg-text-light">Highdmin</span> -->
          </span>
          <span class="logo-sm">
            <!-- <span class="logo-sm-text-dark">H</span> -->
            <img src="/assets/images/logo-sm.png" alt="" height="24" />
          </span>
        </router-link>
      </div>

      <!-- User box -->
      <div class="user-box">
        <img
          src="/assets/images/askjitendra_logo.png"
          alt="user-img"
          title="Jitendra Sharma"
          class="rounded-circle img-thumbnail avatar-md"
        />
        <div class="dropdown">
          <router-link to="/admin/dashboard">
            <span> Jitendra Sharma </span>
          </router-link>
        </div>
      </div>

      <!--- Sidemenu -->
      <div id="sidebar-menu">
        <ul class="metismenu" id="side-menu">
          <li>
            <router-link to="/admin/dashboard">
              <i class="fe-airplay"></i>
              <span class="badge badge-danger float-right">0</span>
              <span> Dashboard </span>
            </router-link>
          </li>
          <li>
            <router-link to="/admin/category">
              <i class="fe-layers"></i>
              <span> Category </span>
            </router-link>
          </li>

          <li>
            <router-link to="/admin/post">
              <i class="fe-layers"></i>
              <span> Post </span>
            </router-link>
          </li>

          <li>
            <router-link to="/admin/users">
              <i class="fe-users"></i>
              <span> Users </span>
            </router-link>
          </li>

           <li>
            <router-link to="#" v-on:click="logout">
              <i class="fe-users"></i>
              <span> Logout </span>
            </router-link>
          </li>
        </ul>
      </div>
      <!-- End Sidebar -->

      <div class="clearfix"></div>
    </div>
    <!-- Sidebar -left -->
  </div>
  <!-- Left Sidebar End -->
</template>
<script>
export default {
  name: "AdminSidebar",
  setup() {},
  methods:{
      logout(){
          localStorage.clear();
          this.$route.push('/login');
      }
  }
};
</script>
