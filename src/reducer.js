import {
    FETCH_DATA, TOGGLE_MUGS, TOGGLE_SHIRTS, CHANGE_SORTING_TYPE,
    APPLY_FILTER, FILTER_BRANDS_BY_NAME, CHANGE_PAGE, FILTER_TAGS_BY_NAME, APPLY_TAG_FILTER,
    TOGGLE_BASKET, ADD_ITEM_TO_BASKET, REMOVE_ITEM_FROM_BASKET, CLOSE_ALERT
} from "./actions";


function reducer(state, action) {
    console.log("state & action", { state, action })
    const filterProducts = (brandFilters, tagFilters, mugIsShown) => {
        let filteredProducts = mugIsShown ? (state.mugs) : (state.shirts);
        if (brandFilters.length) {
            filteredProducts = filteredProducts.filter((item) => {
                return (
                    brandFilters.includes(item.manufacturer)
                )
            });
        }
        if (tagFilters.length) {
            filteredProducts = filteredProducts.filter((item) => {
                const tagsOfCurrentItem = [...item.tags];
                let tagFound = false;
                for (let i = 0; i < tagsOfCurrentItem.length; i++) {
                    if (tagFilters.includes(tagsOfCurrentItem[i])) {
                        tagFound = true;
                    }
                }
                return tagFound;
            })
        }
        return filteredProducts;
    }
    if (action.type === FETCH_DATA) {
        const tempMugArray = action.payload.items.filter((item) => {
            return item.itemType === "mug";
        });
        const tempShirtArray = action.payload.items.filter((item) => {
            return item.itemType === "shirt";
        });;
        const tempDisplayArray = tempMugArray.sort(function (a, b) { return a.price - b.price });
        const tempEditedMugArray = tempMugArray.sort(function (a, b) { return a.price - b.price });
        const tempEditedShirtArray = tempShirtArray.sort(function (a, b) { return a.price - b.price });
        const tempBrandArray = action.payload.companies.sort(function (a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
        });

        let tempTagsArray = [];
        for (let i = 0; i < action.payload.items.length; i++) {
            tempTagsArray = new Set([...tempTagsArray, ...action.payload.items[i].tags]);
        }
        const tempEditedTags = Array.from(tempTagsArray).sort((a, b) => a.localeCompare(b));
        return {
            ...state,
            displayArray: tempDisplayArray,
            shirts: tempShirtArray,
            mugs: tempMugArray,
            brands: tempBrandArray,
            editedShirts: tempEditedShirtArray,
            editedMugs: tempEditedMugArray,
            editedBrands: tempBrandArray,
            tags: tempEditedTags,
            editedTags: tempEditedTags,
        };
    }
    if (action.type === TOGGLE_SHIRTS) {
        const tempDisplayArray = filterProducts(state.filters, state.selectedTags, false);
        return {
            ...state,
            displayArray: tempDisplayArray,
            isMug: false,
            displayedPage: 1
        }
    }
    if (action.type === TOGGLE_MUGS) {
        const tempDisplayArray = filterProducts(state.filters, state.selectedTags, true);
        return {
            ...state,
            displayArray: tempDisplayArray,
            isMug: true,
            displayedPage: 1
        }
    }
    if (action.type === CHANGE_SORTING_TYPE) {
        if (action.payload.eventValue === "lowToHigh") {
            const tempShirtArray = state.shirts.sort(function (a, b) { return a.price - b.price });
            const tempMugArray = state.mugs.sort(function (a, b) { return a.price - b.price });
            const tempEditedShirtArray = state.editedShirts.sort(function (a, b) { return a.price - b.price });
            const tempEditedMugArray = state.editedMugs.sort(function (a, b) { return a.price - b.price });
            const tempDisplayArray = state.displayArray.sort(function (a, b) { return a.price - b.price });
            return {
                ...state,
                displayArray: tempDisplayArray,
                sortingType: action.payload.eventValue,
                editedShirts: tempEditedShirtArray,
                editedMugs: tempEditedMugArray,
                mugs: tempMugArray,
                shirts: tempShirtArray,
                displayedPage: 1
            }
        }
        if (action.payload.eventValue === "highToLow") {
            const tempShirtArray = state.shirts.sort(function (a, b) { return b.price - a.price });
            const tempMugArray = state.mugs.sort(function (a, b) { return b.price - a.price });
            const tempEditedShirtArray = state.editedShirts.sort(function (a, b) { return b.price - a.price });
            const tempEditedMugArray = state.editedMugs.sort(function (a, b) { return b.price - a.price });
            const tempDisplayArray = state.displayArray.sort(function (a, b) { return b.price - a.price });
            return {
                ...state,
                displayArray: tempDisplayArray,
                sortingType: action.payload.eventValue,
                editedShirts: tempEditedShirtArray,
                editedMugs: tempEditedMugArray,
                mugs: tempMugArray,
                shirts: tempShirtArray,
                displayedPage: 1
            }
        }
        if (action.payload.eventValue === "newToOld") {
            const tempShirtArray = state.shirts.sort(function (a, b) { return a.id - b.id });
            const tempMugArray = state.mugs.sort(function (a, b) { return a.id - b.id });
            const tempEditedShirtArray = state.editedShirts.sort(function (a, b) { return a.id - b.id });
            const tempEditedMugArray = state.editedMugs.sort(function (a, b) { return a.id - b.id });
            const tempDisplayArray = state.displayArray.sort(function (a, b) { return a.id - b.id });
            return {
                ...state,
                displayArray: tempDisplayArray,
                sortingType: action.payload.eventValue,
                editedShirts: tempEditedShirtArray,
                editedMugs: tempEditedMugArray,
                mugs: tempMugArray,
                shirts: tempShirtArray,
                displayedPage: 1
            }
        }
        if (action.payload.eventValue === "oldToNew") {
            const tempShirtArray = state.shirts.sort(function (a, b) { return b.id - a.id });
            const tempMugArray = state.mugs.sort(function (a, b) { return b.id - a.id });
            const tempEditedShirtArray = state.editedShirts.sort(function (a, b) { return b.id - a.id });
            const tempEditedMugArray = state.editedMugs.sort(function (a, b) { return b.id - a.id });
            const tempDisplayArray = state.displayArray.sort(function (a, b) { return b.id - a.id });
            return {
                ...state,
                displayArray: tempDisplayArray,
                sortingType: action.payload.eventValue,
                editedShirts: tempEditedShirtArray,
                editedMugs: tempEditedMugArray,
                mugs: tempMugArray,
                shirts: tempShirtArray,
                displayedPage: 1
            }
        }
        return state;
    }
    if (action.type === APPLY_FILTER) {
        if (action.payload.eventType) {
            const tempFilters = [...state.filters, action.payload.eventValue];
            const tempDisplayArray = filterProducts(tempFilters, state.selectedTags, state.isMug);
            return {
                ...state,
                filters: tempFilters,
                displayArray: tempDisplayArray,
                displayedPage: 1
            }
        }
        else {
            const tempFilters = state.filters.filter((filter) => {
                return filter !== action.payload.eventValue;
            });
            const tempDisplayArray = filterProducts(tempFilters, state.selectedTags, state.isMug);
            return {
                ...state,
                filters: tempFilters,
                displayArray: tempDisplayArray,
                displayedPage: 1
            }
        }
    }
    if (action.type === APPLY_TAG_FILTER) {
        if (action.payload.eventType) {
            const tempSelectedTags = [...state.selectedTags, action.payload.eventValue];
            const tempDisplayArray = filterProducts(state.filters, tempSelectedTags, state.isMug);
            return {
                ...state,
                selectedTags: tempSelectedTags,
                displayArray: tempDisplayArray,
                displayedPage: 1
            }
        }
        else {
            const tempSelectedTags = state.selectedTags.filter((tag) => {
                return tag !== action.payload.eventValue;
            });
            const tempDisplayArray = filterProducts(state.filters, tempSelectedTags, state.isMug);
            return {
                ...state,
                selectedTags: tempSelectedTags,
                displayArray: tempDisplayArray,
                displayedPage: 1
            }
        }
    }
    if (action.type === FILTER_BRANDS_BY_NAME) {
        if (action.payload.eventValue === "") {
            return {
                ...state,
                editedBrands: state.brands
            }
        }
        else {
            const tempEditedBrands = state.brands.filter(function (brand) { return brand.name.toLowerCase().includes(action.payload.eventValue); })
            return {
                ...state,
                editedBrands: tempEditedBrands
            }
        }
    }
    if (action.type === FILTER_TAGS_BY_NAME) {
        if (action.payload.eventValue === "") {
            return {
                ...state,
                editedTags: state.tags
            }
        }
        else {
            const tempEditedTags = state.tags.filter(function (tag) { return tag.toLowerCase().includes(action.payload.eventValue); })
            return {
                ...state,
                editedTags: tempEditedTags
            }
        }
    }
    if (action.type === CHANGE_PAGE) {
        return {
            ...state,
            displayedPage: action.payload.value
        }
    }
    if (action.type === TOGGLE_BASKET) {
        if (state.basketIsShown) {
            return {
                ...state,
                basketIsShown: false,
            }
        }
        else {
            return {
                ...state,
                basketIsShown: true,
            }
        }
    }
    if (action.type === ADD_ITEM_TO_BASKET) {
        let alreadyInBasket = false;
        let theIndex = -1;
        for (let i = 0; i < state.basket.length; i++) {
            if (state.basket[i].id === action.payload.item.id) {
                alreadyInBasket = true;
                theIndex = i;
            }
        }
        if (alreadyInBasket) {
            const tempBasketArray = state.basket;
            tempBasketArray[theIndex].amount = tempBasketArray[theIndex].amount + 1;
            return {
                ...state,
                totalPrice: state.totalPrice + action.payload.item.price,
                basket: tempBasketArray,
            };
        }
        else {
            console.log(action.payload.item.name);
            const tempBasketArray = [...state.basket, { name: action.payload.item.name, price: action.payload.item.price, id: action.payload.item.id, amount: 1 }];
            return {
                ...state,
                totalPrice: state.totalPrice + action.payload.item.price,
                basket: tempBasketArray,
                showAlert: true
            };
        }
    }
    if (action.type === REMOVE_ITEM_FROM_BASKET) {
        let tempBasketArray = state.basket;
        let theIndex = -1;
        for (let i = 0; i < state.basket.length; i++) {
            if (state.basket[i].id === action.payload.item.id) {
                theIndex = i;
                tempBasketArray[i].amount = tempBasketArray[i].amount - 1;
            }
        }
        if (tempBasketArray[theIndex].amount === 0) {
            tempBasketArray = tempBasketArray.filter((item) => {
                return item.id !== action.payload.item.id;
            });
        }
        return {
            ...state,
            totalPrice: state.totalPrice - action.payload.item.price,
            basket: tempBasketArray,
        }
    }
    if (action.type === CLOSE_ALERT) {
        return {
            ...state,
            showAlert: false
        }
    }
    console.log("No matching action type");
    return state;
}

export default reducer;