import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Grid, InputAdornment, TextField, Typography, Box } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from '@mui/icons-material/Lock';
import "../../static/css/login.scss";

const Login = (props) => {
  function login() {
    props.history.push("/home");
  }
  
  function newUser () {props.history.push("/new-user")}

  const {topicId} = useParams();


  return (
    <Grid
      container
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      alignContent={"center"}
      spacing={8}
    >
      <Grid item>
        <Typography variant={"h3"} align={"center"}>
          Welcome to Attica Voting
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant={"h5"} align={"center"}>
            Sign in to vote for {topicId} Election
        </Typography>
      </Grid>
      <LoginFields
        username={props.username}
        setUsername={props.setUsername}
        password={props.password}
        setPassword={props.setPassword}
        {...props}
      />
      <Grid item container justifyContent={"center"} alignItems={"center"} alignContent={"center"}>
        <Grid item style={{ width: "80%" }} align={"center"}>
          <Button
            color={"primary"}
            variant={"contained"}
            style={{ width: "50%", height: "50px" }}
            onClick={() => {
              
            }}
          >
            Login
          </Button>
        </Grid>
        <Box pt={3}>
            <Typography> 
                New User?  
                <Button color={"primary"} variant="text" style={{fontWeight: "bold"}}
                    onClick={() => {newUser()}}> 
                Sign Up
                </Button> 
            </Typography>
           
        </Box>
      </Grid>
    </Grid>
  );
};
  

const LoginFields = (props) => {
  return (
    <Grid
      item
      container
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      alignContent={"center"}
      spacing={3}
      style={{ width: "90%" }}
    >
      <Grid item style={{ width: "90%" }}>
        <TextField
          fullWidth
          color={"primary"}
          variant={"outlined"}
          autoComplete={"username"}
          id={"username"}
          label={"Username"}
          value={props.username}
          onChange={(e) => props.setUsername(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") null;
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item style={{ width: "90%" }}>
        <TextField
          fullWidth
          color={"primary"}
          variant={"outlined"}
          type={"password"}
          id={"password"}
          label={"Password"}
          value={props.password}
          onChange={(e) => props.setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") null;
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon/>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
    </Grid>
  );
};

export default Login;
