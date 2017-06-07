import { h } from 'preact';

import { omit } from 'lowline';

const CheckBox = (props, context) => {
  let { onChange, idAttribute, name, value } = context.group;

  if (idAttribute && value) {
    value = value.map((item) => item[idAttribute]);
  }

  return (
    <label className="checkbox">
      <input
        type="checkbox"
        name={name}
        checked={!!value && value.includes(props.value)}
        value={props.value} onChange={onChange}
      /><i /><span>{props.title}</span>
    </label>
  );
};

export default CheckBox;
