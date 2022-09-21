import React from "react";
import {Box, Grid,Paper} from "@material-ui/core";

const LoginLayout = props =>
{

    return (
        <>
            <div className={"background-image"} />
            <div className={"content"}>
                <Box p={props.width < 500 ? 0 : 4}>
                    <Grid
                        container justifyContent={"center"} alignContent={"center"} alignItems={"center"}
                        style={{height: props.width < 500 ? "95vh" : "92vh"}}
                    >
                        <Grid item xs={8} >
                            <Paper elevation={8} style={{height: '90vh', position: "relative"}}>
                                <Grid
                                    container justifyContent={"center"} alignContent={"center"} alignItems={"center"}
                                    style={{height: "100%"}}
                                >
                                    <Grid item style={{width: props.width < 500 ? '95%' : '80%'}}>
                                        {props.children}
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </>
    );
};

export default LoginLayout;