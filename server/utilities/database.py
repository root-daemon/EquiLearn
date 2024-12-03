from pymongo import MongoClient
from utilities.env import Env
import certifi

env = Env()


class Database:
    def __init__(self):
        self.client = MongoClient(env.DB_URI, tlsCAFile=certifi.where())
        self.db = self.client[env.DB_NAME]
        self.User = self.db.User

    def __close__(self):
        self.client.close()
