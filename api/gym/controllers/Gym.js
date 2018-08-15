'use strict';

/**
 * Gym.js controller
 *
 * @description: A set of functions called "actions" for managing `Gym`.
 */

// const multer = require('multer')
var multer = require('koa-multer');

const path = require('path')
const fs = require('fs.extra')
// const koaBody = require('koa-body')({ multipart: true });
const bodyParser = require('koa-bodyparser');
/*

var  Router = require('koa-router');
const router = new Router();
const upload = multer({
  storage: multer.memoryStorage()
});
router.post('/upload', upload.single('document'), async ctx => {
  const { file } = ctx.req;
  // Do stuff with the file here
  ctx.status = 200;
});
*/


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

    if (file.mimetype === 'application/pdf' || file.mimetype !== 'application/xls' || file.mimetype !== 'text/csv') {
      cb(null, true);
    } else {
      req.fileValidationError = 'goes wrong on the mimetype';
      return cb(null, false, new Error('goes wrong on the mimetype'));
    }
  }
})
module.exports = {

  /**
   * Retrieve gym records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    // return strapi.services.gym.fetchAll(ctx.query);

    const data = await strapi.services.gym.fetchAll(ctx.query);
    console.log('data ', data.length)
    return data // or  ctx.send(data);//or  // Send 200 `ok`


  },
  upload: async (ctx) => {
    //return strapi.services.gym.fetchAllaggregate(ctx.query);

    // const data = await strapi.services.gym.upload(ctx.query);
    // console.log('data ', data.length)
    // const data = await strapi.services.gym.upload(ctx.query);
    // console.log('Gym.js: upload data ', data)//.length)

    // return data

    console.log('upload files ')
    console.log('=======================')
    // let rr = path.resolve(__dirname, '..') // api dir
    let rr = path.resolve(__dirname, '../..') // 1 up  api dir
    let mess = ' files uploaded'
   // let body = ctx.request.body
   // let body = `Request Body: ${JSON.stringify(ctx.request.body)}`;
    //let sbody = JSON.stringify(body)
    //app.use(bodyParser());
    // ctx.use(bodyParser());// = ctx.request.body;
    let body =ctx.request.body //bodyParser(ctx.request.body)
   //let body =JSON.stringify(ctx.request.body) //bodyParser(ctx.request.body)
    console.log('======================sbody=', body)
    upload.array('file')(body, ctx.response, err => {
      if (err) {
        console.log('err ', err)
        this.log.info(err)
      }
      //  this.log.info(req.files)
      // let flen = ctx.request.files.length
      // console.log('req.files[i req.files]', ctx.request.files, flen)
      console.log('req.files[i req.files]', ctx.request.files)
      // let mess = flen + ' files uploaded'
      return { 'message': mess }// res.json({ 'message': mess })
      ctx.send(mess)//'Hello World!');
    })
  },


  aggregate: async (ctx) => {
    //return strapi.services.gym.fetchAllaggregate(ctx.query);

    const data = await strapi.services.gym.fetchAllaggregate(ctx.query);
    console.log('Gym.js: aggregate data ', data.length)
    let obj;
    let objarray = []
    //     let loopdata = jsonRes
    data.forEach(function (rec) {
      var userStr = JSON.stringify(rec);
      obj = {};
      JSON.parse(userStr, (key, value) => {
        if (typeof value === 'string') {
          obj[key] = value;
        }
        if (typeof value === 'number') {
          obj[key] = value;
          if (key === 'count') {
            obj.CYM = obj.year + '-' + obj.month;
            console.log('obj  value ', obj.tenant, obj.year, obj.month, obj.count);
            objarray.push(obj)
            obj = {};
          }
        }

      });

    })
    //   .then((objarray) => {
    //   console.log('objarray ', objarray.length)
    //   // api.gymarray(objarray)
    //   //   .then((jsonRes) => {
    //   //   })
    //   //return data 
    // })
    // or  ctx.send(data);//or  // Send 200 `ok`
    //  ctx.table.destroy().exec(function (error)){
    //  })
    console.log('objarray 1 ==========', objarray.length)
    await strapi.services.gymaggregate.removeall()
    await strapi.services.gymaggregate.bulkadd(objarray)
    return objarray
  },

  /**
   * 
   * Retrieve a gym record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.gym.fetch(ctx.params);
  },

  /**
   * Count gym records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.gym.count(ctx.query);
  },

  /**
   * Create a/an gym record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.gym.add(ctx.request.body);
  },

  /**
   * Update a/an gym record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.gym.edit(ctx.params, ctx.request.body);
  },

  /**
   * Destroy a/an gym record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.gym.remove(ctx.params);
  }
};
