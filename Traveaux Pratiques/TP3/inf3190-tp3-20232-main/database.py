import sqlite3

def _build_animal(result_set_item):
    animal = {}
    animal["id"] = result_set_item[0]
    animal["nom"] = result_set_item[1]
    animal["espece"] = result_set_item[2]
    animal["race"] = result_set_item[3]
    animal["age"] = result_set_item[4]
    animal["description"] = result_set_item[5]
    animal["courriel"] = result_set_item[6]
    animal["adresse"] = result_set_item[7]
    animal["ville"] = result_set_item[8]
    animal["cp"] = result_set_item[9]
    return animal


class Database:
    def __init__(self):
        self.connection = None

    def get_connection(self):
        if self.connection is None:
            self.connection = sqlite3.connect('db/animaux.db')
        return self.connection

    def disconnect(self):
        if self.connection is not None:
            self.connection.close()

    def get_animaux(self):
        cursor = self.get_connection().cursor()
        query = ("select id, nom, espece, race, age, description, "
                 "courriel, adresse, ville, cp from animaux")
        cursor.execute(query)
        all_data = cursor.fetchall()
        return [_build_animal(item) for item in all_data]

    def get_animal(self, animal_id):
        cursor = self.get_connection().cursor()
        query = ("select id, nom, espece, race, age, description, courriel, "
                 "adresse, ville, cp from animaux where id = ?")
        cursor.execute(query, (animal_id,))
        item = cursor.fetchone()
        if item is None:
            return item
        else:
            return _build_animal(item)

    def add_animal(self, nom, espece, race, age, description, courriel,
                   adresse, ville, cp):
        connection = self.get_connection()
        query = ("insert into animaux(nom, espece, race, age, description, "
                 "courriel, adresse, ville, cp) "
                 "values(?, ?, ?, ?, ?, ?, ?, ?, ?)")
        connection.execute(query, (nom, espece, race, age, description,
                                   courriel, adresse, ville, cp))
        cursor = connection.cursor()
        cursor.execute("select last_insert_rowid()")
        lastId = cursor.fetchone()[0]
        connection.commit()
        return lastId
    
    def search_animaux(self, search_term):
        cursor = self.get_connection().cursor()
        query = ("select id, nom, espece, race, age, description, courriel, "
                 "adresse, ville, cp from animaux "
                 "where nom like ? or description like ?")
        cursor.execute(query, ('%' + search_term + '%', '%' + search_term + '%'))
        all_data = cursor.fetchall()
        return [_build_animal(item) for item in all_data]
