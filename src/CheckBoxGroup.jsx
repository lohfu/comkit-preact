import { h } from 'preact';

import classNames from 'classnames';

import { omit } from 'lowline';

import FormField from './FormField';

class CheckBoxGroup extends FormField {
  constructor(props, ...args) {
    if (props.values && typeof props.values[0] === 'object' && !props.idAttribute) {
      throw new Error('Object arrays need idAttribute');
    }

    if (!Array.isArray(props.value)) {
      props.value = [props.value];
    }

    super(props, ...args);
  }

  onChange(e) {
    e.preventDefault();

    if (document.activeElement !== e.target) return;

    let groupValue = this.state.value || [];
    let inputValue = +e.target.value || e.target.value;

    if (e.target.checked) {
      if (this.props.idAttribute) {
        inputValue = this.props.values.find((item) => item[this.props.idAttribute] === inputValue);
      }

      groupValue = groupValue.concat(inputValue).sort(this.props.idAttribute ? (a, b) => {
        let sortAttribute = this.props.sortAttribute || this.props.idAttribute;
        let desc = false;

        if (sortAttribute.startsWith('-')) {
          sortAttribute = sortAttribute.slice(1);
          desc = true;
        }

        if (a[sortAttribute] < b[sortAttribute]) {
          return desc ? 1 : -1;
        }

        if (a[sortAttribute] > b[sortAttribute]) {
          return desc ? -1 : 1;
        }

        return 0;
      } : null);
    } else {
      groupValue = groupValue.filter((value) => {
        if (this.props.idAttribute) {
          return value[this.props.idAttribute] !== inputValue;
        }

        return value !== inputValue;
      });
    }

    this.setValue(groupValue.length ? groupValue : undefined);
  }

  getChildContext() {
    return {
      group: {
        value: this.state.value,
        idAttribute: this.props.idAttribute,
        name: this.props.name,
        onChange: this.onChange,
      },
    };
  }

  render() {
    const { type = 'text', disabled, children, placeholder, values, value, idProp, nameProp } = this.props;
    const state = this.state;

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
      <div className={classNames(classes)}>
        {children}
        <label className="icon" />
        {state.error && <label className="error">{state.error}</label>}
      </div>
    );
  }
}

export default CheckBoxGroup;
