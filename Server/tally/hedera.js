import {
    Client,
    TopicMessageSubmitTransaction,
    TopicCreateTransaction,
    TopicMessageQuery,
    PrivateKey,
} from "@hashgraph/sdk";

const PRIVATE_KEY = process.env.PRIVATE_KEY
const ACCOUNT_ID = process.env.ACCOUNT_ID

import "dotenv/config";

export default class HederaClass {
    
    constructor (account, key, logStatus) {
        this.logStatus = logStatus;
        this.HederaClient = Client.forTestnet();
        this.configureAccount(account, key);
    }
    
    /*
    -------------------------------------------------------------------------
    sendHCSMessage()
    -------------------------------------------------------------------------
    Helper function given by Hedera's Cooper Kunz. Function builds a new
    ConsensusSubmitMessageTransaction and sends the messages to the
    configured TopicID
    -------------------------------------------------------------------------
    */
    // async sendHCSMessage(msg, topicID) {
    //     try {
    //         await new TopicMessageSubmitTransaction({
    //             topicId: topicID,
    //             message: msg
    //         }).execute(this.HederaClient);

    //         console.log("ConsensusSubmitMessageTransaction() ", msg);
    //     } catch (error) {
    //         console.log("ERROR: ConsensusSubmitMessageTransaction() ", error);
    //         process.exit(1);
    //     }
    // }

    async pullHCSMessages(topicID){
        let ballots = [];
        try{
            await new TopicMessageQuery()
                .setTopicId(topicID)
                .setStartTime(0)
                .setEndTime(Date.now() + 1000)
                .subscribe(
                    this.HederaClient,
                    (message) => {
                        //console.log(JSON.parse(Buffer.from(message.contents, "utf8").toString()))
                        ballots.push(JSON.parse(Buffer.from(message.contents, "utf8").toString()));
                    })
        } catch(err) {
            handleLog("ERROR: pullHCSMessages()", err, this.logStatus);
            return null;
        }
        console.log(ballots);
        return ballots;
    }

    /*
    -------------------------------------------------------------------------
    subscribeToMirror()
    -------------------------------------------------------------------------
    Helper function given by Hedera's Cooper Kunz. Function subscribes to
    the topic through the mirror consensus nodes.
    -------------------------------------------------------------------------
    */
    subscribeToMirror(confirmList) {
        try {
            new TopicMessageQuery()
                .setTopicId(this.topicId)
                .subscribe(this.HederaClient, res => {
                    let encMsg = Buffer.from(res.contents, "utf8").toString();
                    let anonID = encMsg.split('~')[0];
                    handleLog("TopicMessageQuery()", "OldConfirmation Received", this.logStatus);

                    confirmList.find(({aid}) => aid === anonID)
                        .resp.send({
                            success: true, 
                            topicId: `${this.topicId}`, 
                            runningHash: UInt8ToString(res['runningHash']), 
                            message: encMsg, 
                            sequence: `${res.sequenceNumber}`
                        });
                });
            handleLog("MirrorConsensusTopicQuery()", this.topicId.toString(), this.logStatus);
        } catch (error) {
            handleLog("ERROR: MirrorConsensusTopicQuery()", error, this.logStatus);
            process.exit(1);
        }
    }

    /*
    -------------------------------------------------------------------------
    createTopicTransaction()
    -------------------------------------------------------------------------
    Function builds a ConsensusTopicCreateTransaction object with the
    configured topic memo and operator keys. Configures the topicID variable
    to the newly created topic.
    -------------------------------------------------------------------------
    */
    async createTopicTransaction(memo) {
        try {
            const txId = await new TopicCreateTransaction()
                .setTopicMemo(memo)
                .setSubmitKey(this.operatorKey.publicKey)
                .execute(this.HederaClient);
            handleLog("ConsensusTopicCreateTransaction()", `submitted tx ${txId}`, this.logStatus);
            await sleep(3000); // wait until Hedera reaches consensus
            const receipt = await txId.getReceipt(this.HederaClient);
            const newTopicId = receipt.topicId;
            handleLog("ConsensusTopicCreateTransaction()", `success! new topic ${newTopicId}`, this.logStatus);
            this.topicId = newTopicId;
            return this.topicId;
        } catch (error) {
            handleLog("ERROR: createTopicTransaction()", error, this.logStatus);
            process.exit(1);
        }
    }

    /*
    -------------------------------------------------------------------------
    configureAccount(account, key)
    -------------------------------------------------------------------------
    Takes in the answers, if either account or key is empty, function will
    take the values from 'hederaConfig' and assign them to `operatorKey` and
    `operatorAccount`
    -------------------------------------------------------------------------
    */
    configureAccount(account, key, client) {
        try {
            if(account !== "") {
                this.operatorAccount = account;
            }else {
                this.operatorAccount = ACCOUNT_ID;
            }
            if(key !== "") {
                this.operatorKey = PrivateKey.fromString(key);
            } else {
                this.operatorKey = PrivateKey.fromString(PRIVATE_KEY);
            }

            this.HederaClient.setOperator(this.operatorAccount, this.operatorKey);

        } catch (error) {
            handleLog("ERROR: configureAccount()", error, this.logStatus);
        }
    }
}