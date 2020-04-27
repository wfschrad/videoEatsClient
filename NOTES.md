# Review notes

These are just some feedback items that I see for the project. Thank you for
giving me the chance to review it.

## The overall experience

I am more than impressed that you put in the extra effort to add accessibility
information using the WAI-ARIA standard. Good job, really. This is an
oft-ignored part of Web applications. When you do create your README, make sure
that you include that you put in accessibility features using WAI-ARIA.

Though I couldn't use the app, the log-in and sign-in pages are nicely laid out
and aesthetically pleasing. Well done, there. Forms are hard to make pleasant
and I didn't feel like I was _working_ to use yours.

I couldn't get it up and running on my machine. It seems that the `index.js`
just prints out `console.log('where is my api? ', api);`. I can't give any
feedback about the app.

If you ever find yourself writing something like this, where you're using a
backtick string and only interpolating a variable, then don't use the string
and just pass in the variable by itself. There's usually no reason to have
JavaScript do the work of string manipulation.

```js
// If value is a string
methodCall(`${value}`);

// is usually the same as
methodCall(value);

// which is much clearer in its intent.
```

## Source files

Here is some stuff about the source files.

### README.md

There is not one. :-(

### package.json

It is nice that you cleaned up the dependencies for the front-end project.
Nicely done.

### index.js, server

That looks pretty good. All the routes are laid out. Things make sense. You're
making nice calls to the backend. Good job.

### Pug templates

Your Pug templates are so very clean, so very nicely laid out. I like looking at
them.

### Client-side JavaScript

There's a lot of commented-out code, in there. It would be nice to get that
cleaned up before you showcase this project to an audience wider than the
classroom.

When you decide to comment code to describe what's happening

```js
// destructure token and id from the fetch
const { token, user: { id } } = await res.json();
// store the tokens into the local storage
localStorage.setItem('VIDEO_EATS_ACCESS_TOKEN', token);
localStorage.setItem('VIDEO_EATS_CURRENT_USER_ID', id);
// redirect back to home if sign up is succcessful
window.location.href = '/';
```

it's polite to add line breaks before each comment block for the reader.

```js
// destructure token and id from the fetch
const { token, user: { id } } = await res.json();

// store the tokens into the local storage
localStorage.setItem('VIDEO_EATS_ACCESS_TOKEN', token);
localStorage.setItem('VIDEO_EATS_CURRENT_USER_ID', id);

// redirect back to home if sign up is succcessful
window.location.href = '/';
```

Even though it looks like whoever wrote the JavaScript had line wrap turned on,
I am really pleased by the overall horizontal compactness of the code. I like
seeing code that fits within 120 characters; if you can score 80 character-wide
lines, even better, because that's what the human eye and mind can easily read.
The actual JavaScript code looks like something I could have created; it feels
like coming home.
