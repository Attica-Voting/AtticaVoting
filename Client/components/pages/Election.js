import React, { useState } from "react";
import { Box, Typography, Grid } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { Skeleton } from "@material-ui/lab";

import { useQuery, useMutation } from "@apollo/client";
import { ElectionLookup } from "../../graphql/query";
import { SubmitVote } from "../../graphql/mutation"

import "../../static/css/global.scss";
import Navigation from "../utils/Navigation";
import Confirmation from "./Confirmation";
import ScrollToButton from "../utils/ScrollToButton";
import SubmitButton from "../utils/SubmitButton";
import CountdownTimer from "../utils/CountdownTimer";
import Race from "./Race";
import {weighted_random} from '../pages/scripts/VotingScript'

function Election(props) {
  const [votingStep, setVotingStep] = useState(0);
  const [success, setSuccess] = useState();
 

  if (votingStep === 0) {
    return <Voting setSuccess={setSuccess} setVotingStep={setVotingStep}/>
  }
  else {
    return <Confirmation votingStep={votingStep}  success={success}/>
  }

}


function Voting(props) {
  const { topicId } = useParams();
  const [raceItemSelection, setRaceItemSelection] = useState({});
  const [raceItemSelectionRanked, setRaceItemSelectionRanked] = useState({});
  const [winners, setWinners] = useState({});
  const winnerArray = []

  const { loading, error, data } = useQuery(ElectionLookup, {
    variables: { title: topicId },
  });

  const [submitVote] = useMutation(SubmitVote, {
    onCompleted({submitVote}) {
      if (submitVote) {
        console.log('vote submitted')

        const end = Math.floor(Date.now() / 1000)
        //console.log('begin', begin)
        //console.log('end', end)
        const totalTime = end - begin
        console.log('Total time:',totalTime)

        props.setSuccess(submitVote.success)
        props.setVotingStep(2)
      }
    }
  })

  if (error) return `Error! ${error.message}`;
  if (loading) return <Skeleton variant="rect" width={"100%"} height={"100%"}/>;

  //Run the simmulation
  //runScript()
  let begin
  
  function runScript() {
    begin = Math.floor(Date.now() / 1000)
    for (let i = 0; i < 5; i+=1) {
      const electionID = data.electionLookup._id
 
      const items = ['Arlo', 'Sassy', 'Razmataz', 'Banzai', 'Ranger']
      const win = weighted_random(items)

      const winnerArray = [{
        winners: win //[winner[index]]
      }]
      
      props.setVotingStep(1)
      submitVote({variables: {electionID: electionID, winners: winnerArray, timeStamp: Date.now()}})
    }
  }

  function createSubmitItems() {
    begin = Math.floor(Date.now() / 1000)
    const electionID = data.electionLookup._id
    for (const winner in winners) {
      const raceObj = {
        //raceName: winner,
        //ballotType: data.electionLookup.races.find((race) => race.title === winner).ballotType,
        winners: [winners[winner]]
      }
      winnerArray.push(raceObj)
    }

    props.setVotingStep(1)
    submitVote({variables: {electionID: electionID, winners: winnerArray, timeStamp: Date.now()}})
  }

  return (
    <>
      <Navigation {...props} />
      <Box width={"100vw"} height={"100vh"} style={{ scrollBehavior: "smooth" }}>
        <Box width={"100%"} height={"100%"}>
          <Box minHeight={400} display={"flex"} flexDirection={"column"} bgcolor={"primary.main"}>
            <HeaderBar title={data.electionLookup.electionTitle} description={data.electionLookup.description}/>
          </Box>
          {data.electionLookup.races.map((race, index) => {
            const isEven = index % 2 === 0;
            return (
              <Race
                align={isEven ? "right" : "left"}
                backgroundColor={!isEven ? "neutral.dark" : undefined}
                flipped={!isEven}
                race={race}
                key={index}
                winners={winners}
                setWinners={setWinners}
                raceItemSelection={raceItemSelection}
                setRaceItemSelection={setRaceItemSelection}
                raceItemSelectionRanked={raceItemSelectionRanked}
                setRaceItemSelectionRanked={setRaceItemSelectionRanked}
              />
            );
          })}
        </Box>
      </Box>
      <ScrollToButton {...props}>
        <SubmitButton
          color="secondary"
          size="small"
          aria-label="scroll back to top"
          {...props}
          onClick={() => createSubmitItems()}
        />
      </ScrollToButton>
    </>
  );
}

function HeaderBar(props) {
  return (
    <Grid container direction="column" justifyContent="center">
      <Box p={4}>
        <Typography variant="h2" align="center" style={{ color: "white" }}>
          {props.title}
        </Typography>
      </Box>
      <Box p={4}>
        <Typography variant="h5" align="center" style={{ color: "white" }}>
          {props.description}
        </Typography>
      </Box>
      {/*<CountdownTimer />*/}
    </Grid>
  );
}




export default Election;
