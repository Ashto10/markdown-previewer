/*
// The introductory text presented to viewers on page load.
// Stored inside an array in order to allow collapsing on Brackets.
// Strongly recommend making a single string for production.
*/
const startingText = [`
The Amazing(ly simple) Markdown Previewer!
===

1. [What is markdown?](#what-is-markdown-)
1. [How to use](#how-to-use)
  1. [The Basics](#the-basics)
  1. [Headings](#headings)
  1. [Images and links](#images-and-links)
  1. [Lists](#lists)
  1. [Blockquotes](#blockquotes)
  1. [Code Blocks and Inline Code](#code-blocks-and-inline-code)
  1. [Extras](#extras)
1. [How it works](#how-it-works)


What is Markdown?
---

Markdown could be one of these things:

a) Markdown is a plain text syntax that provides formatting via semantic character usage.

b) Markdown is a conversion tool that converts input into HTML.

The answer? C) Both!

[Markdown](https://daringfireball.net/projects/markdown/) is a plain-text to HTML syntax that is easily legible on its own, and can also be converted into perfectly valid HTML (or XHTML). It's a powerful tool that's used all over the web on sites like Github, allowing users to easily create documents from scratch.

How to use
---

### The basics

Simply start typing, and text will simply appear, automatically wrapped in \`<p>\` tags. Hitting the return key once will insert a line break, and a second press will start a brand new paragraph.

If you want to add *italics* to certain words, wrap them in asterisks like so: \\*this will be italicized\\*. Using two asterisks, \\*\\*like so\\*\\*, will create **bold** text.

### Headings

Adding octothorpes(#) before a block of text will create a heading. The amount of octothorpeswill dictate the resulting heading size.

    # H1 heading
    ## H2 heading
    ### H3 heading
    #### H4 heading
    ##### H5 heading
    ###### H6 heading

Alternatively, the following formatting will also create heading tags

    This creates an H1 heading
    ===
    
    This creates an H2 heading
    ---

Finally, all headings are given an id that matches their name. Any non-alphanumerical characters are replaced with hyphens (-). These ids can then be hyperlinked to in order to help readers bounce around the final product, as seen above in the table of contents.

### Images and links

The syntax to link is as follows:

    [Hyperlink text](link-to-page.html)

[The above creates this link.](#images-and-links)

Alternatively, you can create a reference-style link with the following syntax:

    [Hyperlink text][link reference]
    
    ...
    
    [link reference] actual link "hover text"

[Which results in this kind of link][test]

[test]:#images-and-links "Notice my hover text."

By preceding a link with an exclamation point (!), that link becomes an image. In this case, the hyperlink text then becomes the image's alt tag. Notice that when making links this way, the reference link doesn't immediately have to follow where it's being used. This means you can group them together at the bottom of the file, if you'd like. You can also reuse the links instead of retyping them!

![A random picture of a dog](https://png.pngtree.com/element_origin_min_pic/16/05/23/195742f032cf0f7.jpg)

### Lists

Lists are fairly straightforward. Much like headers, simply precede each list item with one of the following characters: * + -. Each will then be converted to an unordered list item, and you can even use them interchangeably.

    * First item
    - Second item
    + Third item

becomes

* First item
- Second item
+ Third item

Ordered list items work identically. By preceeding a list item with "1.", it will become an ordered list item. You don't have to manually follow numbers after one another.

    1. First item
    1. Second item
    151. Third item

becomes 

1. First item
1. Second item
151. Third item

### Blockquotes

Putting a right angle bracket (>) before the start of a paragraph converts it into a blockquote. Preferably, you should place > at the start of every new line within a blockquote, but in most cases a single one at the start will suffice. Don't quote me on that, as this occasionally may lead to buggy behavior in certain scenarios, so it's probably best to do it all at once.

> Preferably, you should place > at the start of every new line within a blockquote, but in most cases a single one at the start will suffice. Don't quote me on that.
<span style="display: block; text-align: right; color: gray; margin-top: 1em;">&mdash; Gustavo, 2018</span>

Blockquotes can contain other elements inside them, even other blockquotes!

### Code Blocks and Inline Code

By putting four spaces before a line of text, you can convert it into a code block. This strips all formatting from the text, and also reveals characters that might otherwise be hidden.

    function example() {
      printf('** are visible');
    }

### Extras

- You can use a backslash character () to escape out of other special characters. No more **accidentally** overemphasizing things!
- ~~Strikeout~~ text by surrounding it with double tildes (~)
- HTML span tags can be used for custom styling. For the sake of legibility, however, try not to go too <span style="font-size: 1.75em"><span style="color: red;">c</span><span style="color: orange;">r</span><span style="color: yellow;">a</span><span style="color: green;">z</span><span style="color: blue;">y</span>.</span>


How it works
---

This page, you mean? Very, very easily. Most of the hard work has been done by Markdown, as well as the creators of [Marked.js.](https://github.com/markedjs/marked/) Marked.js automatically converts from plain text to HTML, with little input on my end aside from some configuration. For those curious, the config is as follows:

    options = {
      breaks: true,
      smartLists: true,
      smartyPants: true
    }
`];

Vue.component('markdown-input', {
  template: `
  <section class="input">
      <header class="controls">
        <p class='header-title'>Input</p>
        <button @click="clear">Clear</button>
        <button @click="reset">Show Sample</button>
      </header>
      <textarea id="editor" @input="updateText" v-model='inputText'></textarea>
    </section>
`,
  data() {
    return {
      inputText: startingText[0]
  }
  },
  methods: {
    clear() {
      this.inputText = '';
      this.updateText(this.inputText);
    },
    reset() {
      this.inputText = startingText[0];
      this.updateText();
    },
    updateText() {
      this.$emit('update-input', this.inputText);
    }
  }
});

Vue.component('markdown-output', {
  props: {
    incomingText: {
      type: String,
      required: true
    },
    fullscreen: {
      type: Boolean,
      default: false
    }
  },
  template: `
  <section class="output">
    <header class="controls">
      <p class='header-title'>Output</p>
      <button @click="toggleFullscreen">{{ this.fullscreen ? 'Hide Editor' : 'Show Editor' }}</button>
    </header>
    <div id="preview" v-html="markdown">
    </div>
  </section>
`,
  methods: {
    toggleFullscreen() {
      this.$emit('toggle-fullscreen', this.fullscreen);
    }
  },
  computed: {
    markdown() {
      return marked(this.incomingText);
    }
  }
});

const app = new Vue({
  el: '#root',
  data: {
    input: startingText[0],
    fullscreen: false
  },
  methods: {
    updateInput(text) {
      this.input = text;
    },
    toggleFullscreen() {
      this.fullscreen = !this.fullscreen
    }
  }
});