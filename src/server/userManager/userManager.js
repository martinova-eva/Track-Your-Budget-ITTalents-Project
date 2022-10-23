class User{
    constructor(username, password, sessionId){
        this.usename = username; 
        this.password = password;
        this.sessionId = sessionId;
    }
}

class UserManager {
        
    constructor() {
        this.users = [];
        this.activeUser;
       
        if(localStorage.getItem('users')){
            this.users = JSON.parse(localStorage.getItem('users'));
        }
    }
    getAllUsers() {
        return JSON.parse(localStorage.getItem('users')) || [];
    }
    
    registerUser(username, password) {
        let users = getAllUsers();
        const isUserTaken = users.find(user => user.username === username);
        if (isUserTaken) {
            return false;
        }
        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
        return true;
    }
    
    loginUser(username, password) {
        let users = getAllUsers();
        const user = users.find(
            user => user.username === username && user.password === password
        );
    
        if (user) {
            localStorage.setItem('activeUser', JSON.stringify(user));
        }
    
        return user;
    }
    
    getActiveUser() {   
        return JSON.parse(localStorage.getItem('activeUser'));
    }
    logoutFromStorage() {
        ///ще трябва да прехвърли всичко в общия масив
            localStorage.removeItem('activeUser');
    }

}