from sqlalchemy import text

from app.database.session import engine

try:
    with engine.connect() as connection:
        result = connection.execute(text("SELECT version();"))
        print("Connected Successfully!")
        print(result.fetchone())
except Exception as e:
    print("Connection Failed")
    print(e)
