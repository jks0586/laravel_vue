export default function authuser({ to, next, store }) {
    const loginQuery = { path: "/login", query: { redirect: to.fullPath } };

    if(!localStorage.getItem('letscms_user_token')){
        next(loginQuery);
    }else {
        next();
    }

  }
