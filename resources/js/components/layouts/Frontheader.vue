<template>
    <header>
        <nav class=" navbar-light bg-light">
        <div class="container navbar navbar-expand-lg">
        <div class="container-fluid">
            <a class="navbar-brand" href="#"><img src="/assets/admin/images/askjitendra_logo.png" width="50"></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">About Me</a>
                </li>
                <li class="nav-item" v-for="item in categories">
                    <a class="nav-link" :href='`${item.name}`'>{{ item.name }}</a>
                </li>
                
            </ul>
            <form class="d-flex">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
            </div>
        </div>
        </div>
        </nav>
</header>
</template>

<script>
import CategoryService from '../../services/category';

export default {
  name: "Frontheader",
  data(){
      return {
          categories:[],
      };
  },
  setup() {

  },
  mounted(){
        CategoryService.list().then(response=>{
            if(response.status===200){
                    this.categories=response.data;
            }
        }).catch(error=>{
            console.log(error);
        });
  },
};
</script>
