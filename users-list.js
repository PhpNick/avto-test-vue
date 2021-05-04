var users = null;

function finduser (userId) {
  return users[finduserKey(userId)];
};

function finduserKey (userId) {
  for (var key = 0; key < users.length; key++) {
    if (users[key].id == userId) {
      return key;
    }
  }
};

var List = Vue.extend({
  template: '#user-list',
  data: function () {
    return {users: {}, searchKey: '',
    showAddUserModal: false,
    user: {first_name: '', last_name: '', email: '', avatar: ''}};
  },

  mounted() {
      axios
        .get("https://reqres.in/api/users?page=1")
        .then(response => (this.users = response.data.data));
  },  

  computed : {
    filteredusers: function () {
    users = this.users;
    var searchKey = this.searchKey.trim().toLowerCase();

    if(!searchKey){
      return users;
    }

    users = users.filter(function (user) {
      if(user.first_name.toLowerCase().indexOf(searchKey) !== -1) {
        return user;
      }
    })

    return users
  }
},

methods: {
  deleteuser: function (id) {
    users.splice(finduserKey(id), 1);
  },

  adduser: function () {
      var user = this.user;
      users.push({
        id: Math.random().toString().split('.')[1],
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        avatar: user.avatar
      });  
      this.showAddUserModal = false;  
  }  
}
});

var user = Vue.extend({
  template: '#user',
  data: function () {
    return {user: finduser(this.$route.params.user_id)};
  },

  mounted() {
      axios
        .get("https://reqres.in/api/users?page=1")
        .then(response => (users = response.data.data));
  },   
});

var router = new VueRouter({
  routes: [{path: '/', component: List},
    {path: '/user/:user_id', component: user, name: 'user'},
]});


new Vue({
  el: '#app',
  router: router,
     
  template: '<router-view></router-view>'
});