# object = {"nom": "Berger", "prenom": "Jacques", "age": 88}

# # for cle, valeur in objet.items():
# #  print(cle, valeur)

# objects = object.items()
# print(objects)

# def print_error_message(message):
#     today = get_today()
#     print("Erreur", today, message)

# def get_today():
#     return datetime.date.today()


class Person(object):
    def __init__(self, firstname, lastname):
        self.firstname = firstname
        self.lastname = lastname

    def get_complete_name(self):
        return "%s %s" % (self.firstname, self.lastname)
    
    def set_age(self, age):
        self.age = age

user1 = Person("Jacques", "Berger")
print(user1.get_complete_name())

user1.set_age(88)
print(user1.age)