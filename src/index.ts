import {
  Canister,
  Record,
  StableBTreeMap,
  Vec,
  Void,
  int,
  query,
  text,
  update,
} from "azle";
import { v4 as uuidv4 } from "uuid";

// Define the MenuItem structure
const MenuItem = Record({
  id: text,
  name: text,
  description: text,
  price: int,
});

type MenuItem = typeof MenuItem;

// Define the TableReservation structure
const TableReservation = Record({
  id: text,
  name: text,
  date: text,
  time: text,
  numberOfGuests: int,
});

type TableReservation = typeof TableReservation;

// Initialize the menu items and table reservations storage
let menuItemsStorage = StableBTreeMap(text, MenuItem, 0);
let tableReservationsStorage = StableBTreeMap(text, TableReservation, 0);

export default Canister({
  // Add a new menu item
  addMenuItem: update([text, text, int], text, (name, description, price) => {
    const id = uuidv4();
    menuItemsStorage.insert(id, {
      id: id,
      name: name,
      description: description,
      price: price,
    });
    return id;
  }),

  // Update an existing menu item
  updateMenuItem: update(
    [text, text, text, int],
    Void,
    (id, name, description, price) => {
      let menuItemOpt = menuItemsStorage.get(id);
      if ("None" in menuItemOpt) {
        throw new Error("Menu item not exist");
      }

      menuItemsStorage.insert(id, {
        id: id,
        name: name,
        description: description,
        price: price,
      });
    }
  ),

  // List all menu items
  getMenuItems: query([], Vec(MenuItem), () => {
    return menuItemsStorage.values();
  }),

  // Add a table reservation
  addTableReservation: update(
    [text, text, text, int],
    text,
    (name, date, time, numberOfGuests) => {
      const id = uuidv4();
      tableReservationsStorage.insert(id, {
        id: id,
        name: name,
        date: date,
        time: time,
        numberOfGuests: numberOfGuests,
      });
      return id;
    }
  ),

  // List all table reservations
  getTableReservations: query([], Vec(TableReservation), () => {
    return tableReservationsStorage.values();
  }),
});
