import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Box, Paper } from '@material-ui/core';
import { TOGGLE_BASKET, ADD_ITEM_TO_BASKET, REMOVE_ITEM_FROM_BASKET } from '../actions';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ErrorIcon from '@material-ui/icons/Error';


const useStyles = makeStyles((theme) => ({
    topBar: {
        backgroundColor: "#1EA4CE",
        width: "100%",
        height: "80px",
        textAlign: "center"
    },
    innerButtonArea: {
        width: "90%",
        textAlign: 'right',
    },
    basketButton: {
        color: "#FFFF",
        backgroundColor: "#147594",
        height: "80px",
        borderRadius: "0px"
    },
    paper: {
        width: "330px",
        position: "absolute",
        border: "3px solid #1EA4CE",
        zIndex: "2",
        marginLeft: "73%",
        marginTop: "5px",
    },
    paper2: {
        maxHeight: "300px",
        overflow: "scroll",
        textAlign: "center",
    },
    leftSide: {
        width: "60%",
        float: "left",
        textAlign: "center",
        paddingTop: "5px"
    },
    editButtons: {
        float: "right",
        width: "35%",
        paddingTop: "5px",
        marginRight: "10px"
    },
    itemCont: {
        marginBottom: "50px",
    },
    amount: {
        color: "white",
        backgroundColor: "#1EA4CE",
        pointerEvents: "none"
    },
    priceTag: {
        fontFamily: "Helvetica",
        color: "#1EA4CE",
        fontSize: "14px",
        lineHeight: "18px",
    },
    nameTag: {
        fontFamily: "Open Sans",
        color: "#191919",
        fontSize: "14px",
        lineHeight: "18px",
    },
    totalPrice: {
    },
    priceBox: {
        width: "100px",
        textAlign: "center",
        fontFamily: "Open Sans",
        color: "#1EA4CE",
        fontSize: "14px",
        lineHeight: "18px",
        margin: "10px",
        border: "3px solid #1EA4CE",
        float: "right",
        padding: "5px"
    },
    alertMessage: {
        color: "#FFA500",
        padding: "10px",
        marginTop: "10px",
        pointerEvents: "none",
        textTransform: "none"
    },
}));


const TopBar = ({ basket, totalPrice, basketIsShown, dispatch }) => {
    const classes = useStyles();

    return (<>
        <div className={classes.topBar}>
            <div className={classes.innerButtonArea}>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.basketButton}
                    startIcon={<ShoppingBasketIcon />}
                    onClick={() => dispatch({ type: TOGGLE_BASKET })}
                    disableElevation
                >
                    ₺ {Math.abs(totalPrice.toFixed(2))}
                </Button>
            </div>
        </div>
        {basketIsShown &&
            <Paper className={classes.paper}>
                <Paper elevation={0} className={classes.paper2}  >
                    {basket.length ? (
                        basket.map((item) => {
                            return (
                                <Box key={item.id} className={classes.itemCont}>
                                    <div className={classes.leftSide}>
                                        <div className={classes.nameTag}>{item.name}</div>
                                        <div className={classes.priceTag}>₺ {item.price}</div>
                                    </div>
                                    <ButtonGroup size="small" aria-label="small outlined button group" className={classes.editButtons}>
                                        <Button color="primary" variant="outlined" onClick={() => dispatch({ type: REMOVE_ITEM_FROM_BASKET, payload: { item } })}>-</Button>
                                        <Button className={classes.amount}>{item.amount}</Button>
                                        <Button color="primary" variant="outlined" onClick={() => dispatch({ type: ADD_ITEM_TO_BASKET, payload: { item } })}>+</Button>
                                    </ButtonGroup>
                                </Box>)
                        }
                        )
                    ) : (
                        <Button
                            variant="outlined"
                            className={classes.alertMessage}
                            startIcon={<ErrorIcon />}
                        >
                            Basket is empty
                        </Button>
                    )
                    }
                </Paper>
                <div className={classes.totalPrice}>
                    <div className={classes.priceBox}>₺ {Math.abs(totalPrice.toFixed(2))}</div>
                </div>
            </Paper>
        }
    </>
    )
}

const mapStateToProps = (state) => {
    return { basket: state.basket, totalPrice: state.totalPrice, basketIsShown: state.basketIsShown }
}

export default connect(mapStateToProps)(TopBar);