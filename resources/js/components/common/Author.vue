<script>
export default {
  name: "Author",
  data() {
    return {
      isLoading: false,
    };
  },
  props: ["user"],
  methods: {},
};
</script>
<style scoped>
.author-section {
  padding: 25px 30px 17px;
  text-align: left;
  clear: both;
  float: none;
  max-width: 750px;
  margin: 0 auto 3rem;
  background: #ee0979;
  background: -webkit-linear-gradient(to right, #00dbff, #090dee61);
  background: linear-gradient(to right, #00dbff, #090dee61);
}
.author-avatar {
  width: 75px;
  float: left;
  position: relative;
  z-index: 10;
}
.author-description {
  padding-left: 100px;
  position: relative;
  top: -5px;
}
.social-link {
  color: #ffffff !important;
  margin: 13px 10px 0 0;
  border: 1px solid #ffffff;
  display: inline-block;
  font-size: 16px;
  border-radius: 3px;
  padding: 6px 24px 6px;
  text-decoration: none;
}
</style>

<template>
  <div>
    <div class="author-section col-md-12">
      <div class="author-avatar"><img :src="user.avatarurl" class="avatar" /></div>
      <div class="author-description">
        <strong class="authorname">{{ user.name }}</strong>
        <p class="text-ad-2" v-html="user.about"></p>
        <a class="social-link" :href="user.github_url">{{ user.github_name }}</a>
        <a class="social-link" :href="user.linkedin_url">{{ user.linkedin_name }}</a>
        <a class="social-link" :href="user.twitter_url">{{ user.twitter_name }}</a>
      </div>
    </div>
  </div>
</template>
