//  /api/new-meetup

import {MongoClient} from 'mongodb'


async function handler(req, res){
    //we can find the type of request sent by req.method function
    if(req.method === 'POST'){
        const data = req.body;
        const {title, image, address, description} = data;
        
        try{
            const client = await MongoClient.connect('mongodb+srv://quado:qasw1234@cluster0.ggutm.mongodb.net/meetup?retryWrites=true&w=majority')
            const db = client.db();

            const meetupsCollection = db.collection('meetups')
            const result = await meetupsCollection.insertOne({data})
            
            console.log(result);

            client.close();

            res.status(201).json({message:"meetups added"})
        }
        catch(error){
            console.log(error)
            res.status(400).json("something bad happened")

        }
        
    }
}


export default handler