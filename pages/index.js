import Head from 'next/head'

import { Fragment } from 'react'
import { MongoClient } from 'mongodb'

import Meetuplist from '../components/meetups/MeetupList'


function HomePage (props) {
 
    return (
        <Fragment>
            <Head>
                <title>Nextjs Meetups</title>
                <meta name='description' content='Well welll, this shows in the description found in search engines' />
            </Head>
            <Meetuplist meetups={props.meetups} />
        </Fragment>
    )
}

// getStaticProps() is a nextjs specific funtion that we must always call for data prefetching
// it fetches the data on build and stores the page in the server.

// this means that whenever the page is requested, the same page is supplied whether the database
//has changed or not. Except we make us of the revalidate. The revalidate decides the number of 
//seconds before the page is regenerated in the server. This code is not visible in the client side
// it is only seen in the serverside. The getStaticProps can alse recieve parameter which can hold the params object

export async function getStaticProps(){
    // fetch data from an API
    const client = await MongoClient.connect('mongodb+srv://quado:qasw1234@cluster0.ggutm.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = client.db();
    const meetupsCollection = db.collection('meetups')
    const meetups = await meetupsCollection.find().toArray();

    return{
        props:{
            meetups: meetups.map(meetup => ({
                title: meetup.data.title,
                address: meetup.data.address,
                image: meetup.data.image,
                id: meetup._id.toString(),

            }))       
        },
        revalidate: 12
    }
}



/* 
    If we want the page to be generated at every time a user makes a request,
    We should then use getServerSideProps(context) function. This also gives us
    acces to the request and response objects. 
*/
// export async function getServerSideProps(context){
//     //fetch data from an API
//     const req = context.req;
//     const res = context.res;

//     return {
//         props:{
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

export default HomePage