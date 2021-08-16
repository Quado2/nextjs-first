import { MongoClient, ObjectId } from "mongodb"

import MeetupDetail from "../../components/meetups/MeetupDetail"

function MeetupDetails(props) {
    return (
        <MeetupDetail
            image={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address}
            description={props.meetupData.description}
        />
    )
}


//If we are going to use getStaticProps, It means that the server needs
// to have generated these pages in advance and kept. But how does the 
// next know the ids for which pages will be generated. WEll. getStatiPath defines that
// it sets the path as shown below. If we setfall to true, it means that it does one has not
// specified all the id needed. If we set it to false, it implies that one had setup all the
// possible ID's and hence any request for an Id that's not specified ther should be
// responded with a 404
export async function getStaticPaths(){
    //fetch data for consumption

    const client = await MongoClient.connect('mongodb+srv://quado:qasw1234@cluster0.ggutm.mongodb.net/meetup?retryWrites=true&w=majority')
    const db = client.db();
    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({},{_id:1}).toArray();
    client.close();

    return{
        fallback: true,
        paths: meetups.map(meetup => ({params:meetup._id.toString()}))
    }

}

export async function getStaticProps(context) {
    //fetch data for consumption

    const meetupId = context.params.meetupId //meetupId is the name of the parent folder: i.e recall [meetupId]

    const client = await MongoClient.connect('mongodb+srv://quado:qasw1234@cluster0.ggutm.mongodb.net/meetup?retryWrites=true&w=majority')
    const db = client.db();
    const meetupsCollection = db.collection('meetups');

    const selectedMeetup = await meetupsCollection.findOne({
        _id: ObjectId(meetupId),
        }).toArray();
    client.close();



    return{
        props:{
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.data.title,
                description: selectedMeetup.data.description,
                image: selectedMeetup.data.image,
                address: selectedMeetup.data.address
            }
        }
    }
}


export default MeetupDetails