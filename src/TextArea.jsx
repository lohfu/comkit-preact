import { h, Component } from 'preact';
import classNames from 'classnames';
import { omit } from 'lowline';

import FormElement from './FormElement';

export default class TextArea extends FormElement {
  onFocus(e) {
    this.setState({
      focus: true,
      touched: true,
    });

    if (document.documentElement.dataset.browser === 'IE11') {
      // make text area behave like input in IE (input fires both
      // focus and input when focusing input elements, but not textareas)
      this.setValue(e.target.value);
    }
  }

  render({ disabled, placeholder }, state = {}) {
    const classes = Object.assign({
      'field-container': true,
      empty: !state.value,
      filled: state.value,
      focus: state.focus,
      invalid: state.error,
      touched: state.touched,
      valid: state.value && !state.error,
    });

    return (
      <div class={classNames(classes)}>
        <label className="placeholder">{placeholder}</label>
        <textarea
          disabled={disabled}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this.onChange}
          onInput={this.onChange}
          placeholder={placeholder}
          ref={(input) => (this.input = input)}
          value={state.value}
        />
        <label class="icon" />
        {state.error && <label class="error">{state.error}</label>}
      </div>
    );
  }
}
