import {
  $query,
  $update,
  Record,
  StableBTreeMap,
  Vec,
  Result,
  nat64,
  ic,
  Opt,
  match,
  nat,
  int,
} from "azle";
import { v4 as uuidv4 } from "uuid";

// Define the MenuItem structure
type MenuItem = Record<{
  id: string;
  name: string;
  description: string;
  price: nat;
  createdAt: nat64;
  updatedAt: Opt<nat64>
}>;

// Define the MenuItem structure
type MenuItemPayload = Record<{
  name: string;
  description: string;
  price: nat;
}>;

// Define the TableReservation structure
type TableReservation = Record<{
  id: string;
  name: string;
  date: string;
  time: string;
  numberOfGuests: int;
  createdAt: nat64;
  updatedAt: Opt<nat64>
}>;

// Define the TableReservation structure
type TableReservationPayload = Record<{
  name: string;
  date: string;
  time: string;
  numberOfGuests: int;
}>;

// Initialize the menu items and table reservations storage
const menuItemsStorage = new StableBTreeMap<string, MenuItem>(0, 44, 1024);
const tableReservationsStorage = new StableBTreeMap<string, TableReservation>(1, 44, 1024);

// Add a MenuItem
$update;
export function addMenuItem(payload: MenuItemPayload): Result<MenuItem, string> {
  try {
    // Payload validation
    if (!payload.name || !payload.description || payload.price <= 0) {
      throw new Error("Invalid payload for adding a menu item.");
    }

    // Explicit property setting
    const id = uuidv4();
    const menuItem: MenuItem = {
      id: id,
      name: payload.name,
      description: payload.description,
      price: payload.price,
      createdAt: ic.time(),
      updatedAt: Opt.None,
    };

    // Insert the menu item
    menuItemsStorage.insert(id, menuItem);
    return Result.Ok<MenuItem, string>(menuItem);
  } catch (error) {
    // Error handling
    return Result.Err<MenuItem, string>(`Failed to add menu item: ${error}`);
  }
}

// Update an existing menu item
$update;
export function updateMenuItem(id: string, payload: MenuItemPayload): Result<MenuItem, string> {
  try {
    // Validation Id
    if (!id) {
      throw new Error("Invalid Id Parameter.");
    }

    // Payload validation
    if (!payload.name || !payload.description || payload.price <= 0) {
      throw new Error("Invalid payload for updating a menu item.");
    }

    const result = match(menuItemsStorage.get(id), {
      Some: (existingMenuItem) => {
        // Explicit property setting
        const updatedMenuItem: MenuItem = {
          ...existingMenuItem,
          name: payload.name,
          description: payload.description,
          price: payload.price,
          updatedAt: Opt.Some(ic.time()),
        };

        // Insert the updated menu item
        menuItemsStorage.insert(id, updatedMenuItem);
        return Result.Ok<MenuItem, string>(updatedMenuItem);
      },
      None: () => Result.Err<MenuItem, string>(`Menu item with ID=${id} not found.`),
    });

    return result;
  } catch (error) {
    // Error handling
    return Result.Err<MenuItem, string>(`Failed to update menu item: ${error}`);
  }
}

// Get all menu items
$query;
export function getMenuItems(): Result<Vec<MenuItem>, string> {
  try {
    // Error handling
    return Result.Ok(menuItemsStorage.values());
  } catch (error) {
    return Result.Err('Failed to retrieve menu items');
  }
}

// ... (Other functions remain unchanged)

// Add a TableReservation
$update
export function addTableReservation(payload: TableReservationPayload): Result<TableReservation, string> {
  try {
    // Payload validation
    if (!payload.name || !payload.date || !payload.time || payload.numberOfGuests <= 0) {
      throw new Error("Invalid payload for adding a table reservation.");
    }

    // Explicit property setting
    const id = uuidv4();
    const reservation: TableReservation = {
      id: id,
      name: payload.name,
      date: payload.date,
      time: payload.time,
      numberOfGuests: payload.numberOfGuests,
      createdAt: ic.time(),
      updatedAt: Opt.None,
    };

    // Insert the table reservation
    tableReservationsStorage.insert(id, reservation);
    return Result.Ok<TableReservation, string>(reservation);
  } catch (error) {
    // Error handling
    return Result.Err<TableReservation, string>(`Failed to add table reservation: ${error}`);
  }
}

$query
export function getTableReservations(): Result<Vec<TableReservation>, string> {
  try {
    return Result.Ok(tableReservationsStorage.values());
  } catch (error) {
    return Result.Err('Failed to retrieve table reservations');
  }
}


globalThis.crypto = {
  //@ts-ignore
  getRandomValues: () => {
    let array = new Uint8Array(32);

    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }

    return array;
  },
};

