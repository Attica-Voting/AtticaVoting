import React, {useState} from "react";
import { Box, Grid, Typography } from "@material-ui/core";

import ElectionItemLayout from "../cards/ElectionItemLayout";
import AmendmentCard from "../cards/AmendmentCard";
import ItemCard from "../cards/ItemCard";
import CandidateCard from "../cards/CandidateCard";
import RankedCandidateCard from "../cards/rankedChoice/RankedCandidateCard"

function Race(props) {

  function searchCandidateImage(name) {
    let candidateName = name.split(" ");
    return '/images/candidates/' + candidateName[0].toLowerCase() + '.jpg';
  }

  function shuffle(electionItem) {
    return (
      electionItem
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
    )
  }
  

  /*const description = props.raceItemSelection[props.race._id]
    ? props.race.candidates.find(
        (candidate) => candidate._id === props.raceItemSelection[props.race._id]
      ).description
    : props.race.description;*/

    const description = props.race.description

  function DetermineDisplay() {
    if (props.race.candidates) {
      const shuffled = shuffle(props.race.candidates)
      return (
        <>
          {shuffled.map((candidate, index) => {
            const checkedCandidate = props.raceItemSelection[props.race._id] === candidate._id;
            return (
              <Grid item key={index}>
                <CandidateCard
                  raceID={props.race._id}
                  checked={checkedCandidate}
                  candidate={candidate}
                  image={searchCandidateImage(candidate.name)}
                  raceItemSelection={props.raceItemSelection}
                  setRaceItemSelection={props.setRaceItemSelection}
                />
              </Grid>
            )}
          )}
        </>
      )
    }
    else if (props.race.items){
      const shuffled = shuffle(props.race.items)
      return (
        shuffled.map((item, index) => {
          const checkedItem = props.raceItemSelection[props.race._id] === item._id;
          return (
            <Grid item key={index}>
              <ItemCard
                checked={checkedItem}
                raceID={props.race._id}
                item={item}
                image={searchCandidateImage(item.name)}
                raceItemSelection={props.raceItemSelection}
                setRaceItemSelection={props.setRaceItemSelection}
              />
            </Grid>
          )
        })
      )
    }
    else {
      return (
        <>
          <Typography>other card</Typography>
        </>
      )
    }
  }

  return (
    <>
      <Box minHeight={626} bgcolor={props.backgroundColor}>
        <ElectionItemLayout align={props.align} title={props.race.title} description={description}>
          <DetermineDisplay/>
        </ElectionItemLayout>
      </Box>
      <WaveDivider flip={props.flipped}/>
    </>
  );
}


const WaveDivider = (props) => {
  return (
    <Box
      color={"neutral.dark"}
      style={{ transform: props.flip ? "matrix(1,0,0,-1,0,0)" : undefined }}
    >
      <svg style={{ display: "block" }} viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path
          className={"wave"}
          fill="currentColor"
          d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z"
        />
      </svg>
    </Box>
  );
};

export default Race;
