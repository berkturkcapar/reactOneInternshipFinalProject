import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import axios from "axios";
import { createStore } from "redux";
import reducer from '../reducer';
import { FETCH_DATA } from '../actions';
import { Provider } from 'react-redux';
import ItemContainer from '../components/ItemContainer';
import ToggleButtons from '../components/ToggleButtons';
import SortingContainer from '../components/SortingContainer';
import BrandsContainer from '../components/BrandsContainer';
import TagsContainer from '../components/TagsContainer';
import TopBar from '../components/TopBar';
import AlertMessage from '../components/AlertMessage';



const useStyles = makeStyles((theme) => ({
    main: {
        backgroundColor: "#FAFAFA",
    },
    root: {
        flexGrow: 1,
        marginLeft: "100px",
        marginRight: "100px",
        marginTop: "50px",
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        minWidth: 125
    },

}));

const initialStore = {
    displayArray: [],
    mugs: [],
    shirts: [],
    tags: [],
    brands: [],
    editedBrands: [],
    editedTags: [],
    sortingType: "lowToHigh",
    isMug: true,
    filters: [],
    selectedTags: [],
    editedShirts: [],
    editedMugs: [],
    brandSearchTerm: "",
    tagSearchTerm: "",
    displayedPage: 1,
    basket: [],
    totalPrice: 0,
    basketIsShown: false,
    showAlert: false
}

const store = createStore(reducer, initialStore, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const MainPage = () => {
    const classes = useStyles();
    // const [sortingType, setSortingType] = useState('lowToHigh');
    const [items, setItems] = useState([]);
    const [companies, setCompanies] = useState([]);

    const getItems = () => {
        axios.get("https://getirserver.herokuapp.com/api/products").then((res) => {
            const itemArray = res.data.map((item) => {
                return {
                    tags: item.tags,
                    price: item.price,
                    name: item.name,
                    description: item.description,
                    slug: item.slug,
                    id: item.added,
                    manufacturer: item.manufacturer,
                    itemType: item.itemType
                };
            });
            setItems(itemArray);
        });
    };

    const getCompanies = () => {
        axios.get("https://getirserver.herokuapp.com/api/companies").then((res) => {
            const companyArray = res.data.map((company) => {
                return {
                    name: company.slug,
                    id: company.account
                };
            });
            setCompanies(companyArray);
        });
    };

    useEffect(() => {
        store.dispatch({ type: FETCH_DATA, payload: { items, companies } });
    }, [items, companies])

    useEffect(() => {
        getItems();
        getCompanies();
    }, [])

    return (
        <Provider store={store}>
            <Box className={classes.main}>
                <TopBar></TopBar>
                <div className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={3}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <h4>Sorting</h4>
                                    <SortingContainer></SortingContainer>
                                </Grid>
                                <Grid item xs={12}>
                                    <h4>Brands</h4>
                                    <BrandsContainer></BrandsContainer>
                                </Grid>
                                <Grid item xs={12}>
                                    <h4>Tags</h4>
                                    <TagsContainer></TagsContainer>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={9}>
                            <h3>Products</h3>
                            <ToggleButtons></ToggleButtons>
                            <Grid container spacing={3}>
                                <ItemContainer></ItemContainer>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </Box>
            <AlertMessage></AlertMessage>
        </Provider>
    )
}

export default MainPage
