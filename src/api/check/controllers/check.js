'use strict';

/**
 * check controller
 */

const { calculateDays, calculateCost } = require('./check/calculate.js')
const { validation, sanitize } = require('./check/validation.js')

const { createCoreController } = require('@strapi/strapi').factories;

const err = (ctx, message) => ctx.send({
    message: message
}, 201);

const bookingAPI = 'api::check.check'
const roomAPI = 'api::room.room'

module.exports = createCoreController(bookingAPI, ({ strapi }) => ({

    async findOne(ctx) {
        const response = await strapi.service(bookingAPI).findOne(ctx.url.slice(12));
        const getPricesByRoomId = await strapi.service(roomAPI).pricesByRoomId(response.roomId)
        response.calc = calculateCost(calculateDays(response.checkIn, response.checkOut), getPricesByRoomId)
        return sanitize(response);
    },

    async create(ctx) {
        const data = ctx.request.body.data
        if (validation(data)) {
            const overlayBookings = await strapi.service(bookingAPI).overlayBookings(data.roomId, data.checkIn, data.checkOut)
            return overlayBookings.length ? err(ctx, 'На данные даты есть бронирование.') : await super.create(ctx)
        } else {
            return err(ctx, 'Ошибка валидации.')
        }
    },
    async update(ctx) {
        const data = ctx.request.body.data
        if(Object.keys(data).length==1) {
            return await super.update(ctx)
        }
        if (validation(data)) {
            const overlayBookings = await strapi.service(bookingAPI).overlayBookings(data.roomId, data.checkIn, data.checkOut)
            if (overlayBookings.length == 0 || overlayBookings.length == 1 && overlayBookings[0].roomId == data.roomId) {
                return await super.update(ctx)
            }
            else {
                return err(ctx, 'На данные даты есть бронирование.')
            }
        } else {
            return err(ctx, 'Ошибка валидации.')
        }
    }
})
);
