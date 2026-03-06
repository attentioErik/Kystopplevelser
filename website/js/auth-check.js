(function () {
  var path = window.location.pathname;
  if (path === '/password' || path === '/password.html' || path.endsWith('/password') || path.endsWith('/password.html')) {
    return;
  }
  if (sessionStorage.getItem('ky_auth') !== '1') {
    sessionStorage.setItem('ky_redirect', window.location.href);
    window.location.replace('/password');
  }
}());
