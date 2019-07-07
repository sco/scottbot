import { html, Component, render } from 'https://unpkg.com/htm/preact/standalone.mjs';

async function request(query) {
  let res = await fetch('/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  })
  return await res.json()
}

class App extends Component {
  componentDidMount() {
    request(`{ lights { name }}`).then(res => {
      this.setState({ lights: res.data.lights });
    });
  }
  render(props, { lights = [] }) {
    return html`
      <div>
        <h1>Raymond Home</h1>
        <h2>Lights</h2>
        <ul>
          ${lights.map(light => html`
            <${Light} name=${light.name} />
          `)}
        </ul>
      </div>
    `;
  }
}

class Light extends Component {
  alert() {
    request(`mutation { alert(name:"${this.props.name}") }`).then(res => {
      console.log('done');
    });
  }
  render({ name }) {
    return html`
      <button onClick=${() => this.alert()}>${name}</button>
    `
  }
}

render(html`<${App} />`, document.body);