'use strict';

/**
 * Bakery.js controller
 *
 * @description: A set of functions called "actions" for managing `Bakery`.
 */

module.exports = {

  /**
   * Retrieve bakery records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    const data = await strapi.services.bakery.fetchAll(ctx.query);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve a bakery record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    const data = await strapi.services.bakery.fetch(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Create a/an bakery record.
   *
   * @return {Object}
   */
  create: async (ctx) => {
    console.log('controller bakery')
    console.log('ctx.request.body',ctx.request.body)
   
    const data = await strapi.services.bakery.add(ctx.request.body);
    console.log('data bakery',data)
   
    // Send 201 `created`
    ctx.created(data);
  
    // NEW LINE: call our method emitToAllUsers and pass it body request
    strapi.emitToAllUsers(ctx.request.body);
  },
  // create: async (ctx) => {
  //   const data = await strapi.services.bakery.add(ctx.request.body);

  //   // Send 201 `created`
  //   ctx.created(data);
  // },

  /**
   * Update a/an bakery record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    const data = await strapi.services.bakery.edit(ctx.params, ctx.request.body) ;

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Destroy a/an bakery record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    const data = await strapi.services.bakery.remove(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  }
};
