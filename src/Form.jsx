import { h, Component } from 'preact';

// modules > lodas
import set from 'set-value';
import unset from 'unset-value';
import get from 'get-value';
import { omit, forEach, bindAll } from 'lowline';

// import Input from '../components/Input.jsx'
import deepEqual from 'deep-equal';

export default class Form extends Component {
  constructor(props) {
    super(props);

    bindAll(this, ['reset', 'registerInput', 'setAttribute']);

    this.inputs = [];
    this.componentWillReceiveProps(props);
  }

  getChildContext() {
    return {
      setAttribute: this.setAttribute,
      registerInput: this.registerInput,
    };
  }

  componentWillReceiveProps(props = {}) {
    this.attributes = omit(props, 'children', 'class', 'action');
    this.previousAttributes = Object.assign({}, this.attributes);
  }

  registerInput(component) {
    this.inputs.push(component);

    return () => {
      const index = this.inputs.indexOf(component)

      delete this.inputs.splice(index, 1);
    };
  }

  setAttribute(attr, value) {
    const filter = get(this.filters, attr);

    if (filter) value = filter(value);

    set(this.attributes, attr, value);

    this.setState({
      dirty: !deepEqual(this.attributes, this.previousAttributes),
      valid: this.validate(false),
    });
  }

  toJSON() {
    return Object.assign({}, this.attributes);
  }

  validate(focus = true) {
    return this.inputs.every((input) => {
      const isValid = input.isValid();

      if (!isValid && focus) input.focus();

      return isValid;
    });
  }

  reset() {
    forEach(this.inputs, (input) => input.reset());
  }

  render({ children }) {
    return (
      <form>{children}</form>
    );
  }
}
