const users = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();

  const exitUser = users.find(
    (user) => user.room === room && user.name === name
  );
  if (exitUser) {
    return {
      error: "user is already here",
    };
  }
  const user = { id, name, room };
  users.push(user);
  return { user };
};

const removeUser = (id) => {
    const userIndex = users.findIndex(user => user.id === id);

    if(userIndex != 1){
        return users.splice(userIndex, 1)[0]
    }
};

const getUser = (room) => {
    users.filter(user => user.room === room)
};

const getOneUser = (id) => {
   return users.find(user => user.id === id)
};

module.exports = {
    addUser,
    removeUser,
    getUser,
    getOneUser
}