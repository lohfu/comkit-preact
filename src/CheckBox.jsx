import { h, Component } from 'preact';

import { omit } from 'lowline';

import FormElement from './FormElement';

export default (props, context) => {
  let { onChange, idAttribute, name, value } = context.group;

  if (idAttribute && value) {
    value = value.map((item) => item[idAttribute]);
  }

  return (
    <label class="checkbox">
      <input type="checkbox" name={name} checked={value && value.includes(props.value)} value={props.value} onChange={onChange} /><i></i><span>{props.title}</span>
    </label>
  );
};
