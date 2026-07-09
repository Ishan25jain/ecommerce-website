# Project React

A multi-feature React application built with Vite, combining a personal Todo List, a Watch List manager, and a fully-fledged e-commerce Shop experience — complete with authentication, cart, wishlist, and account management.

## Features

### 🔐 Authentication

* User registration and login with local persistence
* Protected routes — Todo List and Watch List are only accessible when logged in
* Session state kept in `localStorage`

### ✅ Todo List

* Add, edit, and delete tasks
* Data persisted locally via a custom `useLocalStorage` hook
* Light/dark theme toggle

### ⌚ Watch List

* Browse a curated list of watches
* Live search/filter by name
* Sort by name or price

### 🛍️ Shop

* Storefront with hero banner, curated styles, category sections, trending products, and sale banners
* Product detail pages and category browsing
* Search results page
* Shopping cart with global state via Context API
* Wishlist with global state via Context API

### 👤 Account

* Account overview dashboard
* Personal details management
* Address book
* Order history
* Nested routing under `/account`

## Tech Stack

* **React 19** — UI library
* **Vite** — build tool and dev server
* **React Router DOM 7** — client-side routing
* **React Toastify** — toast notifications
* **React Spinners** — loading indicators
* **Country State City** / **Country Flag Icons** — location data for address forms
* **ESLint** — code linting

## Project Structure

```
project-react/
├── public/                  # Static assets (favicon, icons, images)
├── src/
│   ├── assets/               # Images used within components
│   ├── hooks/
│   │   └── useLocalStorage.js
│   ├── shop/                  # E-commerce feature module
│   │   ├── context/            # CartContext, WishlistContext
│   │   ├── Shop.jsx, Cart.jsx, wishlist.jsx, ...
│   │   └── ...
│   ├── App.jsx                # Route definitions
│   ├── main.jsx                # App entry point
│   ├── Login.jsx / Register.jsx
│   ├── TodoPage.jsx
│   ├── watchList.jsx
│   ├── Account.jsx / AccountOverview.jsx / PersonalDetails.jsx / AddressBook.jsx / OrderHistory.jsx
│   └── index.css / App.css
├── index.html
├── package.json
└── vite.config.js
```

## Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>

# Install dependencies
npm install
```

### Running the app

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (default Vite port).

### Building for production

```bash
npm run build
```

### Previewing the production build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## Routes

|Path|Description|
|-|-|
|`/`|Todo List (protected)|
|`/watches`|Watch List (protected)|
|`/login`|Login page|
|`/register`|Registration page|
|`/shop`|Shop storefront|
|`/shop/product/:id`|Product detail page|
|`/shop/category/:categoryName`|Category listing|
|`/shop/search`|Search results|
|`/shop/wishlist`|Wishlist|
|`/cart`|Shopping cart|
|`/account`|Account overview (with nested routes for personal details, address book, order history, wishlist)|

## Notes

* Authentication and app data (todos, theme, user accounts) are currently persisted in the browser's `localStorage` and are **not** backed by a real server/database.
* This project was scaffolded with [Vite](https://vite.dev/) using the React template.

## License

This project currently has no license specified. Add a `LICENSE` file if you'd like to make the usage terms explicit.

