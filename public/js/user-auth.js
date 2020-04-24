(async () => {
    const userId = localStorage.getItem("VIDEO_EATS_CURRENT_USER_ID");
    const userToken = localStorage.getItem("VIDEO_EATS_ACCESS_TOKEN")
    const welcome = document.querySelector('.navLoggedIn_Welcome');
    const logout = document.querySelector('.navLoggedIn_Logout')
    const loggedOutEls = document.querySelectorAll('.navLoggedOut');
    console.log('loggedOutEls:', loggedOutEls)

    if (userId) {
        try {
            //TO-DO: re-factor to ensure jwt is still valid for specified user
            const res = await fetch(`http://localhost:8080/users/${userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                }
            });
            const { user } = await res.json();
            console.log("user:", user)
            //hide logged-out nav elements
            for (let el of loggedOutEls) {
                el.classList.add('hidden');
                // el.style.display = 'none'
            }

            //grab logged-in nav elements and fill content appropriately
            welcome.classList.remove('hidden');
            //welcome.style.display = 'inline';
            welcome.innerHTML = `Welcome, ${user.userName}!`;
            logout.classList.remove('hidden');
            //logout.style.display = 'inline';
        } catch (e) {
            //console.error(e);
            welcome.classList.add('hidden');
            //welcome.style.display = 'none';
            logout.classList.add('hidden');
            //logout.style.display = 'none';
            for (let el of loggedOutEls) {
                el.classList.remove('hidden');
                // el.style.display = 'inline';
            }
            //window.location.href = "/log-in";
        }
    } else {    //no user stored; re-factor to verify jwt
        welcome.classList.add('hidden');
        //welcome.style.display = 'none';
        logout.classList.add('hidden');
        //logout.style.display = 'none';
        for (let el of loggedOutEls) {
            el.classList.remove('hidden');
            // el.style.display = 'inline';
        }
    }
})();