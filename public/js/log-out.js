const logoutBtn = document.getElementById('logout_btn');
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem("VIDEO_EATS_ACCESS_TOKEN");
    localStorage.removeItem("VIDEO_EATS_CURRENT_USER_ID");
    window.location.href = "/log-in";
})