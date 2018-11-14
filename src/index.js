import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Grab marked object from window's script
const marked = window.marked;

let previewText = `# H1

## H2

Link to [Marked]

Look, it's \`Inline code\`

    with four spaces 
    this becomes a codeblock
      Not sure how the tabs work
      Oh well
* 1
* 2

> Blockquote
> This is how it works apperarently

![Alt text](https://placehold.it/100 "Optional title")

** Bold text **

[Marked]: 'https://github.com/markedjs/marked/'`;

function Input(props) {
  return (
    <section className="input">
      <textarea id="editor" onChange= {e => props.updateOutput(e.target.value)}>{previewText}</textarea>
    </section>
  )
}

function Output(props) {
  let text = {__html: marked(props.text,true)};
  return (
    <section className="output">
      <div id="preview" dangerouslySetInnerHTML={text} />
    </section>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: previewText
    }

    this.updateOutput = this.updateOutput.bind(this);

  }
  updateOutput(input) {
    this.setState({input});
  }

  render() {
    return (
      <main>
        <header>The amazingly simple markdown demo!</header>
        <div className="container">
          <Input updateOutput={this.updateOutput} />
          <Output text={this.state.input} />
        </div>
      </main>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));