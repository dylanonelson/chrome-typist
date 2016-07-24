# chrome-typist

> Chrome extension for faster browser use, especially with complex web apps.

## Premise
Stop clicking on things! Use Vim-style shortcuts to find and select inputs or links on webpages in Chrome.

### Goals
- Bring the speed and comfort of Vim search to Chrome
- Fill out web forms without using a mouse
- Stop using Cmd+F to find fields buried on the page

### Development checklist
- [x] Show cmdline-style input bar on cmdline command
- [x] Highlight matches on current page as user types
- [x} Go into normal mode and cycle through matches on enter
- [x] Trigger click on selected item on subsequent enter
- [x] Improve search: don't match hidden elements; match form elements
- [ ] Copy selected text to clipboard with y
- [ ] Show number of matches and browsing commands (n, N, etc.) in cmdline
- [ ] Exit cmdline and normal mode and blur inputs on exit command
- [ ] Expose search history via Ctrl-P
- [ ] Customize appearance with extension settings
