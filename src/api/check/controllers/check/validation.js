'use strict'

module.exports = { validation, sanitize }

async function validation(data) {
    const count = await strapi.service('api::room.room').countOfRooms()
    if(data.checkIn && data.checkOut) {
        return data.checkIn > data.checkOut || data.roomId > count ? false : true
    }
    else {
        return data.roomId > count ? false : true
    }
}

function sanitize(booking) {
    delete booking.createdAt
    delete booking.updatedAt
    return booking
}