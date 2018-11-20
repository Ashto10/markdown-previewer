Markdown Previewer
===

1. [About](#about)
1. [Features](#features)
1. [Dependencies](#dependencies)


About
---

A fairly straight-forward single page application that previews Markdown text in real time. Most of the heavy lifting is done by Marked.js, so this was merely a matter of putting all the pieces together. Originally created as part of [a FreeCodeCamp challenge](https://learn.freecodecamp.org/front-end-libraries/front-end-libraries-projects/build-a-markdown-previewer/) and written using React's framework in late 2017, I recently revisited this project, and opted to port it over to Vue.js for personal practice.

[Live demo available on Codepen](https://codepen.io/Ashto/full/aqJwEv/)

Fun fact: This very README.MD file was drafted using this previewer. Nothing like some real-world application, I'd say.

Features
---

* Automatic conversion from plain text to Markdown results in real-time, thanks to Marked.js
* Clear and Show Intro buttons clear user's input and resets to starting explanatory text, respectively
* Ability to toggle fullscreen on output


Dependencies
---

1. [Vue.js](https://github.com/vuejs/vue)
1. [Marked.js](https://github.com/markedjs/marked)
1. A Sass compiler (I personally use [Koala](http://koala-app.com/))