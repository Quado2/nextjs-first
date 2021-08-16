import {useRouter} from 'next/router'
import Head from 'next/head'
import { Fragment } from 'react';

import NewMeetupForm from '../../components/meetups/NewMeetupForm'

function NewMeetUpPage() {

   const router =  useRouter();

   async function addMeetupHandler(enteredMeetupData) {
       try{
           const response = await fetch('/api/new-meetup',{
                method: 'POST',
                body: JSON.stringify(enteredMeetupData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const data = await response.json()
            console.log(data)
            
            router.push('/')
       }
       catch(err){
           console.log(err)
       }
        
    }


    return(
        <Fragment>
            <Head>
                <title>Create New Meetup</title>
                <meta name='description' content='Well welll, this shows in the description found in search engines' />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </Fragment>
    )
        
        
}

export default NewMeetUpPage;