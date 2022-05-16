export default function admin({ to, next, store }) {
    const loginQuery = { path: "/login", query: { redirect: to.fullPath } };

    if(!localStorage.getItem('isAdmin')){
        next(loginQuery);
    }else {
        next();
    }
    next();
  }
