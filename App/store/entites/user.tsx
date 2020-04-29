export default class User {
    languages:Array<Language>=[]
    settings={
        locale:"",
    };
    administrative_fields={
        uid:"",
        isLoggedIn: false,
        isPremium: false,
        isNewUser: true,
        token: false,
    };
    public_fields = new PublicFields();
    display=""
};
class PublicFields {
    created = Date.now();
    lastLoginDate = Date.now();
    name:String|boolean = false;
    profileImage = "";
    about = "";
    email = "";
}