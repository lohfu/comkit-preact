import { h } from 'preact';

export default (props) => (
  <div class={`${props.type} message wrapper`}>
    <div class="container">
      {props.heading && <div class="heading">{props.heading}</div>}
      {props.body && <div class="body">{props.body}</div>}
    </div>
  </div>
);
