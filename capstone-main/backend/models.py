from exts import db

# Table that stored the very important data of each user.


class User(db.Model):
    doctorid = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(80), nullable=False)
    lastname = db.Column(db.String(80), nullable=False)
    username = db.Column(db.String(25), nullable=False, unique=True)
    email = db.Column(db.String(80), nullable=False, unique=True)
    address = db.Column(db.String(80), nullable=False)
    level = db.Column(db.String(80), nullable=False)
    gender = db.Column(db.String(80), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    department = db.Column(db.String(80), nullable=False)
    password = db.Column(db.Text(), nullable=False)

    def __repr__(self):
        return f"<User {self.username}>"

    def save(self):
        db.session.add(self)
        db.session.commit()
