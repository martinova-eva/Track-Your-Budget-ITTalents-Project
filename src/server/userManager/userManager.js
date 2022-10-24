
export let userManager = (function () {
    class User {
        constructor(username, password, sessionId) {
            this.usename = username;
            this.password = password;
            this.sessionId = sessionId;
        }
    }

    class UserManager {
        constructor() {
            this.users = [];
            this.activeUser = {};
            if (localStorage.getItem('users')) {
                this.users = JSON.parse(localStorage.getItem('users'));
            }
            if(localStorage.getItem('activeUser')){
                this.activeUser = JSON.parse(localStorage.getItem('activeUser'));
            }
        }
        getAllUsers() {
            return JSON.parse(localStorage.getItem('users')) || [];
        }

        registerUser(username, password, confirmPass) {
            let users = this.getAllUsers();
            const isUserTaken = users.find(user => user.username === username);
            if (isUserTaken ) {
                return false;
            }
            if(password.trim() === confirmPass.trim()){
                users.push( new User(username, password) );
                localStorage.setItem('users', JSON.stringify(users));
                return true;
            }
        }

        loginUser(username, password) {
            let users = this.getAllUsers();
            const user = users.find(
                user => user.username === username && user.password === password
            );

            if (user) {
                localStorage.setItem('activeUser', JSON.stringify(new User(username, password)));
                return true;
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
    return new UserManager();
})();

