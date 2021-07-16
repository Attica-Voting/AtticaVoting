import React, { useState } from "react";
import { Box, Typography, Grid } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { Skeleton } from "@material-ui/lab";

import { useQuery, useMutation } from "@apollo/client";
import { ElectionDisplay } from "../../graphql/query";
import { SubmitVote } from "../../graphql/mutation"

import "../../static/css/global.scss";
import Navigation from "../utils/Navigation";
import Confirmation from "./Confirmation";
import ScrollToButton from "../utils/ScrollToButton";
import SubmitButton from "../utils/SubmitButton";
import CountdownTimer from "../utils/CountdownTimer";
import Race from "./Race";

function Election(props) {
  const { topicId } = useParams();
  const [raceItemSelection, setRaceItemSelection] = useState({});

  const { loading, error, data } = useQuery(ElectionDisplay, {
    variables: { title: topicId },
  });

  const [submitVote] = useMutation(SubmitVote)

  if (error) return `Error! ${error.message}`;
  if (loading) return <Skeleton variant="rect" width={"100%"} height={"100%"} />;

  return (
    <>
      <Navigation {...props} />
      <Box width={"100vw"} height={"100vh"} style={{ scrollBehavior: "smooth" }}>
        <Box width={"100%"} height={"100%"}>
          <Box minHeight={500} display={"flex"} flexDirection={"column"} bgcolor={"primary.main"}>
            <HeaderBar title={data.electionLookup.title} description={data.electionLookup.description}/>
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
                raceItemSelection={raceItemSelection}
                setRaceItemSelection={setRaceItemSelection}
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
          onClick={() => submitVote()}
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
      <CountdownTimer />
    </Grid>
  );
}

export default Election;