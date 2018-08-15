'use strict';

/**
 * Gymaggregate.js controller
 *
 * @description: A set of functions called "actions" for managing `Gymaggregate`.
 */

module.exports = {

  /**
   * Retrieve gymaggregate records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.gymaggregate.fetchAll(ctx.query);
  },

  /**
   * Retrieve a gymaggregate record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.gymaggregate.fetch(ctx.params);
  },

  /**
   * Count gymaggregate records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.gymaggregate.count(ctx.query);
  },

  /**
   * Create a/an gymaggregate record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.gymaggregate.add(ctx.request.body);
  },

  /**
   * Update a/an gymaggregate record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.gymaggregate.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an gymaggregate record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.gymaggregate.remove(ctx.params);
  }
};
