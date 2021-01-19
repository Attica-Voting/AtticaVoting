import React, {useState} from "react";
import {
    Typography, Box, Grid, Link, TableContainer, Paper, Table, withStyles, TableCell, TableBody, TableRow
} from "@material-ui/core";
import Navigation from "./Navigation";
import clsx from "clsx";
import {useStyles} from "../static/constants";
import {Style} from "@material-ui/icons";

function Confirmation(props) {
    const classes = useStyles();
    const [receiptTable, setReceiptTable] = useState(false);

    return (
        <div className={classes.root}>
            <Navigation {...props} />
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: props.open,
                })}
            >
                <div className={classes.drawerHeader}/>
            <ConfirmationMessage setReceiptTable={setReceiptTable} receiptTable={receiptTable} {...props}/>
            {receiptTable ?
                <ReceiptTable/>
                : null
            }
            </main>

        </div>
    )
}

function ConfirmationMessage(props) {
    return (
        <>
            <Box pt={5}>
                <Grid container justify='center'
                      alignItems='center' alignContent='center'>
                    <Grid item>
                        <Typography variant='h3'>
                            Thank you for voting!
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Box pt={4}>
                            <Typography variant='h6'>
                                If you would like to view the receipt for your vote click
                                <Link onClick={() => props.setReceiptTable(!props.receiptTable)}
                                      color="primary" style={{ textDecoration: 'none' }}
                                >  here  </Link>
                                or if you would like to learn more about
                                Distributed Ledger Technology click
                                <Link onClick={() => props.history.push('dlinfo')} color="primary" style={{ textDecoration: 'none' }}> here </Link>
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

function createData(name, value) {
    return {name, value};
}

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const rows = [
    createData('TopicId', '0'),
    createData('Sequence', '0'),
    createData('Running Hash', '0'),
    createData('Message', '0'),

]

function ReceiptTable() {
    const classes = useStyles();

    return (
        <>
            <Box pt={5}>
                <TableContainer component={Paper}>
                    <Table className={classes.table}>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {row.value}
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

        </>
    )
}

export default Confirmation;