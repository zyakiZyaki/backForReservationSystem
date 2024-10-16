'use strict';

/**
 * reservation controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::check.check', ({ strapi }) => ({
    
    async reservation() {
        const rooms = await strapi.service('api::room.room').onlyInterNames()
        const requests = rooms.map(async room => {
            const obj = {
                "id": room.id,
                "name": room.interName,
                "bookings": await strapi.service('api::check.check').bookingsListBy(room.id)
            }
            return obj
        })
        return Promise.all(requests)
    }
})
);
