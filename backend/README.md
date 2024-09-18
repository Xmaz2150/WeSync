# WeSync API

Welcome consumer!!

## Table of Contents

- [Installation & Setup](#installation-Setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Image Server](#image-server)

## Installation & Setup

1. Install the dependencies:
    ```sh
    pip install -r requirements.txt
    ```

2. Install & Start PostgresSQL:
      ```sh
      sudo apt update && sudo apt install postgresql postgresql-contrib -y && sudo systemctl start postgresql.service
      ```
3. Initialize Database:

     i. Create DB (Only if Starting from scratch):
      ```sh
      psql -U postgres -h localhost -f create_db.sql
      ```
      ii. Load from dump to have some data beforehand **Optional**:
      ```sh
      pg_restore -U postgres -h localhost -d wesync wesync.dump
      ```



## Usage

1. Run application
   ```sh
    flask run
    ```

2. The server will run on `http://localhost:5000`.



## API Endpoints

### Coming Soon

## Image Server

### Get
- **Endpoint:** `/wesync/img/<filename>`
- **Method:** `GET`
- **Description:** Gets image.
- **Request:**
    ```sh
    http GET :5000/wesync/img/<filename> 
    ```
