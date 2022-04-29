# Todo React

## Another [Frontend Mentor](https://www.frontendmentor.io/home) cahllenge implemented using [React](https://reactjs.org/)

This is my third Frontend Mentor challenge implemented using React. The [Todo](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW/hub/todo-app-Skb3THXHq) cahellenge is listed at intermediate level.

### Motivation

Again, just for self-edification.

### Tools

React, React DnD, NodeJS, HTML, CSS, GH-Pages, using local storage as a low-level persistence mechanism

### Lessons/Thoughts

- This was my first time implementing drag and drop functionality. I used the [React DnD](https://react-dnd.github.io/react-dnd/about) package as it had the highest rating on the Googles. It wasn't until after I had it working that I realized it does not work for touch devices, though they do offer a touch version as well. Next time I will plan accordingly.
- Regarding the DnD functionality, there is still an occasional catastrophic bug where the dragged item will duplicate itself many times and break the app. My guess is that the state management is getting out of sync and assigning the item to indices in the containing array where it shouldn't. It would be great to fix this error but I've exceeded what I consider to be a reasonable time investment for this non-production, purely educational project.
- On app state management. This app would likely have benefited from using useReducer instead of multiple useState's. Now that I have a little more experience with React I should be able to recognize this in the planning/requirements stage.
- Again, the limited functionality description provided in the challenge docs left me with an unused checkbox in the 'new todo' input. I set it so that it will submit the todo when checked (just hitting enter seemed more logical so that was implemented as well), but once submitted the input needs to be reset anyway, so the custom checkbox never appears. I left it simply because the design images show it there.
- The app background image changing according to both the chosen theme and device width gave me more trouble than I'd like to admit and the implementation I ended up with seems far from elegant. Functionally it appears to be correct though so I will leave it as is. It's time for the next challenge anyway.
