# arktracker

an app to help you track your ark dinosaur stats and blueprints.

# Back-end-2

How-To back end documentation for end points

# Documentation:

# Base URL for Deployed API

https://clhowto.herokuapp.com/

# Endpoints

| Request | URL               | Description                 |
| ------- | ----------------- | --------------------------- |
| POST    | api/auth/register | register as a new user      |
| POST    | api/auth/login    | login as an existing user   |
| POST    | api/posts         | add post for logged in user |
| GET     | api/posts         | get all posts               |
| GET     | api/posts/:id     | get specific post by id     |
| PUT     | api/posts/:id     | edit specific post          |
| DELETE  | api/posts/:id     | delete specific post        |

# Table Requirements

# Users

| Name     | Type    | Required | Unique | Notes                          |
| -------- | ------- | -------- | ------ | ------------------------------ |
| id       | integer | yes      | yes    | users id (auto generated)      |
| username | string  | yes      | yes    | users username (max 24 char)   |
| password | string  | yes      | no     | users password (max 36 char)   |
| role     | integer | no       | no     | can use to set the user's role |

# Dinos

| Name         | Type    | Required | Unique | Notes                                             |
| ------------ | ------- | -------- | ------ | ------------------------------------------------- |
| id           | integer | yes      | yes    | posts id (auto generated)                         |
| title        | string  | yes      | yes    | posts title (max 128 char)                        |
| description  | string  | yes      | no     | enter description of how-to post (max 244 char)   |
| materials    | string  | no       | no     | materials needed for how-to (max 244 char)        |
| video        | string  | no       | no     | can link a youtube for their how-to(max 255 char) |
| instructions | string  | no       | no     | instructions to do the how-to(255 char)           |
| user_id      | string  | yes      | no     | user's id that created the post                   |

# Items

| Name         | Type    | Required | Unique | Notes                                             |
| ------------ | ------- | -------- | ------ | ------------------------------------------------- |
| id           | integer | yes      | yes    | posts id (auto generated)                         |
| title        | string  | yes      | yes    | posts title (max 128 char)                        |
| description  | string  | yes      | no     | enter description of how-to post (max 244 char)   |
| materials    | string  | no       | no     | materials needed for how-to (max 244 char)        |
| video        | string  | no       | no     | can link a youtube for their how-to(max 255 char) |
| instructions | string  | no       | no     | instructions to do the how-to(255 char)           |
| user_id      | string  | yes      | no     | user's id that created the post                   |

need to edit tables still
