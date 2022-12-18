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
                  <label>Image </label>
                  <input
                    type="file"
                    class="form-control"
                    name="image"
                    id="image"
                    @change="uploadImage"
                    placeholder="Choose File"
                  />
                  <img id="imagePreview" width="" height="" src="" />
                  <div class="alert alert-danger" v-if="errors.image">
                    {{ errors.image }}
                  </div>
                </div>
                <div class="form-group">
                  <label for="">Description</label>
                  <ckeditor
                    :editor="editor"
                    name="description"
                    id="description"
                    v-model="description"
                  ></ckeditor>

                  <div class="alert alert-danger" v-if="errors.description">
                    {{ errors.description }}
                  </div>
                </div>
                <div class="form-group">
                  <label for="">Short Description</label>
                  <ckeditor
                    :editor="editor"
                    name="short_description"
                    id="short_description"
                    v-model="short_description"
                  ></ckeditor>

                  <div class="alert alert-danger" v-if="errors.short_description">
                    {{ errors.short_description }}
                  </div>
                </div>
                <div class="form-group">
                  <label>Category</label>
                  <select
                    class="form-control"
                    name="category_id"
                    id="category_id"
                    @change="selectCategory"
                    placeholder="--Choose Category --"
                  >
                  <option value='0'>-- Choose Category --</option>
                  <option v-for="cat in this.categories" :key="cat" :value="cat.id">{{ cat.value }}</option>
                  </select>
                  <div class="alert alert-danger" v-if="errors.categories">
                    {{ errors.categories }}
                  </div>
                </div>
                <div class="form-group">
                  <label>Meta Title </label>
                  <input
                    type="text"
                    class="form-control"
                    name="meta_title"
                    id="meta_title"
                    v-model="meta_title"
                    placeholder="Enter Meta Title"
                  />
                  <div class="alert alert-danger" v-if="errors.meta_title">
                    {{ errors.meta_title }}
                  </div>
                </div>

                <div class="form-group">
                  <label>Meta Description </label>
                  <input
                    type="text"
                    class="form-control"
                    name="meta_description"
                    id="meta_description"
                    v-model="meta_description"
                    placeholder="Enter Meta Description"
                  />
                  <div class="alert alert-danger" v-if="errors.meta_description">
                    {{ errors.meta_description }}
                  </div>
                </div>

                <div class="form-group">
                  <label>Meta Keywords </label>
                  <input
                    type="text"
                    class="form-control"
                    name="meta_keywords"
                    id="meta_keywords"
                    v-model="meta_keywords"
                    placeholder="Enter Meta Keywords"
                  />
                  <div class="alert alert-danger" v-if="errors.meta_keywords">
                    {{ errors.meta_keywords }}
                  </div>
                </div>
                <div class="form-group">
                <label>Order</label>
                  <input
                    type="number"
                    class="form-control"
                    name="order"
                    id="order"
                    v-model="order"
                  />

                </div>

                <div class="form-group">
                  <label>Status </label>
                  <select
                    class="form-control"
                    name="status"
                    id="status"
                    v-model="status"
                    placeholder="Select Status"
                  >
                    <option value="0">Disable</option>
                    <option value="1">Enable</option>
                  </select>

                  <div class="alert alert-danger" v-if="errors.status">
                    {{ errors.status }}
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
import PostService from "../../../services/post";
import CategoryService from "../../../services/category";
export default {
  name: "PostAdd",

  data() {
    return {
      errors: {
        name: "",
        image: "",
        description: "",
        short_description: "",
        meta_title: "",
        meta_description: "",
        meta_keywords: "",
        order: "",
        status: "",
        categories:"",
      },
      id: null,
      name: null,
      image: null,
      category_id: 0,
      categories: [],
      imagePreview: null,
      description: null,
      short_description: null,
      meta_title: null,
      meta_description: null,
      meta_keywords: null,
      order: null,
      status: null,
      user_id:0,
      editor: ClassicEditor,
      editorData: "<p>Content of the editor.</p>",
      editorConfig: {
        // The configuration of the editor.
      },
    };
  },
  created(){
       CategoryService.list().then((response)=>{
          response.data.map((item, index) => {
              this.categories.push({'id':item.id,'value':item.name});
          });         
      });
  },
  mounted(){
   

  },
  methods: {

    selectCategory(e){
      e.preventDefault();
      // alert(e.target.value);
      this.category_id=e.target.value;
    },
    uploadImage(e) {
      e.preventDefault();
      this.image = e.target.files[0];
      this.previewFile(this.image);
    },
    previewFile(file) {
      const reader = new FileReader();
      // const preview=document.getElementById('imagePreview');
      reader.addEventListener("load",function () {
          // preview.src = reader.result;
          this.imagePreview = reader.result;
          // console.log(reader.result);
          let imgset = document.getElementById("imagePreview");
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

      if (!this.image) {
        this.errors.image = "Image is Required.";
      }
      if (!this.description) {
        this.errors.description = "Description is Required.";
      }
      if (!this.short_description) {
        this.errors.short_description = "Short Description is Required.";
      }
      if (!this.meta_title) {
        this.errors.meta_title = "Meta Title is Required.";
      }
      if (!this.meta_description) {
        this.errors.meta_description = "Meta Description is Required.";
      }
      if (!this.meta_keywords) {
        this.errors.meta_keywords = "Meta Keywords is Required.";
      }
      if (this.errors.length == 0) {

        //    var data={
        //     name:this.name,
        //     image:this.image,
        //     description: this.description,
        //     meta_title: this.meta_title,
        //     meta_description: this.meta_description,
        //     meta_keywords: this.meta_keywords,
        //     status: this.status,
        // }

        const formData = new FormData();
        formData.append("image", this.image);
        formData.append('name', this.name);
        formData.append('category_id', this.category_id);
        formData.append("description", this.description);
        formData.append("short_description", this.short_description);
        formData.append("meta_description", this.meta_description);
        formData.append("meta_keywords", this.meta_keywords);
        formData.append("meta_title", this.meta_title);
        formData.append("status", this.status);
        formData.append("order", this.order);
        
      
        console.log(formData);

      if (localStorage.getItem("user")) {
        this.user_id=JSON.parse(localStorage.getItem("user")).id;
        formData.append("user_id", this.user_id);          
      }

        PostService.create(formData)
          .then((response) => {
            console.log(response);
            if (!response.data.status) {
              if (response.data.errors.name) {
                this.errors.name = response.data.errors.name;
              }

              if (response.data.errors.image) {
                this.errors.image = response.data.errors.image;
              }
              if (response.data.errors.description) {
                this.errors.description = response.data.errors.description;
              }
              if (response.data.errors.short_description) {
                this.errors.short_description = response.data.errors.short_description;
              }
              if (response.data.errors.meta_title) {
                this.errors.meta_title = response.data.errors.meta_title;
              }
              if (response.data.errors.meta_description) {
                this.errors.meta_description = response.data.errors.meta_description;
              }
              if (response.data.errors.meta_keywords) {
                this.errors.meta_keywords = response.data.errors.meta_keywords;
              }
            } else {
              this.$swal({
                position: "center",
                icon: "success",
                title: "Post has been Successfully",
                showConfirmButton: false,
                timer: 1500,
              });

              this.$router.push('/admin/post');
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
