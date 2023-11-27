# Uber_Project
![image](https://github.com/Rezident16/Uber_Project/assets/137537436/c36f1483-d086-4400-875e-9cf92abda4e4)



## MVP List
# SavoryScoot, an UberEats clone, is a website for users to order food from a variety of restaurants straight to their door.
## 1. New account creation, log in, log out, and guest/demo login
- Users can sign up, log in, and log out.
- Users can use a demo log in to try the site.
- Users can't use certain features without logging in (like ordering meals and posting reviews).
- Logged in users are directed to their profile page which displays their order history.
- Logged out users are directed to a page displaying several restaurants.
## 2. Restaurants
- Users should be able to view all restaurants for delivery.
- Users should be able to create a restaurant.
- Users should be able to update their restaurant(s).
- Users should be able to delete their restaurant(s).s
## 3. Shopping Carts
- Users should be able to view all products added to their cart.
- Users should be able to add products to their shopping cart.
- Shopping cart is saved to User's Local Storage.
- Users should be able to remove products from their shopping cart.
- Users should be able to preform a "transaction" to complete their purchase.
## 4. Reviews
- Users should be able to view all reviews on a restaurant.
- Users should be able to create a review for a restaurant.
- Users should be able to update their review for a restaurant. (Work in progress)
- Users should be able to delete their review from a restaurant.
## 5. Orders
- Users should be able to view their order summary before checking out.
- Users should be able to complete the checkout
- Users should be able to view their orders in User Profile
## 6. Menu Items
- Users should be able to view all menu items for a restaurant.
- Users should be able to add menu items to their restaurants.
- Users should be able to update menu items on their restaurants.
- Users should be able to delete menu items from their restaurants.
## Bonus Features/Work In Progress
## Google Maps Integration
- Users should be able to filter restaurants by distance.
- Users should be able to see estimated delivery times based on their proximity to the restaurant.
## Search
- Users should be able to search for restaurants.
- Users should be able to view the results of their search.
## Past Order/Reorder (Scoots)
- Users should be able to view their past orders (Scoots).
- Users should be able to reorder any of their past orders (Scoots).


# User Stories

## Users

### Sign Up

- As an unregistered and unauthorized user, I want to be able to sign up for the website via a sign-up form.
  - When I'm on the `/signup` page:
    - I would like to be able to enter my email, username, and preferred password on a clearly laid out form.
    - I would like the website to log me in upon successful completion of the sign-up form.
      - So that I can seamlessly access the site's functionality
  - When I enter invalid data on the sign-up form:
    - I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
    - So that I can try again without needing to refill forms I entered valid data into.

### Log in

- As a registered and unauthorized user, I want to be able to log in to the website via a log-in form.
  - When I'm on the `/login` page:
    - I would like to be able to enter my email and password on a clearly laid out form.
    - I would like the website to log me in upon successful completion of the log-in form.
      - So that I can seamlessly access the site's functionality
  - When I enter invalid data on the log-in form:
    - I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
      - So that I can try again without needing to refill forms I entered valid data into.

### Demo User

- As an unregistered and unauthorized user, I would like an easy to find and clear button on the `/login` page to allow me to visit the site as a guest without signing up or logging in.
  - When I'm on the `/login` page:
    - I can click on a Demo User button to log me in and allow me access as a normal user.
      - So that I can test the site's features and functionality without needing to stop and enter credentials.

### Log Out

- As a logged in user, I want to log out via an easy to find log out button on the navigation bar.
  - While on any page of the site:
    - I can log out of my account and be redirected to the home page `/` displaying all the restaurants I can order from.
      - So that I can easily log out to keep my information secure.

## Restaurants

### Viewing Restaurants

- As a user (logged in or not), I want to be able to see a list of restaurants I can order food from.
  - From the home page `/`:
    - I should see a list of all restaurants available to order food from
    - I should be able to click on any restaurant to be navigated to that restaurants page, `/restaurants/:restaurantId`

### Viewing Individual Restaurants

- As a user (logged in or not), I want to see a restaurant's details.
  - Clicking on an individual restaurant from the home page `/` will navigate to that restaurant's page `/restaurants/:restaurantId`
  - The restaurant's page will show page details, food items available from that restaurant, and user submitted reviews for the restaurant.

### Creating a Restaurant

- As a user, I would like to add my restaurant to the website so other users can receive food delivery.
  - Once I am logged in, there should be a button labeled "Add my Restaurant"
  - When I click this button, I should be redirected to `/restaurants/new`
  - I should then be able to fill out a form for my restaurant, including fields for the restaurant's name, address, category, working hours, and a preview image.
    - If there is any invalid data, the form should not be cleared and errors should clearly be displayed above the fields that have errors.
    - If there are no errors, the restaurant should be created in the database and I should be redirected to that restaurant’s page `/restaurants/:restaurantId`.

### Updating/Deleting a Restaurant

- As a user with an existing restaurant, I would like to update some information about my restaurant.

  - I can click the button labeled "My Restaurants" from the profile dropdown and find all of the restaurants I own.
  - Clicking this button will redirect me to the page `/users/:userId/restaurants`
  - Each restaurant has a "Edit Restaurant" and "Delete Restaurant" button associated with it.
  - Clicking the "Edit Restaurant" button will navigate me to the `/restaurants/:restaurantId/edit` page, where I see a form that is already populated with all of my restaurant’s attributes.
  - I can change any of these attributes and submit the form.
    - If there is any invalid data, the form should not be cleared and errors should clearly be displayed above the fields that have errors.
    - If there are no errors, the restaurant should be updated in the database and I should be redirected to that restaurant’s page.

- As a user with an existing restaurant, I would like to remove the restaurant from the site.
  - I can click the button labeled "My Restaurants" from the profile dropdown and find all of the restaurants I own.
  - Clicking this button will redirect me to the page `/users/:userId/restaurants`
  - Each restaurant has a "Edit Restaurant" and "Delete Restaurant" button associated with it.
  - Clicking the "Delete Restaurant" button will display a pop-up modal asking to confirm that I really want to remove the restaurant.
    - Clicking "No" will cancel the delete and clear the pop-up.
    - Clicking "Yes" will clear the pop-up, and remove the restaurant from the database.

## Reviews

### Create Reviews

- As a logged in user, I want to be able to post new reviews for a particular restaurant after placing an order.
  - Before the food has been delivered, the review button is not visible.
  - After the order has been delivered:
    - Clicking on the place review button will open a review pop-up modal:
      - A review form will be populated and upon submission the pop-up will be closed and the review will show on the `/restaurants/:restaurantId` page details.

### Viewing Reviews

- As a logged in _or_ logged out user, I want to be able to view reviews at a particular restaurant.
  - The restaurant's page `/restaurants/:restaurantId` will list the reviews for the restaurant under the restaurant's details.
  - If there are more than 20 reviews, the reviews section will be paginated.
    - \*\*OPTIONAL Users should be able to see all of their reviews on their user page `/users/:userId/reviews`

### \*\*OPTIONAL Updating Reviews

- As a logged in user, I want to be able to update a review I had previously written for a restaurant.
  - When I am on the `/restaurants/:restaurantId` page:
    - I can click the "Edit" button to make permanent changes to a review I have posted.
      - Upon submission I will be redirected to `/restaurants/:restaurantId` page.

### Deleting Reviews

- As a logged in user, I want to be able to delete a review I had previously written for a restaurant.
  - When I am on the `/restaurants/:restaurantId` page:
    - I can click the "Delete" button to permanently delete the review.
      - Upon deletion I will be redirected to `/restaurants/:restaurantId` page.

## Menu Items

### Viewing all menu items for a restaurant

- As a user, I want to be able to see a list of menu items I can order from a restaurant.
  - From the page `/restaurants/:restaurantId`:
    - I should see a list of all menu items available to order: Featured Items/ Most Popular Items/ All Items
    - I should be able to click on any menu item to be navigated to that item’s page, `restaurants/:restaurantId/items/:itemId`
    - On an item detail’s page I should be able to see item’s image, description, order button, adjust quantity (1-100).
    - Once added to cart, user should be redirected to the main page and have also have a cart pop-up on user’s screen

### Adding Items to the menu

- As a restaurant owner, I want to be able to add items to a menu.
- From the page `/restaurants/:restaurantId`:
  - If user is a restaurant owner, they should be able to see a button to add new products on restaurant’s page.
  - Upon clicking on a button, the user should see a pop-up modal with the form ‘Add new item to a menu’
  - Form:
    - Name
    - Description
    - Price
    - Food Category
    - Is Alcohol (to restrict underage users)
    - Image
  - If there is any invalid data, the form should not be cleared and errors should clearly be displayed above the fields that have errors.
  - Upon a successful item creation, the modal should be closed and the restaurant's page `/restaurants/:restaurantId` should display the new item.

### Deleting Items

- As a restaurant owner, I want to be able to remove items from a menu.
- From the page `/restaurants/:restaurantId` or the food details page `/restaurants/:restaurantId/items/:itemId`:
  - If a user owns the restaurant to which the item belongs, they should see the button ‘Delete Item’.
    - After clicking on a button, the pop-up should appear to confirm.
    - If the user deletes the item, the user should be redirected back to the restaurant main page where they won’t be able to see the item

### Updating Items

- As a restaurant owner, I want to be able to update items on the menu.
- From the page `/restaurants/:restaurantId` or the food details page `/restaurants/:restaurantId/items/:itemId`:
  - If a user owns the restaurant to which the item belongs, they should see the button ‘Update Item’.
    - Upon clicking on a button, the user should see a pop-up modal with the form ‘Update Item’
    - Form:
      - Name
      - Description
      - Price
      - Food Category
      - Is Alcohol (to restrict underage users)
      - Image
    - If there is any invalid data, the form should not be cleared and errors should clearly be displayed above the fields that have errors.
    - Upon a successful item creation, the modal should be closed and/or the user should be redirected to the restaurant's page`/restaurants/:restaurantId` and the page should display the updated item.

### Viewing Shopping Cart

- As a logged in or logged out user I want to be able to add items into my shopping cart. The shopping cart button should appear on any page
- When I click on the shopping cart icon:
  - A cart side bar modal should appear on the screen
  - If have have yet to add items into the shopping cart, I should see an empty shopping cart. There should be some text encouraging me to add items into my cart
- If I have added items into my cart, I would like to see the item, the price of the item, the quantity of the item and finally a button on the bottom of the pop-up window with the subtotal for my cart and text saying “Continue to Checkout”.

### Adding Items to Shopping Cart

- As a logged in or logged out user, I should be able add an item into my shopping cart by clicking on the item I would like and hitting a button labeled “Add to Cart”
- When an item is added, the pop-up window should automatically be opened. No longer showing an empty cart, but the item I have selected.
- By default the quantity should be set to 1.

### Updating Shopping Cart / Removing Items from Shopping Cart

- As a logged in or logged out user, I should be able to adjust the quantity of items in the Shopping Cart.
- I should have a quantity dropdown menu and a “Delete” button on each individual item. The quantity should be from 1-100 and instead of having a ‘0’ it should be replaced with the word “Remove”.
  - If the quantity is set to “Remove”, the item should be removed from the cart. The cart, and price (if applicable) should be updated.

### Confirming purchase

- As a logged out user with items in the cart, when clicking on the “Go to Checkout” Button, I should be redirected to the login page. The login page should also have a link to the sign-up page for users without an account.
- After successfully creating/logging in into an account, I should be redirected to `/checkout`. This page consists of my “Order Details”, the place I am ordering from, an image, the address and name, and the total, with taxes included. I should also be able to edit my shopping cart here. Finally, a button “Place my Order” that will “place” my order and be redirected to the `/users/:userId/orders` page. This page will contain similar details to the `/checkout` but without the “Place my Order” button and taking away the ability to edit the order.
