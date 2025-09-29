const Notification = ({ message, type }) => {
  if (message === null) {
    return null // don't render anything if there's no message
  }

const style = {
    color: type === 'error' ? '#721c24' : '#155724',         // text color
    backgroundColor: type === 'error' ? '#f8d7da' : '#d4edda', // background color
    border: `2px solid ${type === 'error' ? '#dc3545' : '#28a745'}`, // border color
    padding: '10px 15px',   // space inside the box
    borderRadius: '5px',    // rounded corners
    marginBottom: '10px',   // spacing below the box
    fontWeight: 'bold',     // make text bold
  }
  return <div style={style}>{message}</div>
}

export default Notification