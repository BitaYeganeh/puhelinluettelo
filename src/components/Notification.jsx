const Notification = ({ message, type }) => {
  if (message === null) {
    return null // don't render anything if there's no message
  }

const style ={
    color: type==='error' ? 'red' : 'green',

}
  return <div style={style}>{message}</div>
}

export default Notification