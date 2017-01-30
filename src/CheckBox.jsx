import { h, Component } from 'preact';

import { omit } from 'lowline';

import FormElement from './FormElement';

export default (props, context) => {
  const { onChange, name, value } = context.group;

  return (
    <label class="checkbox">
      <input type="checkbox" name={name} checked={value && value.includes(props.value)} value={props.value} onChange={onChange} /><i></i><span>{props.title}</span>
    </label>
  );
};
