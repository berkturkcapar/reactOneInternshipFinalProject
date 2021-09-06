import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import paginate from '../utils/paginate';
import Pagination from '@material-ui/lab/Pagination';
import { ADD_ITEM_TO_BASKET, CHANGE_PAGE } from '../actions';


const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        minWidth: 125
    },
    addButton: {
        marginTop: "5px",
        padding: "3px",
        textAlign: 'center',
        backgroundColor: "#1EA4CE",
        color: "#FFFF",
        width: "100%",
        textTransform: "none",
        fontFamily: "Open Sans",
        fontWeight: "600"
    },
    priceTag: {
        fontFamily: "Helvetica",
        fontSize: "14px",
        lineHeight: "20px",
        color: "#1EA4CE"
    },
    nameTag: {
        fontFamily: "Open Sans",
        fontSize: "14px",
        lineHeight: "20px",
        color: "#191919"
    },
    itemImage: {
        maxWidth: "70%",
        height: "auto"
    },
    paginationBox: {
        padding: "10px",
        display: "flex",

        alignItems: "center"
    },
    paginations: {

        margin: "auto"
    }
}));

const ItemContainer = ({ displayArray, sortingType, filters, displayedPage, dispatch }) => {
    const classes = useStyles();
    const handlePagination = (event, value) => {

        dispatch({ type: CHANGE_PAGE, payload: { value } });
    }
    const paginatedDisplayArray = paginate(displayArray);
    const thePageArray = paginatedDisplayArray.length ? (paginatedDisplayArray[displayedPage - 1]) : ([]);
    return (
        <>
            {thePageArray.length ? (
                thePageArray.map((item) => {
                    return (
                        <Grid item xs={6} sm={4} md={3} key={item.id}>
                            <Paper elevation={0} className={classes.paper}>
                                <img src="https://60e220e7a8b90f00086c600e--sharp-chandrasekhar-67f159.netlify.app/images/ayi.png" alt="ayi" className={classes.itemImage} />
                                <br />
                                <span className={classes.priceTag}>₺ {item.price}</span>
                                <br />
                                <span className={classes.nameTag}>{item.name}</span>
                                <br />
                                <Button variant="contained" color="primary" className={classes.addButton} onClick={() => dispatch({ type: ADD_ITEM_TO_BASKET, payload: { item } })}>
                                    Add
                                </Button>
                            </Paper>
                        </Grid>
                    )
                })
            ) : (
                <p>No Matching Items</p>
            )}
            <Grid item xs={12} className={classes.paginationBox}>
                <Pagination count={paginatedDisplayArray.length ? (paginatedDisplayArray.length) : (1)} color="primary" shape="rounded" page={displayedPage} onChange={handlePagination} className={classes.paginations} />
            </Grid>

        </>
    )

}

const mapStateToProps = (state) => {
    return { displayArray: state.displayArray, sortingType: state.sortingType, filters: state.filters, displayedPage: state.displayedPage }
}

export default connect(mapStateToProps)(ItemContainer);