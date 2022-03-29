import pymysql
from typing import Optional


class DBClass:
    """
    Use for DB reactive
    """

    def __init__(self, host: str, port: int, db: str, user: str, psw: str):
        self.db: Optional[pymysql.Connection] = None
        self.cursor: Optional[pymysql.cursors.Cursor] = None
        self.__connect(host, port, db, user, psw)

    def __connect(self, host: str, port: int, db: str, user: str, psw: str):
        try:
            self.db = pymysql.connect(
                host=host,
                port=port,
                db=db,
                user=user,
                password=psw
            )
            self.cursor = self.db.cursor()
        except Exception as e:
            print("Error when connect to db: ", e)

    def execute_sql(self, query: str, args: Optional[tuple] = None) -> bool:
        """
        execute the sql
        :param query: the query sql
        :param args: optional, the tuple with the data
        :return: Success with True, Failed with False
        """
        try:
            if args:
                self.cursor.execute(query, args)
            else:
                self.cursor.execute(query)
            self.db.commit()
            return True
        except Exception as e:
            print("Error when execute the sql `{}`: {}".format(query, e))
            return False
