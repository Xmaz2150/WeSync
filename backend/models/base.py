import models
from sqlalchemy import Column, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
import uuid

# Base will be used as the base for all models
Base = declarative_base()

class BaseModel:
    """Base class for all models, defining common attributes."""
    id = Column(String(60), primary_key=True, default=lambda: str(uuid.uuid4()))
    created_at = Column(String(60), default=datetime.utcnow)
    updated_at = Column(String(60), default=datetime.utcnow, onupdate=datetime.utcnow)

    def save(self):
        """Saves the object to the database"""
        models.storage.new(self)
        models.storage.save()

    def delete(self):
        """Deletes the object from the database"""
        models.storage.delete(self)

    def to_dict(self):
        """Returns a dictionary representation of the object"""
        obj_dict = self.__dict__.copy()
        obj_dict['created_at'] = self.created_at.isoformat()
        obj_dict['updated_at'] = self.updated_at.isoformat()
        obj_dict['__class__'] = self.__class__.__name__
        if "_sa_instance_state" in obj_dict:
            del obj_dict["_sa_instance_state"]
        return obj_dict
