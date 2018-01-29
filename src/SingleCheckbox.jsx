import { h } from 'preact'
import classNames from 'classnames'

import FormField from './FormField'

export default class SingleCheckbox extends FormField {
  onChange (e) {
    if (e.target === this.input) {
      this.setValue(e.target.checked || null)
    }
  }

  render () {
    const { name, disabled, title, children } = this.props
    const state = this.state

    const classes = Object.assign({
      cell: true,
      'single-checkbox': true,
      'field-container': true,
      empty: !state.value,
      filled: state.value,
      focus: state.focus,
      invalid: state.error,
      touched: state.touched,
      valid: state.value && !state.error
    })

    return (
      <div className={classNames(classes)}>
        <label className='checkbox'>
          <input
            name={name}
            disabled={disabled}
            onChange={this.onChange}
            ref={(input) => { this.input = input }}
            type='checkbox'
          />
          <i />
          { (children.length && children) || <span>{title}</span> }
        </label>
        {state.error && <label className='error'>{state.error}</label>}
        <label className='icon' />
      </div>
    )
  }
}
