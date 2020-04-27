// Vanilla javascript to grab the sign up form from the pug template
// TODO: change based on the name of the class/id from the pug
import { handleErrors, api } from './utils.js';
const signUpForm = document.querySelector('.sign-up-form-biz');

// set up the event listener for the submit button
signUpForm.addEventListener('submit', async (e) => {
    // Prevent the default behavior of the submit button
    e.preventDefault();

    // Create a new formData object
    const formData = new FormData(signUpForm);

    // Use formData function to pull out data from the sign up form
    const businessName = formData.get('businessName');
    const street = formData.get('street');
    const cityPostal = formData.get('cityPostal');
    const categoryId = formData.get('categoryId');

    console.log('street', street);
    console.log('cat', categoryId)

    window.alert('Business successfully added. Thanks!')
    window.location.href = '/search';


    // try {
    //     const res = await fetch(`${api}users`, {
    //         method: 'POST',
    //         body: JSON.stringify(body),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     });
    //     if (!res.ok) {
    //         throw res;
    //     }
    //     // destructure token and id from the fetch
    //     const { token, user: { id } } = await res.json();
    //     // store the tokens into the local storage
    //     localStorage.setItem('VIDEO_EATS_ACCESS_TOKEN', token);
    //     localStorage.setItem('VIDEO_EATS_CURRENT_USER_ID', id);
    //     // redirect back to home if sign up is succcessful
    //     window.location.href = '/';
    // } catch (err) {
    //     handleErrors(err);
    // }
});