'use strict';

/**
 * room service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::room.room', ({ strapi }) => ({

    async countOfRooms() {
        const rooms = await strapi.entityService.findMany('api::room.room')
        return rooms.length
    },

    async onlyInterName(id) {
        const data = await strapi.entityService.findOne('api::room.room', id)
        return data.interName
    },

    async onlyInterNames() {
        const data = await strapi.entityService.findMany('api::room.room')
        return data.map(room => {
            const obj = {
                "id": room.id,
                "interName": room.interName
            }
            return obj
        })
    },

    async pricesByRoomId(id) {
        const roomData = await strapi.entityService.findOne('api::room.room', id, {
            populate: "prices"
        });
        return roomData.prices
    }
}));
