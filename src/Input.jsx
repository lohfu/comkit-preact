import { h } from 'preact'
import classNames from 'classnames'

import FormField from './FormField'

class Input extends FormField {
  render () {
    const { type = 'text', disabled, placeholder } = this.props
    const state = this.state

    const classes = Object.assign({
      'field-container': true,
      cell: true,
      empty: !state.value,
      filled: !!state.value,
      dirty: state.dirty,
      focus: state.focus,
      invalid: !!state.error,
      touched: state.touched,
      valid: !state.error
    })

    return (
      <div className={classNames(classes)}>
        <label className='placeholder'>{placeholder}</label>
        <input
          name={this.props.name}
          disabled={disabled}
          onBlur={this.onBlur}
          onChange={this.onChange}
          onInput={this.onChange}
          onFocus={this.onFocus}
          placeholder={placeholder}
          ref={(input) => { this.input = input }}
          type={type}
          value={state.value || ''}
        />
        <label className='icon' />
        {state.error && <label className='error'>{state.error}</label>}
      </div>
    )
  }
}

export default Input
