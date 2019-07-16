export const SET_ITEMS_SEARCH_TEXT = 'SET ITEMS SEARCH TEXT';
export const CLEAR_ITEMS_SEARCH_TEXT = 'CLEAR ITEMS SEARCH TEXT';

export function setItemsSearchText(event) {
    return {
        type: SET_ITEMS_SEARCH_TEXT,
        searchText: event.target.value
    }
}

export function clearItemsSearchText() {
    return {
        type: CLEAR_ITEMS_SEARCH_TEXT,
        searchText: ''
    }
}
