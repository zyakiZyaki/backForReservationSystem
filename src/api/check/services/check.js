'use strict';

/**
 * check service
 */

const { createCoreService } = require('@strapi/strapi').factories;

function sanitize(res) {
  return res.map(booking => {
      delete booking.createdAt
      delete booking.updatedAt
      return booking
  })
}

module.exports = createCoreService('api::check.check', ({ strapi }) => ({

  async findOne(id) {
    return await strapi.entityService.findOne('api::check.check', id);
  },

  async overlayBookings(roomId, checkIn, checkOut) {
    return strapi.entityService.findMany('api::check.check', {
      filters: {
        roomId: {
          $eq: roomId
        },
        $or: [
          {
            checkIn: {
              $between: [checkIn, checkOut]
            }
          },
          {
            checkOut: {
              $between: [checkIn, checkOut]
            }
          },
        ]
      }
    });
  },

  async sortedFilteredBookingsByDate(room, date) {
    const res = await strapi.entityService.findMany('api::check.check', {
      sort: {
        checkIn: "asc"
      },
      filters: {
        roomId: {
          $eq: room
        },
        checkIn: {
          $gte: date
        }
      }
    })
    return sanitize(res)
  },
  
  async bookingsListBy(id) {
    const res = await strapi.entityService.findMany('api::check.check', {
      sort: {
        checkIn: "asc"
      },
      filters: {
        roomId: {
          $eq: id
        }
      }
    })
    return sanitize(res)
  }
}));