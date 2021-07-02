import express from "express";
import http from "http";

import { ApolloServer, PubSub, AuthenticationError } from "apollo-server-express";
import { express as voyagerMiddleware } from "graphql-voyager/middleware/index.js";

import dotenv from "dotenv";

import { promises as fs } from "fs";

import HederaClass from './hedera.js';
import mocks from "./mocking.js";
import { typeDefs, resolvers } from "./schema.js";

const pubsub = new PubSub();

const app = express();
const serverMocks = process.env.MOCK ? mocks : undefined;
const serverTracing = process.env.MOCK ? true : undefined;

dotenv.config(); //loads .env file that contains passwords and such

const confirmList = [];

const  hederaClient = new HederaClass("", "", process.env.NODE_ENV === 'development' ? "default" : "debug") //load global Hedera object
hederaClient.subscribeToMirror(confirmList)

const server = new ApolloServer({ //this is the server woohoo, the graphql server more specifically
	typeDefs, //schema.graphql file
	resolvers, 
	mocks: serverMocks, //uses mocking.js, need npm run mockServer, generates pysedo-random data
	tracing: serverTracing,
	formatError: (err) => { //formats error and logs internal server error
		if (err.extensions.code === "INTERNAL_SERVER_ERROR") {
			if (err.extensions) console.error(`${err.extensions.code}: ${err.message}`);
			else console.error(err);
		}
		return err;
	},
	context: async ({ req, connection }) => { //creates context, global
		return {
			pubsub: pubsub,
            //hederaClient: hederaClient
		};
	}
});

server.start();
server.applyMiddleware({ app }); //embeds express into graph server

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

//TODO: convert to graph
app.post('/api/submit', async (req,res) => {
    try{    
        let submittedVote = ``;
        const id = req.body.name + req.body.email;
        const anonID = security.hash(`${id}${Math.floor(Math.random() * 1000)}`);

        submittedVote += `${anonID}~`;

        const votes = JSON.stringify(req.body.candidatesChosen);
        const encrypted = await security.encrypt(`${anonID}~${votes}`, pubKey);
        const encoded = security.encode(encrypted);

        submittedVote += `${encoded}~`;

        const timestamp = Date.now();

        submittedVote += `${timestamp}`
        
        HederaObj.sendHCSMessage(submittedVote);

        log('API Submit', `Vote Submitted!\n~AnonId=${anonID}\n~EncVote=${encoded}\n~Timestamp=${timestamp}`);

        confirmList.push({aid: anonID, resp: res});
    }catch (err){
        log('API Submit Error', err);
    }
});

app.get('/api/candidates', async (req,res) => {
    const candidateList = JSON.parse(await fs.readFile('./server/candidates.json'));
    res.send(candidateList);
});

console.log(__dirname + "/website/index.html")
if (process.env.NODE_ENV === "development") {
	app.use("/voyager", voyagerMiddleware({ endpointUrl: "/graphql" }));
} else { //if in production give specific page
	app.get("index.html", (req, res) => res.sendFile(__dirname + "/website/index.html"));
    
	app.use(express.static(__dirname + "/website"));
	app.get("*", (req, res) => res.sendFile(__dirname + "/website/index.html"));
}

const PORT = 8000;
const httpServer = http.createServer(app);

server.installSubscriptionHandlers(httpServer); //install subscription for graph
httpServer.listen(PORT);

console.info(`🚀 Server Ready at localhost:${PORT}${server.graphqlPath}`);
console.info(`🚀 Subscriptions Ready at ws://localhost:${PORT}${server.subscriptionsPath}`);

