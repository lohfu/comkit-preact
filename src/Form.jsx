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

    bindAll(this, ['reset', 'registerInput', 'setAttribute', 'resetAttributes']);

    this.inputs = [];

    this.componentWillReceiveProps(props);
  }

  getChildContext() {
    return {
      initialAttributes: this.initialAttributes,
      setAttribute: this.setAttribute,
      registerInput: this.registerInput,
    };
  }

  componentWillReceiveProps(props = {}) {
    this.resetAttributes(omit(props, 'children'));
  }

  registerInput(component) {
    this.inputs.push(component);

    // check if any initial props are not null
    for (const prop in this.initialAttributes) {
      if (this.initialAttributes[prop]) {
        component.touch();
        break;
      }
    }

    const name = component.props.name;

    if (!this.attributes.hasOwnProperty(name)) {
      this.attributes[name] = this.initialAttributes[name] = null;
    }

    return () => {
      const index = this.inputs.indexOf(component);

      delete this.inputs.splice(index, 1);
    };
  }

  setAttribute(attr, value) {
    const filter = get(this.filters, attr);

    if (filter) value = filter(value);

    set(this.attributes, attr, value);

    this.setState({
      dirty: !deepEqual(this.attributes, this.initialAttributes),
      valid: this.validate(),
    });
  }

  resetAttributes(attrs, validate) {
    this.attributes = attrs || this.initialAttributes || {};
    this.initialAttributes = Object.assign({}, this.attributes);

    this.setState({
      dirty: false,
      valid: this.validate(),
    });
  }

  toJSON() {
    return Object.assign({}, this.attributes);
  }

  validate(focus = false, touch = false) {
    if (touch) {
      this.inputs.forEach((input) => input.touch());
    }

    return this.inputs.every((input) => {
      const isValid = input.isValid();

      if (!isValid && focus) input.focus();

      return isValid;
    });
  }

  reset() {
    this.resetAttributes();

    forEach(this.inputs, (input) => input.reset());
  }

  render({ children }) {
    return (
      <form>{children}</form>
    );
  }
}
