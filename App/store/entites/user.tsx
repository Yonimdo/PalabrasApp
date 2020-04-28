export default class User {
    languages=[]
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
    public_fields ={
        created:Date.now(),
        lastLoginDate:Date.now(),
        name: false,
        profileImage: "",
        about:"",
        email:"",
    };
    display=""
};
  