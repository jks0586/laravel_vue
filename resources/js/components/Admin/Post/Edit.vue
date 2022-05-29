<template>
  <admin-sidebar></admin-sidebar>
  <div class="content-page">
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="card-box">
              <div class="header-title mb-4 text-left">edit Post</div>
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
                    v-model="category_id"
                    placeholder="--Choose Category --"
                  >
                    <option value="0">-- Choose Category --</option>
                    <option :value="index" v-for="(cat,index) in this.categories" :key="cat">{{ cat }}</option>
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
import PostService from "../../../services/post";
import CategoryService from "../../../services/category";
export default {
  name: "PostEdit",
  beforeCreate() {

  
CategoryService.list().then((response)=>{
    response.data.map((item, index) => {
        this.categories[item.id]=item.name;
    });

});
  

    this.id = this.$route.params.id;
    PostService.get(this.id)
      .then((response) => {
        if (response.data.status) {
          // console.log(response.data.data.category);
          this.id = response.data.data.post.id;
          this.name = response.data.data.post.name;
          this.image = response.data.data.post.image;
          this.imagePreview = response.data.data.post.imageurl;
          this.category_id = response.data.data.post.category_id;
          this.description = response.data.data.post.description;
          this.short_description = response.data.data.post.short_description;
          this.meta_title = response.data.data.post.meta_title;
          this.meta_description = response.data.data.post.meta_description;
          this.meta_keywords = response.data.data.post.meta_keywords;
          this.order = response.data.data.post.order;
          this.status = response.data.data.post.status;
          let imgset = document.getElementById("imagePreview");
          imgset.setAttribute("src", this.imagePreview);
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
        image: "",
        description: "",
        short_description: "",
        meta_title: "",
        meta_description: "",
        meta_keywords: "",
        order: "",
        status: "",
        categories:"",
        category_id:"",
      },
      id: null,
      name: null,
      image: null,
      imagename: null,
      imagePreview: null,
      description: null,
      short_description: null,
      meta_title: null,
      meta_description: null,
      meta_keywords: null,
      categories:{},
      category_id:null,
      order: null,
      status: null,
      editor: ClassicEditor,
      editorData: "<p>Content of the editor.</p>",
      editorConfig: {
        // The configuration of the editor.
      },
    };
  },
  methods: {
    uploadImage(e) {
      e.preventDefault();
      this.image = e.target.files[0];
      //   console.log(this.image.name);
      this.previewFile(this.image);
    },
    previewFile(file) {
      const reader = new FileReader();
      // const preview=document.getElementById('imagePreview');
      reader.addEventListener(
        "load",
        function () {
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

      //   if (!this.image) {
      //     this.errors.image = "Image is Required.";
      //   }
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
        const formData = new FormData();
        // console.log(this.image);
        formData.append("id", this.id);
        // formData.append("image", this.image,this.image.name);
        formData.append("image", this.image);
        formData.append("name", this.name);
        formData.append('category_id', this.category_id);
        formData.append("description", this.description);
        formData.append("short_description", this.short_description);
        formData.append("meta_description", this.meta_description);
        formData.append("meta_keywords", this.meta_keywords);
        formData.append("meta_title", this.meta_title);
        formData.append("status", this.status);
        formData.append("order", this.order);
        // formData.append("_method", "PUT");

        // const data = {};
        // for (let [key, val] of formData.entries()) {
        //   Object.assign(data, { [key]: val });
        // }
        // console.log(data);

        PostService.update(formData)
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
              if (response.data.errors.category_id) {
                this.errors.category_id = response.data.errors.category_id;
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
                title: "Post has been updated Successfully",
                showConfirmButton: false,
                timer: 1500,
              });

              this.$router.push("/admin/post");
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
