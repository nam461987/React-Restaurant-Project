import {combineReducers} from 'redux';
import restaurants from './restaurants.reducer';
import restaurant from './restaurant.reducer';
import branchs from './branchs.reducer';
import branch from './branch.reducer';
import ingredients from './ingredients.reducer';
import ingredient from './ingredient.reducer';
import categories from './categories.reducer';
import category from './category.reducer';
import units from './units.reducer';
import unit from './unit.reducer';
import channels from './channels.reducer';
import channel from './channel.reducer';
import sizes from './sizes.reducer';
import size from './size.reducer';
import menus from './menus.reducer';
import menu from './menu.reducer';
import prices from './prices.reducer';
import price from './price.reducer';
import tables from './tables.reducer';
import table from './table.reducer';
import processes from './processes.reducer';
import process from './process.reducer';

const reducer = combineReducers({
    restaurants,
    restaurant,
    branchs,
    branch,
    ingredients,
    ingredient,
    categories,
    category,
    units,
    unit,
    channels,
    channel,
    sizes,
    size,
    menus,
    menu,
    prices,
    price,
    tables,
    table,
    processes,
    process
});

export default reducer;
