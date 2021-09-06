import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { APPLY_FILTER, FILTER_BRANDS_BY_NAME } from "../actions";
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    brandsBox: {
        backgroundColor: "#FFFF",
        borderRadius: "3px",
        padding: "25px",
        height: "200px",
        overflow: "scroll"
    },
    brandsFullBox: {
        backgroundColor: "#FFFF",
        padding: "15px",
    },
    brandSearchBar: {
        margin: "10px",
        width: "100%",
        height: "50px"
    },
}));

const BrandsContainer = ({ brands, filters, editedBrands, dispatch, }) => {
    const classes = useStyles();
    const handleChange = (event) => {
        const eventValue = event.target.name;
        const eventType = event.target.checked;
        console.log(event.target.name);
        console.log(event.target.checked);
        dispatch({ type: APPLY_FILTER, payload: { eventValue, eventType } });
    };
    const handleSearch = (event) => {
        const eventValue = event.target.value.toLowerCase();
        console.log("search value", event.target.value);
        dispatch({ type: FILTER_BRANDS_BY_NAME, payload: { eventValue } });
    };
    return (
        <div className={classes.brandsFullBox}>
            <TextField id="brandSearchBar" label="Search Brand" variant="outlined" className={classes.brandSearchBar} onChange={handleSearch} />
            <Box className={classes.brandsBox}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={filters.length ? (false) : (true)}
                            disabled={filters.length ? (true) : (false)}
                            name="All"
                            color="primary"
                        />
                    }
                    label="All"
                />
                <br></br>
                {editedBrands.length ? (
                    editedBrands.map((brand) => {
                        return (
                            <div key={brand.id}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            onChange={handleChange}
                                            name={brand.name}
                                            color="primary"
                                        />
                                    }
                                    label={brand.name}
                                />
                                <br></br>
                            </div>
                        )
                    })
                ) : (
                    <p>No Matching Brands</p>
                )}
            </Box>
        </div>

    )
}

const mapStateToProps = (state) => {
    return { brands: state.brands, filters: state.filters, brandSearchTerm: state.brandSearchTerm, editedBrands: state.editedBrands }
}

export default connect(mapStateToProps)(BrandsContainer);