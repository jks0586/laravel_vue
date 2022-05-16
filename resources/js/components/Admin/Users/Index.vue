<template>
  <admin-sidebar />
  <div class="content-page">
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="card-box">
              <div class="header-title mb-4 text-left">
                <h3>
                  User Management
                  <button
                    type="button"
                    class="btn btn-default btn-primary float-right"
                    @click="createUser"
                  >
                    Create User
                  </button>
                </h3>
              </div>
              <div :class="mainTableClass">
                <div :class="afterMainTableClass">
                  <div :class="tableWrapper">
                    <div class="btn-toolbar"></div>
                    <table :class="tableClass" :id="tableId">
                      <thead>
                        <tr>
                          <th v-for="cname in columns" :key="cname.field">
                            {{ cname.label }}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in this.items" :key="item.id">
                          <td>{{ item.name }}</td>
                          <td>{{item.email}}</td>
                          <td v-html="item.avatarhtml"></td>
                          <td>{{ item.is_admin }}</td>
                          <td>{{ item.created_at }}</td>
                          <td>
                            <a :href="'/admin/user/edit/' + item.id"
                              ><i class="fa fa-pencil-alt"></i
                            ></a>
                            |
                            <a v-on:click="deleteUser($event)"
                              ><i class="fa fa-trash" :data-id="item.id"></i
                            ></a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
var filter = require("lodash/filter");
var forEach = require("lodash/forEach");
var reduce = require("lodash/reduce");
var head = require("lodash/head");
var last = require("lodash/last");
var keys = require("lodash/keys");
var merge = require("lodash/merge");
var transform = require("lodash/transform");
var join = require("lodash/join");
var includes = require("lodash/includes");
var isString = require("lodash/isString");
var isArray = require("lodash/isArray");
var split = require("lodash/split");

// import PostService from "../../../services/post";
import UserService from "../../../services/auth";
export default {
  name: "UserIndex",
  props: {},
  data() {
    return {
      mainTableClass: "table-rep-plugin",
      afterMainTableClass: "table-responsive mb-0",
      tableClass: "table  table-striped",
      tableWrapper: "table-wrapper",
      tableId: "category-list",
      rowsPerPage: { type: [String, Number], default: () => 10 },
      columns: [
        {
          label: "Name",
          field: "name",
        },
        {
          label: "Email",
          field: "email",
        },
        {
          label: "Image",
          field: "image",
        },
        {
          label: "Is Admin",
          field: "is_admin",
        },
        {
          label: "Create At",
          field: "created_at",
        },
        {
          label: "Action",
          field: "action",
        },
      ],
      isLoading: false,
      call: null,
      uri: "http://laravel-vue.com/api/users-list",
      search: "",
      items: [],
      first_page_url: null,
      prev_page_url: null,
      next_page_url: null,
      last_page_url: null,
      per_page: 10,
      from: 0,
      to: 0,
      total: 0,
      page: 1,
      last_page: 1,
      selected: [],
    };
  },
  mounted() {
    this.per_page = this.per_page;
    this.uri = this.getCompleteUri(this.uri);
    this.getData(this.uri);
    console.log(axios);
  },
  methods: {
    deleteUser(e) {
      e.preventDefault(0);
      let delete_id = e.target.dataset.id;
      UserService.delete(delete_id)
        .then((response) => {
          console.log(response.data);
          if (response.data.status) {
            this.$swal({
              position: "center",
              icon: "success",
              title: response.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            location.reload();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    createUser(e) {
      e.preventDefault();
      this.$router.push("/admin/user/add");
    },
    getQueryParamsUri(uri) {
      let splitUri = split(uri, "?");
      let params = splitUri.length > 1 ? split(last(splitUri), "&") : [];
      let notFound = true;
      return reduce(
        params,
        (obj, param) => {
          let key = head(split(param, "="));
          notFound = true;
          forEach(keys(this.reservedQueryParams), (reservedKey) => {
            if (includes(key, reservedKey)) {
              notFound = false;
            }
          });
          if (notFound) {
            obj[head(split(param, "="))] = last(split(param, "="));
          }
          return obj;
        },
        {}
      );
    },
    getCompleteUri(uri) {
      let paramsObject = merge(
        this.getQueryParamsUri(uri),
        this.reservedQueryParams,
        this.addedQueryParams
      );
      let paramsArray = transform(
        paramsObject,
        (result, value, key) => {
          if (isArray(value)) {
            forEach(value, (val, k) => {
              result.push(key + "[" + k + "][column]" + "=" + val.column);
              result.push(key + "[" + k + "][order]" + "=" + val.order);
            });
          } else {
            result.push(key + "=" + value);
          }
        },
        []
      );
      return this.getPathUri(uri) + "?" + join(paramsArray, "&");
    },
    getPathUri(uri) {
      return head(split(uri, "?", 1));
    },
    getData(url) {
      this.isLoading = true;
      UserService.index(url)
        .then((response) => {
          if (
            response.status === 0 ||
            (response.status >= 200 && response.status < 400)
          ) {
            // The request has been completed successfully

            this.items = response.data.data;
            this.first_page_url = response.first_page_url;
            this.prev_page_url = response.prev_page_url;
            this.next_page_url = response.next_page_url;
            this.last_page_url = response.last_page_url;
            this.per_page = response.per_page;
            this.from = response.from;
            this.to = response.to;
            this.total = response.total;
            this.page = response.current_page;
            this.last_page = response.last_page;
            this.isLoading = false;
          } else {
            // Oh no! There has been an error with the request!
            // console.log('Oh no! There has been an error with the request!');
            this.isLoading = false;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
