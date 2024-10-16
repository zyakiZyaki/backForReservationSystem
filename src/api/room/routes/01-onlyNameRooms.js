module.exports = {
    routes: [
      {
        method: 'GET',
        path: '/rooms/names',
        handler: 'room.onlyNames',
      }
    ]
  }