'use strict';

/**
 * cleaning controller
 */


const { createCoreController } = require('@strapi/strapi').factories;

const bookingAPI = 'api::check.check'
const roomAPI = 'api::room.room'

async function fillBookingsArr(room, bookings) {
    const date = new Date().toISOString().slice(0, 16)
    const bookingByRoom = await strapi.service(bookingAPI).sortedFilteredBookingsByDate(room.id, date)
    if(bookingByRoom[0]) {
        const obj = {...bookingByRoom[0]}
        obj.interName = room.interName
        return bookings.push(obj)
    }
    return
}

module.exports = createCoreController(bookingAPI, ({ strapi }) => ({

    async cleaning() {

        const bookings = []

        async function filteredBookings() {
            return bookings.filter(el => el).sort((a, b) => {
                if (a.checkIn < b.checkIn) {
                    return -1;
                }
            })
        }

        const rooms = await strapi.service(roomAPI).onlyInterNames();

        const requests = (rooms, bookings) => rooms.map(room => fillBookingsArr(room, bookings));

        return Promise.all(requests(rooms, bookings)).then(filteredBookings)
    }
})
);
