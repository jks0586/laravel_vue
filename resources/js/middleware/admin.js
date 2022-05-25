export default function admin({ to, next, store }) {
    const loginQuery = { path: "/login", query: { redirect: to.fullPath } };

    if(!localStorage.getItem('isAdmin')){
        alert('aaaaa');
        next(loginQuery);
    }else {
        next();
    }
    next();
  }
