'use strict';

/**
 * Gymaggregate.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');

module.exports = {

  /**
   * Promise to fetch all gymaggregates.
   *
   * @return {Promise}
   */

  fetchAll: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('gymaggregate', params);
    // Select field to populate.
    const populate = Gymaggregate.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Gymaggregate
      .find()
      .where(filters.where)
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  },

  /**
   * Promise to fetch a/an gymaggregate.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    // Select field to populate.
    const populate = Gymaggregate.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Gymaggregate
      .findOne(_.pick(params, _.keys(Gymaggregate.schema.paths)))
      .populate(populate);
  },

  /**
   * Promise to count gymaggregates.
   *
   * @return {Promise}
   */

  count: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('gymaggregate', params);

    return Gymaggregate
      .count()
      .where(filters.where);
  },

  /**
   * Promise to add a/an gymaggregate.
   *
   * @return {Promise}
   */

  add: async (values) => {
    // Extract values related to relational data.
    console.log('values', values)
    const relations = _.pick(values, Gymaggregate.associations.map(ast => ast.alias));
    const data = _.omit(values, Gymaggregate.associations.map(ast => ast.alias));

    // Create entry with no-relational data.
    const entry = await Gymaggregate.create(data);

    // Create relational data and return the entry.
    return Gymaggregate.updateRelations({
      id: entry.id,
      values: relations
    });
  },

  /**
   * Promise to edit a/an gymaggregate.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Gymaggregate.associations.map(a => a.alias));
    const data = _.omit(values, Gymaggregate.associations.map(a => a.alias));

    // Update entry with no-relational data.
    const entry = await Gymaggregate.update(params, data, {
      multi: true
    });

    // Update relational data and return the entry.
    return Gymaggregate.updateRelations(Object.assign(params, {
      values: relations
    }));
  },

  /**
   * Promise to remove a/an gymaggregate.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Select field to populate.
    const populate = Gymaggregate.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Gymaggregate
      .findOneAndRemove(params, {})
      .populate(populate);

    if (!data) {
      return data;
    }

    await Promise.all(
      Gymaggregate.associations.map(async association => {
        const search = _.endsWith(association.nature, 'One') || association.nature === 'oneToMany' ? {
          [association.via]: data._id
        } : {
          [association.via]: {
            $in: [data._id]
          }
        };
        const update = _.endsWith(association.nature, 'One') || association.nature === 'oneToMany' ? {
          [association.via]: null
        } : {
          $pull: {
            [association.via]: data._id
          }
        };

        // Retrieve model.
        const model = association.plugin ?
          strapi.plugins[association.plugin].models[association.model || association.collection] :
          strapi.models[association.model || association.collection];

        return model.update(search, update, {
          multi: true
        });
      })
    );

    return data;
  },
  
  bulkadd: async (values) => {
    console.log('values to insert:', values.length)

    Gymaggregate.collection.insertMany(values)
      //Mongoose 4.4.0 now supports bulk insert
      .then(function (mongooseDocuments) {
        /* ... */
        return 'happy ' + values.length + '  inserted '
      })
      .catch(function (err) {
        /* Error handling */
      });

  },
  removeall: async params => {
    console.log('rm all gymaggregate')
    const data = await Gymaggregate.remove() // remove//(ctx.params);

    return data
  }
 
};
