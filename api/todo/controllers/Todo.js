'use strict';

/**
 * Todo.js controller
 *
 * @description: A set of functions called "actions" for managing `Todo`.
 */

module.exports = {

  /**
   * Retrieve todo records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.todo.fetchAll(ctx.query);
  },

  /**
   * Retrieve a todo record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.todo.fetch(ctx.params);
  },

  /**
   * Create a/an todo record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.todo.add(ctx.request.body);
  },

  /**
   * Update a/an todo record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.todo.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an todo record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.todo.remove(ctx.params);
  }
};
