import { h } from 'preact';

import FormElement from './FormElement';

export default class SingleCheckBox extends FormElement {
  render({ type = 'text', name, disabled, title }, state = {}) {
    const classes = Object.assign({
      cell: true,
      'field-container': true,
      empty: !state.value,
      filled: state.value,
      focus: state.focus,
      invalid: state.error,
      touched: state.touched,
      valid: state.value && !state.error,
    });

    return (
      <div class={classes}>
        <input
          name={name}
          disabled={disabled}
          onBlur={this.onBlur}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onInput={this.onChange}
          ref={(input) => { this.input = input; }}
          type="checkbox"
        />
        {title}
        <label class="icon" />
        {state.error && <label class="error">{state.error}</label>}
      </div>
    );
  }
}