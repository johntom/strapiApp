'use strict';

/**
 * Gym.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');

const multer = require('multer')
const path = require('path')
const fs = require('fs.extra')

//C:\_PT has csv
const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    let dirtest = 'c:/DailyImport/import'
    let fpath = dirtest + '/' + file.originalname
    console.log('path ', fpath);

    if (!fs.existsSync(dirtest)) {
      //this.log.info("make dir");
      fs.mkdirp(dirtest, function (err) {
        if (err) {
          // this.log.info(err);
        } else {
          // this.log.info('pow!')
          cb(null, dirtest)
        }
      })
    } else cb(null, dirtest)


  },
  filename: function (req, file, cb) {

    console.log(' file.originalname', file, file.originalname)
    cb(null, file.originalname)
  },

})

var upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    console.log('upload file.mimetype', file.mimetype)

    if (file.mimetype === 'application/pdf' || file.mimetype !== 'application/xls') {
      cb(null, true);
    } else {
      req.fileValidationError = 'goes wrong on the mimetype';
      return cb(null, false, new Error('goes wrong on the mimetype'));
    }
  }
})
module.exports = {

  /**
   * Promise to fetch all gyms.
   *
   * @return {Promise}
   */

  fetchAll: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('gym', params);
    // Select field to populate.
    const populate = Gym.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Gym
      .find()
      .where(filters.where)
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  },

  /**
   * Promise to fetch a/an gym.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    // Select field to populate.
    const populate = Gym.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Gym
      .findOne(_.pick(params, _.keys(Gym.schema.paths)))
      .populate(populate);
  },
  upload: (params) => {
    // console.log('in service Gym.js:upload ')

    // let data = [{
    //   a: 'gmm'
    // }] //{data:'grm'}
    // return data
    console.log('upload files ')
    console.log('=======================')
    // let rr = path.resolve(__dirname, '..') // api dir
    let rr = path.resolve(__dirname, '../..') // 1 up  api dir
    let mess =' files uploaded'
    
    upload.array('file')(req, res, err => {
      if (err) {
        console.log('err ', err)
        this.log.info(err)
      }
      //  this.log.info(req.files)
      console.log('req.files[i req.files]', req.files, flen)
      let mess = flen + ' files uploaded'
      return res.json({ 'message': mess })
    })
  },




  fetchAllaggregate: (params) => {
    // Select field to populate.
    console.log('in service Gym.js:fetchAllaggregate ')
    return Gym

      .aggregate(
        [{
          $group: {
            _id: {
              "tenant": "$Tenant",
              "CYM": "$CYM",
              "month": {
                "$month": "$MessageLocalDateTime"
              },
              "year": {
                "$year": "$MessageLocalDateTime"
              }
            },
            "count": {
              "$sum": 1.0
            }
          }
        }]
      )
  },
  fetchAllaggregateEX1: (params) => {
    // Select field to populate.
    let x = Gym
      .aggregate(
        [{
          $group: {
            _id: {
              "tenant": "$Tenant",
              "CYM": "$CYM",
              "month": {
                "$month": "$MessageLocalDateTime"
              },
              "year": {
                "$year": "$MessageLocalDateTime"
              }
            },
            "count": {
              "$sum": 1.0
            }
          }
        }]
      ).forEach(function (rec) {
        console.log('x in services ', rec.count)
      })
    return x

    // .forEach(function (rec) {
    //   var userStr = JSON.stringify(rec);
    //   obj = {};
    //   JSON.parse(userStr, (key, value) => {

    //     if (typeof value === 'string') {
    //       obj[key] = value;
    //       print('ob t ' + obj.tenant)
    //     }
    //     if (typeof value === 'number') {
    //       obj[key] = value;
    //       if (key === 'month') {
    //         print('ob m ' + obj.month)
    //       }
    //       if (key === 'year') {
    //         print('ob y ' + obj.year)
    //       }
    //       if (key === 'count') {
    //         //print('ob ct ' + obj.count);
    //         obj.CYM = obj.year + '-' + obj.month;
    //         print('obj  value ', obj.tenant, obj.year, obj.month, obj.count);
    //         //  db.gymaggregate.save(obj);
    //         obj = {};
    //       }
    //       return value;
    //     }
    //     // print ('obj  value '+obj.tenant,obj.count);
    //     return value;
    //   });

    // });
  },

  /**
   * Promise to count gyms.
   *
   * @return {Promise}
   */

  count: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('gym', params);

    return Gym
      .count()
      .where(filters.where);
  },

  /**
   * Promise to add a/an gym.
   *
   * @return {Promise}
   */

  add: async (values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Gym.associations.map(ast => ast.alias));
    const data = _.omit(values, Gym.associations.map(ast => ast.alias));

    // Create entry with no-relational data.
    const entry = await Gym.create(data);

    // Create relational data and return the entry.
    return Gym.updateRelations({
      id: entry.id,
      values: relations
    });
  },

  /**
   * Promise to edit a/an gym.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Gym.associations.map(a => a.alias));
    const data = _.omit(values, Gym.associations.map(a => a.alias));

    // Update entry with no-relational data.
    const entry = await Gym.update(params, data, {
      multi: true
    });

    // Update relational data and return the entry.
    return Gym.updateRelations(Object.assign(params, {
      values: relations
    }));
  },

  /**
   * Promise to remove a/an gym.
   *
   * @return {Promise}
   */
  // removeall: async params => {
  //   // Select field to populate.
  //   const data = await Gym
  //     .remove();

  //   if (!data) {
  //     return data;
  //   }
  // },
  remove: async params => {
    // Select field to populate.
    const populate = Gym.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Gym
      .findOneAndRemove(params, {})
      .populate(populate);

    if (!data) {
      return data;
    }

    await Promise.all(
      Gym.associations.map(async association => {
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
  }
};
