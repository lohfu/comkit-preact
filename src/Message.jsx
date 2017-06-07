import { h } from 'preact'
import classNames from 'classnames'

const Message = (props) => (
  <div className={classNames(props.type, 'message', 'wrapper')}>
    <div className='container'>
      {props.heading && <div className='heading'>{props.heading}</div>}
      {props.body && <div className='body'>{props.body}</div>}
    </div>
  </div>
)

export default Message
