import { h, Component } from 'preact';

import { bindAll, startCase } from 'lowline';

export default class FormElement extends Component {
  constructor(props) {
    super(props);

    bindAll(this, ['reset', 'validate', 'onChange', 'onBlur', 'onFocus']);

    this.state = {
      dirty: false,
      value: props.value,
      error: this.validate(props.value),
    };
  }

  componentDidMount() {
    this.unregister = this.context.registerInput(this);
  }

  componentWillUnmount() {
    this.unregister();
  }

  onBlur(e) {
    this.setState({
      focus: false,
    });

    this.setValue(e.target.value);
  }

  onChange(e) {
    e.preventDefault();

    if (document.activeElement !== e.target && !e.target.value) return;

    this.setValue(e.target.value);
  }

  onFocus() {
    this.setState({
      focus: true,
      touched: true,
    });
  }

  focus() {
    this.input.focus();
  }

  isValid() {
    return !this.state.error;
  }

  getValue() {
    return this.state.value;
  }

  setValue(value) {
    if (value === '') {
      value = undefined;
    }

    this.setState({
      dirty: value !== this.props.value,
      error: this.validate(value),
      value,
    });

    this.context.setAttribute(this.props.name, value);
  }

  validate(value) {
    const { required, tests = [] } = this.props;

    if (required) {
      if (value == null || value === '') {
        return typeof required === 'string' ? required : 'Required';
      }
    } else if (value == null || value === '') {
      return undefined;
    }

    for (let i = 0; i < tests.length; i += 1) {
      const [fnc, msg = 'Error'] = tests[i];

      if (!fnc(value)) return msg;
    }

    return undefined;
  }

  reset() {
    this.setValue(this.props.value);
  }
}
