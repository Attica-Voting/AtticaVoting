import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Grid, TextField, Typography, Box } from "@material-ui/core";
import "../../static/css/login.scss";


function NewUser(props) {
    return (
        <>
        <Grid
            container
            justifyContent={"center"}
            alignItems={"center"}
            alignContent={"center"}
            spacing={8}
        >
            <Grid item>
                <Typography variant={"h4"}>Create an Account</Typography>
            </Grid>
      
         
            <RegisterFields {...props}/>
        
            
           
        </Grid>
    
        </>
    )
}

function RegisterFields(props) {
    return (
              <>  
              <Box pr={2}> 
                <TextField 
                        color={"primary"}
                        variant={"outlined"}
                        autoComplete={"username"}
                        id={"first-name"}
                        label={"First Name"}
                        value={props.username}
                        onChange={(e) => props.setUsername(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") null;
                        }}
                    />
              </Box>
                <TextField
                    color={"primary"}
                    variant={"outlined"}
                    autoComplete={"username"}
                    id={"last-name"}
                    label={"Last Name"}
                    value={props.username}
                    onChange={(e) => props.setUsername(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") null;
                    }}
                />
                <Box pt={3}>
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
                    />
                </Box>
               
        </>
    )
}

export default NewUser;