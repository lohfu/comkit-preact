import { h, Component } from 'preact'
import { set, bindAll } from 'lowline'

class Form extends Component {
  constructor (...args) {
    super(...args)

    bindAll(this, ['reset', 'registerField', 'onChange', 'onSubmit'])

    this.fields = []
    this.state = this.getInitialState()
  }

  getInitialState (props = this.props) {
    return {
      dirty: [],
      errors: []
    }
  }

  getChildContext () {
    return {
      registerField: this.registerField,
      onChange: this.onChange
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.values !== this.props.values) {
      this.reset()
    }
  }

  registerField (component) {
    this.fields.push(component)

    return () => {
      const index = this.fields.indexOf(component)

      this.fields.splice(index, 1)
    }
  }

  onChange ({ dirty, error, name, value }) {
    const state = {}

    const wasPreviouslyDirty = this.state.dirty.includes(name)

    if (!dirty) {
      if (wasPreviouslyDirty) {
        state.dirty = this.state.dirty.filter((n) => n !== name)
      }
    } else if (!wasPreviouslyDirty) {
      state.dirty = this.state.dirty.concat(name)
    }

    const previousError = this.state.errors.find((arr) => arr[0] === name)

    if (!error) {
      if (previousError) {
        state.errors = this.state.errors.filter((arr) => arr[0] !== name)
      }
    } else if (!previousError) {
      state.errors = this.state.errors.concat([[name, error]])
    } else if (previousError && previousError[1] !== error) {
      state.errors = this.state.errors.filter((arr) => arr[0] !== name).concat([[name, error]])
    }

    this.setState(state)
  }

  isDirty () {
    return this.state.dirty.length !== 0
  }

  isValid () {
    return this.state.errors.length === 0
  }

  validate (focus = false, touch = false) {
    const errors = this.fields.reduce((result, field) => {
      const error = field.validate()

      field.setState({ error })

      // focus first invalid element
      if (focus && result.length === 0 && error) {
        field.focus()
      }

      // only touch invalid or filled elements when validating
      if (touch) {
        if (error || field.getValue() != null) {
          field.touch()
        } else {
          field.untouch()
        }
      }

      if (error) {
        result.push([field.name, error])
      }

      return result
    }, [])

    this.setState({ errors })

    return errors.length === 0
  }

  toJSON () {
    // TODO implement returning only changed values
    // ie compare with props.values
    return this.fields.reduce((json, field) => {
      const value = field.getValue()

      if (value != null) {
        set(json, field.name, value)
      }

      return json
    }, {})
  }

  reset () {
    this.fields.forEach((field) => field.reset(true))

    this.setState(this.getInitialState())
  }

  render () {
    const { children } = this.props

    return (
      <form>{children}</form>
    )
  }
}

Form.defaultProps = {
  values: {}
}

export default Form
