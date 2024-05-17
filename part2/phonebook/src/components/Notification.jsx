const Notification = ({status ,message}) => {
    if(status === null){
        return null
    }

    const success = {
        color: "green",
        background: "lightgrey",
        fontSize: "20px",
        borderStyle: "solid",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "10px"
    }

    const error = {
        color: "red",
        background: "lightgrey",
        fontSize: "20px",
        borderStyle: "solid",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "10px"
    }

    const style = status === true ? success : error;
    console.log(style);
    console.log("Status: ", status)
    console.log("Message: ", message);
    return(
        <div style={style}>
            {message}
        </div>
    )
}

export default Notification;