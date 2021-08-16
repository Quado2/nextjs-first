function MeetupDetail (props){
    return (
        <div>
            <ul>
                <li><h1>{props.title}</h1></li>
                <li><img src={props.image} alt={props.title} /> </li>
                <li><h3>{props.address}</h3></li>
                <li><h3>{props.description}</h3></li>
            </ul>
        </div>
    )
}

export default MeetupDetail