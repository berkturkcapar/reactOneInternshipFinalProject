import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { CHANGE_SORTING_TYPE } from '../actions';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
    sortingBox: {
        backgroundColor: "#FFFF",
        borderRadius: "3px",
        padding: "25px"
    },
}));


const SortingContainer = ({ sortingType, dispatch }) => {
    const classes = useStyles();
    const handleChange = (event) => {
        const eventValue = event.target.value;
        console.log(event.target.value);
        dispatch({ type: CHANGE_SORTING_TYPE, payload: { eventValue } });
    };

    return (
        <Box className={classes.sortingBox}>
            <FormControl component="fieldset">
                <RadioGroup aria-label="gender" name="gender1" value={sortingType} onChange={handleChange} >
                    <FormControlLabel value="lowToHigh" control={<Radio color="primary" />} label="Price Low to High" />
                    <FormControlLabel value="highToLow" control={<Radio color="primary" />} label="Price High to Low" />
                    <FormControlLabel value="newToOld" control={<Radio color="primary" />} label="New to Old" />
                    <FormControlLabel value="oldToNew" control={<Radio color="primary" />} label="Old to New" />
                </RadioGroup>
            </FormControl>
        </Box>
    )
}

const mapStateToProps = (state) => {
    return { sortingType: state.sortingType }
}

export default connect(mapStateToProps)(SortingContainer);