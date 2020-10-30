This repo provides third-party highlight.js support for the Chapel
language (https://chapel-lang.org).


Instructions for Dummies (namely me)
====================================

This is a third-party highlight.js package, which means that it won't
be included in every distribution of highlight.js by default, but
that, depending on the context, people may be able to opt in to it.


Getting started for the first time
----------------------------------

1) Make sure `node` and `npm` are available to you.

   - On Mac:

     ```
     brew install node
     ```


2) Clone the main highlight.js repository:

   ```
   git clone https://github.com/highlightjs/highlight.js.git
   ```

   (or create your own fork first and then clone that)


3) Install dependencies

   ```
   $ cd .../highlight.js
   $ npm install
   ```


4) Create your own fork of this repo using the "Fork" button from
   https://github.com/chapel-lang/highlightjs-chapel


5) Clone your fork into the `extra` directory:

   ```
   $ cd extra
   $ git clone https://github.com/USERNAME/highlightjs-chapel
   ```


6) Make sure things work as expected:

   ```
   npm run build_and_test
   ```

   Specifically, at the end of this test run, you should see output
   for each of the tests in `test/markup/chapel/`, e.g.

   ```
     chapel
    ✓ should markup basic
    ✓ should markup strings
   ```

To modify the Chapel grammar and test it
----------------------------------------

1) Edit `src/languages/chapel.js` in this repo to your heart's
   content.  See:

     https://highlightjs.readthedocs.io/en/latest/language-guide.html

   for a high-level/so-so guide, or look at other languages to see
   what they do.


2) Build Chapel only from the highlight.js root directory by doing:

   ```
   node tools/build.js -n chapel
   ```


3) Open tools/developer.html in your browser and paste code snippets
   into it to see how they work:

   ```
   open tools/developer.html
   ```

   Note that Chapel will not be auto-detected, so you'll need to
   select it manually.


4) Add any new test cases to test/markup/chapel/ in this repository
   as two files:

   - `foo.txt`: the Chapel source code
   - `foo.expect.txt`: the expected markup output

   (where the expected markup can be copy-pasted from the
   developer.html tool in the previous step).


5) Make sure your new test works:

   ```
   npm run build_and_test
   ```


TODO list
---------
* I suspect our string forms could be beefed up to better handle
  escaped characters and the like

* I think our numerical forms are missing some forms like binary,
  octal, and maybe hex(?) including


Other links that may be useful
------------------------------

Highlight.js resources:

* language contributor checklist:
  https://highlightjs.readthedocs.io/en/latest/language-contribution.html

  - third-party quickstart:
    https://github.com/highlightjs/highlight.js/blob/master/extra/3RD_PARTY_QUICK_START.md

* general information on building and testing:
  https://highlightjs.readthedocs.io/en/latest/building-testing.html

* issue where I asked for clarifications:
  https://github.com/highlightjs/highlight.js/issues/2800

Integration into Discourse resources:

* Most likely path to success:
  https://meta.discourse.org/t/hack-to-install-a-new-language-for-highlight-js-on-a-hosted-discourse/55818/7

* Another potential possibility:
  - https://meta.discourse.org/t/integrating-a-customized-highlight-js-into-my-forum/48758

Integration into StackOverflow:
* Looks like a tough path, but:
  https://meta.stackexchange.com/questions/184108/what-is-syntax-highlighting-and-how-does-it-work/184109#184109
