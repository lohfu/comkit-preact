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
      touched: true,
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
    });
  }

  focus() {
    this.input.focus();
  }

  touch() {
    this.setState({
      touched: true,
    });
  }

  isValid() {
    return !this.state.error;
  }

  getValue() {
    return this.state.value;
  }

  setValue(value, untouch = false) {
    if (value === '') {
      value = null;
    }

    this.setState({
      dirty: value !== this.context.initialAttributes[this.props.name],
      error: this.validate(value),
      touched: !untouch,
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
    const initialAttributes = this.context.initialAttributes;

    let hasInitialProps;

    for (const prop in initialAttributes) {
      if (initialAttributes[prop]) {
        hasInitialProps = true;
        break;
      }
    }

    this.setValue(initialAttributes[this.props.name], !hasInitialProps);
  }
}
