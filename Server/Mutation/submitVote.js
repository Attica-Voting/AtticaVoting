var ObjectID = require('mongodb').ObjectID;

let count = 0
const SubmitVote = async (_, args, context, info) => {

  console.log('Submitting vote...')
  console.log('count', count++)

  let election = await context.db.collection("Election").findOne({_id: ObjectID(args.electionID)});

  let topicID = election.topicID;
  console.log(args.winners)

  context.hederaClient.sendHCSMessage(`${JSON.stringify(args.winners)}`, topicID);

  console.log('Vote Submitted!')


  return true
};

export default SubmitVote
