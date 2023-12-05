# Restaurant

Canister for restaurant management, handling menu items and table reservations.

## Canister Components

- **MenuItem**: A record that stores details of a menu item, including its name, description, and price.
- **TableReservation**: A record for managing table reservations with information like customer name, reservation date, time, and number of guests.
- **menuItemsStorage**: Utilizes `StableBTreeMap` for stable storage of menu items.
- **tableReservationsStorage**: Uses `StableBTreeMap` for persisting table reservations.

---

- **addMenuItem**: Adds a new item to the restaurant's menu.
- **updateMenuItem**: Updates details of an existing menu item.
- **getMenuItems**: Retrieves a list of all menu items.
- **addTableReservation**: Records a new table reservation.
- **getTableReservations**: Lists all table reservations.

## Usage

The canister allows restaurant staff to manage menu items and table reservations efficiently through its public methods.

### How to run the project

- Clone the repository

```bash
git clone https://github.com/parriot/ICP-Restaurant-Manager.git
```

- Install dependencies

```bash
npm install
```

- Start the DFINITY Internet Computer local network

```bash
dfx start --background --clean
```

- Deploy the canister to the local network

```bash
dfx deploy
```

- To stop the local network

```bash
dfx stop
```

## Usage

You can interact with the canister through the web interface or using command line with the commands below.

### Add a new menu item

```bash
dfx canister call restaurant_manager addMenuItem '("Pizza", "Delicious cheese pizza", 1200)'
```

## Update an existing menu item

```bash
dfx canister call restaurant_manager updateMenuItem '("menu_item_id", "Burger", "Juicy beef burger", 900)'
```

## Retrieve all menu items

```bash
dfx canister call restaurant_manager getMenuItems
```

## Add a table reservation

```bash
dfx canister call restaurant_manager addTableReservation '("Alice", "2023-07-15", "19:00", 4)'
```

## Retrieve all table reservations

```bash
dfx canister call restaurant_manager getTableReservations
```
