import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { CLOSE_ALERT } from '../actions';
import { connect } from 'react-redux';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

function AlertMessage({ showAlert, dispatch }) {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch({ type: CLOSE_ALERT })
    };
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Snackbar open={showAlert} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Added to Basket
                </Alert>
            </Snackbar>
        </div>
    );
}

const mapStateToProps = (state) => {
    return { showAlert: state.showAlert }
}

export default connect(mapStateToProps)(AlertMessage);