import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { TOGGLE_MUGS, TOGGLE_SHIRTS } from '../actions';

const useStyles = makeStyles((theme) => ({
    toggleButtons: {
        marginBottom: "10px",
    },
    activeButton: {
        backgroundColor: "#1EA4CE",
        color: "#FFFF",
        textTransform: "none",
    },
    inactiveButton: {
        backgroundColor: "#FFFF",
        color: "#1EA4CE",
        textTransform: "none",
    }
}));


const ToggleButtons = ({ isMug, dispatch }) => {
    const classes = useStyles();
    return (
        <ButtonGroup color="primary" className={classes.toggleButtons}>
            <Button className={isMug ? (classes.activeButton) : (classes.inactiveButton)} onClick={() => dispatch({ type: TOGGLE_MUGS })} >Mug</Button>
            <Button className={isMug ? (classes.inactiveButton) : (classes.activeButton)} onClick={() => dispatch({ type: TOGGLE_SHIRTS })}>Shirt</Button>
        </ButtonGroup>
    )
}

const mapStateToProps = (state) => {
    return { isMug: state.isMug }
}

export default connect(mapStateToProps)(ToggleButtons);