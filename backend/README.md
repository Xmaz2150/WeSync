# WeSync API
Welcome consumer!!

## Table of Contents
- [API Endpoints](#api-endpoints)
- [Image Server](#image-server)

## API Endpoints

### User Registration

- **Endpoint:** `/wesync/register`
- **Method:** `POST`
- **Description:** Registers a new user. Should contain a special flag (`flag=su`) to register an admin.
- **Request:**
    ```sh
    http POST :5000/wesync/register \
        username=username \
        email=email \
        password=password \
        flag=su
    ```

### User Login

- **Endpoint:** `/wesync/login`
- **Method:** `POST`
- **Description:** Logs in an existing user.
- **Request:**
    ```sh
    http POST :5000/wesync/login \
        email=email \
        password=password
    ```

### Get Profile

- **Endpoint:** `/wesync/profile`
- **Method:** `GET`
- **Description:** Retrieves the profile of the currently logged-in user.
- **Request:**
    ```sh
    http GET :5000/wesync/profile \
        Authorization:"Bearer <access_token>"
    ```

### Get User Profile

- **Endpoint:** `/wesync/user/<user_id>`
- **Method:** `GET`
- **Description:** Retrieves the profile of a user by their user ID.
- **Request:**
    ```sh
    http GET :5000/wesync/user/<user_id> \
        Authorization:"Bearer <access_token>"
    ```

### Update Profile

- **Endpoint:** `/wesync/profile/update`
- **Method:** `POST`
- **Description:** Updates usesr profile of the currently logged-in user.
- **Request:**
    ```sh
    http POST :5000/wesync/profile/update \
        Authorization:"Bearer <access_token>" \
        file@path/to/file \
        username=new_username \
        bio=new_bio \
        city=new_city
    ```

## Social

### Create Post

- **Endpoint:** `/social/posts`
- **Method:** `POST`
- **Description:** Adds a new post to the database.
- **Request:**
    ```sh
    http POST :5000/social/posts \
        Authorization:"Bearer <access_token>" \
        content="Post content" \
        file@path/to/file
    ```

### Get Feed

- **Endpoint:** `/social/feed`
- **Method:** `GET`
- **Description:** Gets all posts from followed users.
- **Request:**
    ```sh
    http GET :5000/social/feed \
        Authorization:"Bearer <access_token>"
    ```

### Create Comment

- **Endpoint:** `/social/posts/comment/<post_id>`
- **Method:** `POST`
- **Description:** Adds a new comment to a post.
- **Request:**
    ```sh
    http POST :5000/social/posts/comment/<post_id> \
        Authorization:"Bearer <access_token>" \
        content="Comment content"
    ```

### Get Comments

- **Endpoint:** `/social/posts/comments/<post_id>`
- **Method:** `GET`
- **Description:** Gets all comments from a post.
- **Request:**
    ```sh
    http GET :5000/social/posts/comments/<post_id> \
        Authorization:"Bearer <access_token>"
    ```

### Like Post

- **Endpoint:** `/social/posts/like/<post_id>`
- **Method:** `POST`
- **Description:** Likes a post.
- **Request:**
    ```sh
    http POST :5000/social/posts/like/<post_id> \
        Authorization:"Bearer <access_token>"
    ```

### Follow User

- **Endpoint:** `/social/users/follow/<user_id>`
- **Method:** `POST`
- **Description:** Follows a user.
- **Request:**
    ```sh
    http POST :5000/social/users/follow/<user_id> \
        Authorization:"Bearer <access_token>"
    ```

### Unfollow User

- **Endpoint:** `/social/users/unfollow/<user_id>`
- **Method:** `DELETE`
- **Description:** Unfollows a user.
- **Request:**
    ```sh
    http DELETE :5000/social/users/unfollow/<user_id> \
        Authorization:"Bearer <access_token>"
    ```

### Remove Follower

- **Endpoint:** `/social/users/removefollow/<user_id>`
- **Method:** `DELETE`
- **Description:** Removes a follower.
- **Request:**
    ```sh
    http DELETE :5000/social/users/removefollow/<user_id> \
        Authorization:"Bearer <access_token>"
    ```

### Get Followers

- **Endpoint:** `/social/users/followers/<user_id>`
- **Method:** `GET`
- **Description:** Gets all followers of a user.
- **Request:**
    ```sh
    http GET :5000/social/users/followers/<user_id> \
        Authorization:"Bearer <access_token>"
    ```

### Get Following

- **Endpoint:** `/social/users/following/<user_id>`
- **Method:** `GET`
- **Description:** Gets all users a user is following.
- **Request:**
    ```sh
    http GET :5000/social/users/following/<user_id> \
        Authorization:"Bearer <access_token>"
    ```

### Search Users

- **Endpoint:** `/social/users/search`
- **Method:** `GET`
- **Description:** Searches for users by username.
- **Request:**
    ```shhttp GET :5000/users/search?query=<username> \
        Authorization:"Bearer <access_token>"
    
    ```

## Image Server
### Get
- **Endpoint:** `/wesync/img/<filename>`
- **Method:** `GET`
- **Description:** Gets image.
- **Request:**
    ```sh
    http GET :5000/wesync/img/<filename> 
    ```


