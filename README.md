## Usage
1. Install depandancies
``` sh
pip install -r requirements.txt
```
2. Create DB
```sh
psql -U postgres -h localhost -f create_db.sql
```

3. Run application
```sh
flask run
```