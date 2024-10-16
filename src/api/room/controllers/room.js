'use strict';

/**
 * room controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::room.room', ({ strapi }) => ({

    async onlyNames(ctx) {

        const data = []
        const content = await super.find(ctx)
        content.data.forEach(el => {
            const obj = {}
            obj.id = el.id,
            obj.name = el.attributes.interName
            return data.push(obj)
        })
        
        return data
    }

}));
