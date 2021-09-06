import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { APPLY_TAG_FILTER, FILTER_TAGS_BY_NAME } from "../actions";
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

const TagsContainer = ({ tags, filters, editedTags, selectedTags, dispatch }) => {
    const classes = useStyles();
    const handleChange = (event) => {
        const eventValue = event.target.name;
        const eventType = event.target.checked;
        console.log(event.target.name);
        console.log(event.target.checked);
        dispatch({ type: APPLY_TAG_FILTER, payload: { eventValue, eventType } });
    };
    const handleSearch = (event) => {
        const eventValue = event.target.value.toLowerCase();
        console.log("search value", event.target.value);
        dispatch({ type: FILTER_TAGS_BY_NAME, payload: { eventValue } });
    };
    return (
        <div className={classes.brandsFullBox}>
            <TextField id="tagSearchBar" label="Search Tag" variant="outlined" className={classes.brandSearchBar} onChange={handleSearch} />
            <Box className={classes.brandsBox}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={selectedTags.length ? (false) : (true)}
                            disabled={selectedTags.length ? (true) : (false)}
                            name="All"
                            color="primary"
                        />
                    }
                    label="All"
                />
                <br></br>
                {editedTags.length ? (
                    editedTags.map((tag, index) => {
                        return (
                            <div key={index}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            onChange={handleChange}
                                            name={tag}
                                            color="primary"
                                        />
                                    }
                                    label={tag}
                                />
                                <br></br>
                            </div>
                        )
                    })
                ) : (
                    <p>No Matching Tags</p>
                )}
            </Box>
        </div>
    )
}

const mapStateToProps = (state) => {
    return { tags: state.tags, selectedTags: state.selectedTags, tagSearchTerm: state.tagSearchTerm, editedTags: state.editedTags }
}

export default connect(mapStateToProps)(TagsContainer);