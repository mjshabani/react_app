class LoginAdmin(Document):
    username = StringField(required=True)
    password = StringField(required=True)


class CreateConsultant(Document):
    username = StringField(required=True, max_length=20, min_length=5)
    password = StringField(required=True, max_length=20, min_length=8)

class UpdateConsultant(Document):
    title = StringField(required=True, max_length=20, min_length=2)
    name = StringField(required=True, max_length=20, min_length=2)
    family = StringField(required=True, max_length=20, min_length=2)
    summary_info = StringField(required=True)
    further_info = StringField(required=True)
    address = StringField(required=True)
    phone_number = StringField(required=True)


class CreateConsultationTime(Document):
    begin_time = DateTimeField(required=True)
    duration = IntField(required=True, minimum=5, maximum=180)
    consultant = StringField(required=False)


class CreateReservation(Document):
    consultation_time = StringField(required=True)


PHONE_REGEX = "^09[0-9]{9}$"

class RegisterUser(Document):
    phone_number = StringField(required=True, pattern=PHONE_REGEX)
    username = StringField(required=True, min_length=5, max_length=20)

class VerifyUser(Document):
    long_code = StringField(required=True)
    short_code = StringField(required=True)

class ChangePassword(Document):
    password = StringField(required=True, min_length=8, max_length=20)

class LoginUser(Document):
    username = StringField(required=True, max_length=20, min_length=5)
    password = StringField(required=True, max_length=20, min_length=8)

class UpdateUser(Document):
    name = StringField(required=True)
    family = StringField(required=True)