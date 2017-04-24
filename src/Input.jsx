import { h, Component } from 'preact';
import classNames from 'classnames';
import { omit } from 'lowline';

import FormElement from './FormElement';

export default class Input extends FormElement {
  render({ required, type = 'text', disabled, placeholder }, state = {}, context) {
    const classes = Object.assign({
      'field-container': true,
      cell: true,
      empty: !state.value,
      filled: state.value,
      dirty: state.dirty,
      focus: state.focus,
      invalid: state.error,
      touched: state.touched,
      valid: (!required || state.value) && !state.error,
    });

    return (
      <div class={classNames(classes)}>
        <label className="placeholder">{placeholder}</label>
        <input
          disabled={disabled}
          onBlur={this.onBlur}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onInput={this.onChange}
          placeholder={placeholder}
          ref={(input) => { this.input = input; }}
          type={type}
          value={state.value}
        />
        <label class="icon" />
        {state.error && <label class="error">{state.error}</label>}
      </div>
    );
  }
}
