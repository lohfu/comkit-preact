import { h } from 'preact'

import classNames from 'classnames'

import FormField from './FormField'

class TextArea extends FormField {
  onFocus (e) {
    this.setState({
      focus: true,
      touched: true
    })

    // TODO still needed?
    if (document.documentField.dataset.browser === 'IE11') {
      // make text area behave like input in IE (input fires both
      // focus and input when focusing input elements, but not textareas)
      this.setValue(e.target.value)
    }
  }

  render () {
    const { disabled, name, placeholder } = this.props
    const state = this.state

    const classes = {
      'field-container': true,
      cell: true,
      empty: !state.value,
      filled: !!state.value,
      dirty: state.dirty,
      focus: state.focus,
      invalid: !!state.error,
      touched: state.touched,
      valid: !state.error
    }

    return (
      <div className={classNames(classes)}>
        <label className='placeholder'>{placeholder}</label>
        <textarea
          name={name}
          disabled={disabled}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this.onChange}
          placeholder={placeholder}
          ref={(input) => (this.input = input)}
          value={state.value}
        />
        <label className='icon' />
        {state.error && <label className='error'>{state.error}</label>}
      </div>
    )
  }
}

export default TextArea
