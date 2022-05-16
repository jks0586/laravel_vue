"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_Admin_Users_Edit_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Admin/Users/Edit.vue?vue&type=script&lang=js":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Admin/Users/Edit.vue?vue&type=script&lang=js ***!
  \**********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../services/auth */ "./resources/js/services/auth.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "UserEdit",
  beforeCreate: function beforeCreate() {
    var _this = this;

    this.id = this.$route.params.id;
    _services_auth__WEBPACK_IMPORTED_MODULE_0__["default"].get(this.id).then(function (response) {
      //   console.log(response.data.data.user);
      if (response.data.status) {
        _this.id = response.data.data.user.id;
        _this.name = response.data.data.user.name;
        _this.email = response.data.data.user.email;
        _this.avatar = response.data.data.user.avatar;
        _this.is_admin = response.data.data.user.is_admin;
        _this.avatarPreview = response.data.data.user.avatarurl;
        var imgset = document.getElementById("avatarPreview");
        imgset.setAttribute("src", _this.avatarPreview);
        imgset.setAttribute("width", 50);
        imgset.setAttribute("height", 50);
      }
    })["catch"](function (error) {
      console.log(error);
    });
  },
  data: function data() {
    return {
      errors: {
        name: "",
        avatar: "",
        email: "",
        is_admin: ""
      },
      id: null,
      name: null,
      email: null,
      avatar: null,
      is_admin: null,
      avatarname: null,
      avatarPreview: null
    };
  },
  methods: {
    uploadImage: function uploadImage(e) {
      e.preventDefault();
      this.avatar = e.target.files[0];
      this.previewFile(this.avatar);
    },
    previewFile: function previewFile(file) {
      var reader = new FileReader();
      reader.addEventListener("load", function () {
        this.avatarPreview = reader.result;
        var imgset = document.getElementById("avatarPreview");
        imgset.setAttribute("src", reader.result);
        imgset.setAttribute("width", 50);
        imgset.setAttribute("height", 50);
      }, false);

      if (file) {
        reader.readAsDataURL(file);
      }
    },
    onSubmit: function onSubmit(e) {
      var _this2 = this;

      e.preventDefault();
      this.errors = [];

      if (!this.name) {
        this.errors.name = "Name is Required.";
      } //   if (!this.image) {
      //     this.errors.image = "Image is Required.";
      //   }


      if (!this.email) {
        this.errors.email = "Email is Required.";
      }

      if (this.errors.length == 0) {
        var formData = new FormData();
        formData.append("id", this.id);
        formData.append("avatar", this.avatar);
        formData.append("name", this.name);
        formData.append("email", this.email);
        formData.append("is_admin", this.is_admin);
        _services_auth__WEBPACK_IMPORTED_MODULE_0__["default"].post(formData).then(function (response) {
          console.log(response);

          if (!response.data.status) {
            if (response.data.errors.name) {
              _this2.errors.name = response.data.errors.name;
            }

            if (response.data.errors.email) {
              _this2.errors.emai = response.data.errors.email;
            }

            if (response.data.errors.avatar) {
              _this2.errors.avatar = response.data.errors.avatar;
            }
          } else {
            _this2.$swal({
              position: "center",
              icon: "success",
              title: "User has been updated Successfully",
              showConfirmButton: false,
              timer: 1500
            });

            _this2.$router.push("/admin/users");
          }
        })["catch"](function (error) {
          console.log(error);
        });
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Admin/Users/Edit.vue?vue&type=template&id=6307ce9c":
/*!**************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Admin/Users/Edit.vue?vue&type=template&id=6307ce9c ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "content-page"
};
var _hoisted_2 = {
  "class": "content"
};
var _hoisted_3 = {
  "class": "container-fluid"
};
var _hoisted_4 = {
  "class": "row"
};
var _hoisted_5 = {
  "class": "col-md-12"
};
var _hoisted_6 = {
  "class": "card-box"
};

var _hoisted_7 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
  "class": "header-title mb-4 text-left"
}, "edit User", -1
/* HOISTED */
);

var _hoisted_8 = {
  "class": "form-group"
};

var _hoisted_9 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "for": ""
}, "Name", -1
/* HOISTED */
);

var _hoisted_10 = {
  key: 0,
  "class": "alert alert-danger"
};
var _hoisted_11 = {
  "class": "form-group"
};

var _hoisted_12 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "for": ""
}, "Email", -1
/* HOISTED */
);

var _hoisted_13 = {
  key: 0,
  "class": "alert alert-danger"
};
var _hoisted_14 = {
  "class": "form-group"
};

var _hoisted_15 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", null, "User Avatar ", -1
/* HOISTED */
);

var _hoisted_16 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
  id: "avatarPreview",
  width: "",
  height: "",
  src: ""
}, null, -1
/* HOISTED */
);

var _hoisted_17 = {
  key: 0,
  "class": "alert alert-danger"
};
var _hoisted_18 = {
  "class": "form-check"
};

var _hoisted_19 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "class": "form-check-label",
  "for": "top"
}, "Is Admin", -1
/* HOISTED */
);

var _hoisted_20 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
  "class": "clear-fix"
}, null, -1
/* HOISTED */
);

var _hoisted_21 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
  "class": "form-group"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
  type: "submit",
  "class": "btn btn-primary m-auto"
}, "Update")], -1
/* HOISTED */
);

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_admin_sidebar = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("admin-sidebar");

  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_admin_sidebar), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [_hoisted_7, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
    onSubmit: _cache[4] || (_cache[4] = function () {
      return $options.onSubmit && $options.onSubmit.apply($options, arguments);
    }),
    action: "",
    id: "register",
    method: "POST"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [_hoisted_9, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "class": "form-control",
    name: "name",
    id: "name",
    placeholder: "Enter Name",
    "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
      return $data.name = $event;
    })
  }, null, 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.name]]), $data.errors.name ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_10, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.errors.name), 1
  /* TEXT */
  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div class=\"alert alert-danger\"></div> ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [_hoisted_12, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "class": "form-control",
    name: "email",
    id: "email",
    placeholder: "Enter Email",
    "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
      return $data.email = $event;
    })
  }, null, 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.email]]), $data.errors.email ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_13, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.errors.email), 1
  /* TEXT */
  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div class=\"alert alert-danger\"></div> ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [_hoisted_15, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "file",
    "class": "form-control",
    name: "avatar",
    id: "avatar",
    onChange: _cache[2] || (_cache[2] = function () {
      return $options.uploadImage && $options.uploadImage.apply($options, arguments);
    }),
    placeholder: "Choose File"
  }, null, 32
  /* HYDRATE_EVENTS */
  ), _hoisted_16, $data.errors.avatar ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_17, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.errors.avatar), 1
  /* TEXT */
  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "checkbox",
    "class": "form-check-input",
    name: "is_admin",
    id: "is_admin",
    "onUpdate:modelValue": _cache[3] || (_cache[3] = function ($event) {
      return $data.is_admin = $event;
    }),
    "true-value": "1",
    "false-value": "0"
  }, null, 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelCheckbox, $data.is_admin]]), _hoisted_19]), _hoisted_20, _hoisted_21], 32
  /* HYDRATE_EVENTS */
  )])])])])])])], 64
  /* STABLE_FRAGMENT */
  );
}

/***/ }),

/***/ "./resources/js/services/auth.js":
/*!***************************************!*\
  !*** ./resources/js/services/auth.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _http_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../http-common */ "./resources/js/http-common.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }



var UserService = /*#__PURE__*/function () {
  function UserService() {
    _classCallCheck(this, UserService);
  }

  _createClass(UserService, [{
    key: "register",
    value: function register(data) {
      return _http_common__WEBPACK_IMPORTED_MODULE_0__["default"].post('/register', data);
    }
  }, {
    key: "login",
    value: function login(data) {
      return _http_common__WEBPACK_IMPORTED_MODULE_0__["default"].post('/login', data);
    }
  }, {
    key: "index",
    value: function index(url) {
      // alert('aaaaa');
      return _http_common__WEBPACK_IMPORTED_MODULE_0__["default"].get(url);
    }
  }, {
    key: "get",
    value: function get(id) {
      return _http_common__WEBPACK_IMPORTED_MODULE_0__["default"].get('/user/' + id);
    }
  }, {
    key: "post",
    value: function post(data) {
      return _http_common__WEBPACK_IMPORTED_MODULE_0__["default"].post('/user', data);
    }
  }, {
    key: "delete",
    value: function _delete(id) {
      return _http_common__WEBPACK_IMPORTED_MODULE_0__["default"]["delete"]('/user/' + id);
    }
  }]);

  return UserService;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new UserService());

/***/ }),

/***/ "./resources/js/components/Admin/Users/Edit.vue":
/*!******************************************************!*\
  !*** ./resources/js/components/Admin/Users/Edit.vue ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Edit_vue_vue_type_template_id_6307ce9c__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Edit.vue?vue&type=template&id=6307ce9c */ "./resources/js/components/Admin/Users/Edit.vue?vue&type=template&id=6307ce9c");
/* harmony import */ var _Edit_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Edit.vue?vue&type=script&lang=js */ "./resources/js/components/Admin/Users/Edit.vue?vue&type=script&lang=js");
/* harmony import */ var F_projects_laravel_laravel_vue_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,F_projects_laravel_laravel_vue_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_Edit_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_Edit_vue_vue_type_template_id_6307ce9c__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/components/Admin/Users/Edit.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/Admin/Users/Edit.vue?vue&type=script&lang=js":
/*!******************************************************************************!*\
  !*** ./resources/js/components/Admin/Users/Edit.vue?vue&type=script&lang=js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Edit_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Edit_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Edit.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Admin/Users/Edit.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/Admin/Users/Edit.vue?vue&type=template&id=6307ce9c":
/*!************************************************************************************!*\
  !*** ./resources/js/components/Admin/Users/Edit.vue?vue&type=template&id=6307ce9c ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Edit_vue_vue_type_template_id_6307ce9c__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Edit_vue_vue_type_template_id_6307ce9c__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Edit.vue?vue&type=template&id=6307ce9c */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Admin/Users/Edit.vue?vue&type=template&id=6307ce9c");


/***/ })

}]);