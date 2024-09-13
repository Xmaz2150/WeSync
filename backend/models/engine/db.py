#!/usr/bin/python3
"""
DBStorage class for PostgreSQL
"""

import models
from models.base import Base
from models.models import User, Product, Order, OrderItem, Category, Review
from os import getenv
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

# Add all models to this dictionary
classes = {
    "User": User,
    "Product": Product,
    "Order": Order,
    "OrderItem": OrderItem,
    "Category": Category,
    "Review": Review
}

class DBStorage:
    """Interacts with the PostgreSQL database"""
    __engine = None
    __session = None

    def __init__(self):
        """Instantiate a DBStorage object"""
        SEASE_PGSQL_USER = 'postgres' # getenv('SEASE_PGSQL_USER')
        SEASE_PGSQL_PWD = 'root' # getenv('SEASE_PGSQL_PWD') 
        SEASE_PGSQL_HOST = 'localhost' # getenv('SEASE_PGSQL_HOST')
        SEASE_PGSQL_DB = 'shopease' # getenv('SEASE_PGSQL_DB')
        SEASE_ENV = getenv('SEASE_ENV')

        self.__engine = create_engine('postgresql+psycopg2://{}:{}@{}/{}'.format(
            SEASE_PGSQL_USER, SEASE_PGSQL_PWD, SEASE_PGSQL_HOST, SEASE_PGSQL_DB
        ))

        # Drop tables if in test mode
        if SEASE_ENV == "test":
            Base.metadata.drop_all(self.__engine)

    def all(self, cls=None):
        """Query all objects of a certain class or all classes"""
        new_dict = {}
        for clss in classes:
            if cls is None or cls is classes[clss] or cls is clss:
                objs = self.__session.query(classes[clss]).all()
                for obj in objs:
                    key = obj.__class__.__name__ + '.' + obj.id
                    new_dict[key] = obj
        return new_dict

    def new(self, obj):
        """Add object to the current session"""
        self.__session.add(obj)

    def save(self):
        """Commit all changes of the current session"""
        self.__session.commit()

    def delete(self, obj=None):
        """Delete an object from the session if provided"""
        if obj is not None:
            self.__session.delete(obj)

    def reload(self):
        """Create all tables in the database and initialize the session"""
        Base.metadata.create_all(self.__engine)
        sess_factory = sessionmaker(bind=self.__engine, expire_on_commit=False)
        Session = scoped_session(sess_factory)
        self.__session = Session

    def close(self):
        """Close the current session"""
        self.__session.remove()

    def get(self, cls, **kwargs):
        """Get an object by class and id"""
        if cls not in classes.values():
            return None

        key = list(kwargs.items())[0][0]
        all_cls = models.storage.all(cls)

        for value in all_cls.values():
            if key == 'id':
                if value.id == kwargs.get(key):
                    return value
            else:
                if value.email == kwargs.get(key):
                    return value
        return None

    def count(self, cls=None):
        """Count the number of objects in storage"""
        if not cls:
            count = sum(len(models.storage.all(c).values()) for c in classes.values())
        else:
            count = len(models.storage.all(cls).values())
        return count
