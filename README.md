# Savory Scoot

## Live Link

[https://savoryscoot.onrender.com/](https://savoryscoot.onrender.com/)

![image](portfolio_large_1.gif)

![image](https://github.com/Rezident16/Uber_Project/assets/137537436/c36f1483-d086-4400-875e-9cf92abda4e4)

### Technologies used

#### Frameworks/Languages

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)

#### Database

![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

#### Other Tools

![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

#### Hosting

![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

## Index

## Submitting an Order

![image](main.gif)

## Submitting a Review

![image](review.gif)

## Endpoints

## Auth

| Route                                                | Purpose                                             | Output                                                                                                                                                                                              |
| ---------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET /api/auth/`                                     | Authenticates a user                                | `{"address": <STRING/>, "birthday": <STRING/>, "email": <STRING/>, "username":<STRING/> ,"id": <INT/>, "first_name": <STRING/>, "last_name": <STRING/>, "orders": [<orders/>]}`                     |
| `POST /api/auth/login`                               | Logs a user in                                      | `{"address": <STRING/>, "birthday": <STRING/>, "email": <STRING/>, "username":<STRING/> ,"id": <INT/>, "first_name": <STRING/>, "last_name": <STRING/>, "orders": [<orders/>]}`                     |
| `GET /api/auth/logout`                               | Logs a user out                                     | `{"message": "User logged out"}`                                                                                                                                                                    |
| `POST /api/auth/signup`                              | Creates a new user and logs them in                 | `{"address": <STRING/>, "birthday": <STRING/>, "email": <STRING/>, "username":<STRING/> ,"id": <INT/>, "first_name": <STRING/>, "last_name": <STRING/>, "orders": [<orders/>]}`                     |
| `GET /api/auth/unauthorized`                         | Returns unauthorized JSON when authentication fails | `{"errors": ["Unauthorized"]}`                                                                                                                                                                      |
| `GET /api/docs`                                      | Returns all API routes and their doc strings        | `{<route/>: [[<method/>],<route description/>]}`                                                                                                                                                    |
| `GET /api/items/<int:itemId>`                        | Fetches specific item by ID                         | `{"category": <STRING/>, "description": <STRING/>, "id": <INT/>, "is_alcohol": <BOOLEAN/>, "name", <STRING/>, "preview_img", <URL/>, "price": <FLOAT/>, "restaurant_id": <INT/>, "orders", <INT/>}` |
| `POST /api/restaurants`                              | Posts a restaurant                                  |                                                                                                                                                                                                     |
| `DELETE /api/restaurants/<int:restaurantId>`         | Deletes a restaurant by ID                          |                                                                                                                                                                                                     |
| `POST /api/restaurants/<int:restaurantId>/items/new` | Creates an item for a restaurant                    |                                                                                                                                                                                                     |
| `POST /api/restaurants/<int:restaurantId>/orders`    | Creates a new order for a restaurant                |                                                                                                                                                                                                     |
| `POST /api/restaurants/<int:restaurantId>/reviews`   | Posts a review for a restaurant                     |                                                                                                                                                                                                     |
| `DELETE /api/reviews/<int:reviewId>`                 | Deletes a review by ID                              |                                                                                                                                                                                                     |
| `POST /api/users/<int:id>`                           | Updates a user by their ID                          |                                                                                                                                                                                                     |
| `DELETE /api/users/current`                          | Deletes the current user                            |                                                                                                                                                                                                     |
