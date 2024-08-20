import express, { request, response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import route from './routes/routes';

const app = express();
app.use(express.json());
dotenv.config();

const port  = process.env.PORT || 7770
const mongoUrl = process.env.MONGO_URL as string

if(!mongoUrl){
   throw new Error('mongoDB url not define in the environment variables');
   
}
mongoose.connect(mongoUrl, {
    dbName: 'student-app'
}).then(() => {
    console.log('Databse is connected');
    createServer();
}).catch((error) => {
    console.error(`Database connectio error: ${error.message}`)
    process.exit(1);
});


app.use('/', route);

let server: ReturnType<typeof app.listen> | null = null
function createServer(): void {
    try{
        server = app.listen(port, () => {
            console.log(`Server runnig on port number http://localhost:${port}`)
        });
    }catch(error) {
        console.error('Failed to start server: ', error)
    }
}


function shutDown(): void {
    if(server){
        server.close(() => {
            console.log('Server closed');
            mongoose.connection.close()
            .then(() => {
                console.log('Mongo connection closed');
                process.exit(0)
            }).catch((error) => {
                console.error("Error while closing Mongo connection: ", error);
                process.exit(1)
            })
        })
    } else {
        process.exit(0);
    }
}

process.on('SIGINT', shutDown);
process.on('SIGTERM', shutDown);



