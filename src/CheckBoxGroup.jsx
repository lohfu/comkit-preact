import { h, Component } from 'preact';

import { omit } from 'lowline';

import FormElement from './FormElement';

export default class CheckBoxGroup extends FormElement {
  onChange(e) {
    e.preventDefault();

    if (document.activeElement !== e.target) return;

    let value = this.state.value || [];
    const val = parseInt(e.target.value, 10) || e.target.value;

    if (e.target.checked) {
      value = value.concat(val).sort();
    } else {
      value = value.filter((v) => v !== val);
    }

    this.setValue(value.length ? value : undefined);
  }

  setValue(value) {
    if (value === '') {
      value = undefined;
    }

    this.setState({
      touched: true,
      dirty: value !== this.props.value,
      error: this.validate(value),
      value,
    });

    this.context.setAttribute(this.props.name, value);
  }

  getChildContext() {
    return {
      group: {
        value: this.state.value,
        name: this.props.name,
        onChange: this.onChange,
      },
    };
  }

  render({ type = 'text', disabled, children, placeholder, values, value, idProp, nameProp }, state = {}, context) {
    const classes = Object.assign({
      'field-container': true,
      'checkbox-group': true,
      empty: !state.value,
      filled: state.value,
      invalid: state.error,
      touched: state.touched,
      valid: state.value && !state.error,
    });

    return (
      <div class={classes}>
        {children}
        <label class="icon" />
        {state.error && <label class="error">{state.error}</label>}
      </div>
    );
  }
}
