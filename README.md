This repo provides third-party highlight.js support for the Chapel
language (https://chapel-lang.org).


Instructions for Dummies (namely me)
====================================

This is a third-party highlight.js package, which means that it won't
be included in every distribution of highlight.js by default, but
that, depending on the context, people may be able to opt in to it.
I've taken the approach of getting something simple up and running
quickly to get the basics working, but more time could be invested
here to improve it over time.


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


To integrate the Chapel grammar into a Discourse Theme
------------------------------------------------------

1) Build the CDN version of highlight.js:

   ```
   node tools/build.js -t cdn
   ```

2) Take a look at chapel.min.js:

   ```
   emacs -nw extra/highlightjs-chapel/dist/chapel.min.js
   ```

3) Make a copy of the script and edit out the initial
   registerLanguage() call and closing braces/parens, also removing
   linefeeds, to get a single-line version of the script for pasting
   into the next step.

4) On the Discourse admin panel:

   - click to "Customize -> Themes"

   - select a theme to edit (syntax highlighting is specific to a
     theme and will need to be added to each theme that you want to
     support)

   - Under "Custom CSS/HTML" choose "Edit CSS/HTML"

   - Go to the "</head>" section

   - Paste in / update the following script:

     ```
     <script type="text/discourse-plugin" version="0.8.27">
       // add Chapel language to HighlightJS
       // Must build highlight.js with "node tools/build.js -t cdn"
       const chapelLang = TODO: PASTE_FUNCTION_HERE!!!
       api.registerHighlightJSLanguage("chapel", chapelLang);
     </script>
     ```

     where the function should have the form:

     ```
     function(e){return{name:"Chapel",aliases:["chapel","chpl"],...}}
     ```

5) Under Settings->Posting, add "chapel" to the "highlighted
   languages" section.  Optionally, consider also making "Chapel" the
   default code language.

6) Open questions:
   - Does the registerHighlightJSLanguage() line need to be repeated
     for each triple-quote tag we want to recognize?
   - Does each string passed to registerHighlightJSLanguage() need to be
     named distinctly in the "highlighted languages" section, or is it
     cognizant of the aliases in the language's definition.


TODO list for improving the grammar
-----------------------------------
* easy: What other "built-ins" would we want to call out?  (e.g.,
  `Locales`, `here`, `writeln`)

* I suspect our string forms could be beefed up to better handle
  escaped characters and the like

* I think our numerical forms are missing some forms like binary,
  octal, and maybe hex(?) including hex floating point forms?

* Other languages do more to call out constructs that create new
  scoped concepts like 'class', 'enum', 'proc', 'iter', etc.
  Should we?

* Generally speaking, our grammar is much simpler than most other
  languages, making me think it's not as bulletproof.  What more
  should we worry about for generality?


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

* The path I took to success (summarized above):
  https://meta.discourse.org/t/hack-to-install-a-new-language-for-highlight-js-on-a-hosted-discourse/55818/7

* Another potential possibility:
  - https://meta.discourse.org/t/integrating-a-customized-highlight-js-into-my-forum/48758

Integration into StackOverflow:
* Looks like a tough path, but:
  https://meta.stackexchange.com/questions/184108/what-is-syntax-highlighting-and-how-does-it-work/184109#184109
