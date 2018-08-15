
// /**
//  * Uploadcustom.js controller
//  *
//  * @description: A set of functions called "actions" for managing `Uploadcustom`.
//  */
// 'use strict'

// const Controller = require('trails-controller')
// const multer = require('multer')
// const path = require('path')
// const fs = require('fs.extra')



// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
   
//     let dirtest ='c:/DailyImport/import'
//     let fpath=dirtest+'/'+file.originalname
//     console.log('path ', fpath);

//     if (!fs.existsSync(dirtest)) {
//       //this.log.info("make dir");
//       fs.mkdirp(dirtest, function (err) {
//         if (err) {
//           // this.log.info(err);
//         } else {
//           // this.log.info('pow!')
//           cb(null, dirtest)
//         }
//       })
//     } 
//       else    cb(null, dirtest)
       

//   },
//   filename: function (req, file, cb) {
   
//     console.log(' file.originalname', file, file.originalname)
//     cb(null, file.originalname)
//   },

// })

// var upload = multer({
//   storage: storage,
//   fileFilter: function (req, file, cb) {
//     console.log('upload file.mimetype', file.mimetype)
   
//     if (file.mimetype === 'application/pdf' || file.mimetype !== 'application/xls') {
//       cb(null, true);
//     } else {
//       req.fileValidationError = 'goes wrong on the mimetype';
//       return cb(null, false, new Error('goes wrong on the mimetype'));
//     }



//   }



// })
// /**
//  * @module UploadController
//  * @description Generated Trails.js Controller.
//  */

// module.exports =
//   class UploadController extends Controller {
//     // send (req, res, next) {
//     uploadfilesinvoice(req, res) {
//       console.log('uploadfilesinvoice files ')
//       console.log('=======================')
//       // let rr = path.resolve(__dirname, '..') // api dir
//       let rr = path.resolve(__dirname, '../..') // 1 up  api dir


//     }
//     uploadfiles(req, res) {
//       console.log('upload files ')
//       console.log('=======================')
//       // let rr = path.resolve(__dirname, '..') // api dir
//       let rr = path.resolve(__dirname, '../..') // 1 up  api dir
   
//       upload.array('file')(req, res, err => {
//         if (err) {
//           console.log('err ', err)
//           this.log.info(err)
//         }
//         //  this.log.info(req.files)
//         let flen = req.files.length
//         console.log('req.files[i req.files]', req.files, flen)
//                let mess = flen + ' files uploaded'
//         return res.json({ 'message': mess })
//       })

     

//     }
//   }

'use strict';

const multer = require('multer')
const path = require('path')
const fs = require('fs.extra')

//C:\_PT has csv
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
   
    let dirtest ='c:/DailyImport/import'
    let fpath=dirtest+'/'+file.originalname
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
    } 
      else    cb(null, dirtest)
       

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
   * Retrieve uploadcustom records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.uploadcustom.search(ctx.query);
    } else {
      return strapi.services.uploadcustom.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a uploadcustom record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.uploadcustom.fetch(ctx.params);
  },

  /**
   * Count uploadcustom records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.uploadcustom.count(ctx.query);
  },

  /**
   * Create a/an uploadcustom record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.uploadcustom.add(ctx.request.body);
  },

  /**
   * Update a/an uploadcustom record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.uploadcustom.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an uploadcustom record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.uploadcustom.remove(ctx.params);
  },


  uploadfilesinvoice(req, res) {
    console.log('uploadfilesinvoice files ')
    console.log('=======================')
    // let rr = path.resolve(__dirname, '..') // api dir
    let rr = path.resolve(__dirname, '../..') // 1 up  api dir




  },
  uploadxls(req, res) {
    console.log('upload files ')
    console.log('=======================')
    // let rr = path.resolve(__dirname, '..') // api dir
    let rr = path.resolve(__dirname, '../..') // 1 up  api dir
    let mess =' files uploaded'
    //return res.json({ 'message': mess })
    return { 'message': mess }
  },
  uploadfiles(req, res) {
    console.log('upload files ')
    console.log('=======================')
    // let rr = path.resolve(__dirname, '..') // api dir
    let rr = path.resolve(__dirname, '../..') // 1 up  api dir
    let mess =' files uploaded'
    //return res.json({ 'message': mess })
    return { 'message': mess }

    // upload.array('file')(req, res, err => {
    //   if (err) {
    //     console.log('err ', err)
    //     this.log.info(err)
    //   }
    //   //  this.log.info(req.files)
    //   console.log('req.files[i req.files]', req.files, flen)
    //   let mess = flen + ' files uploaded'
    //   return res.json({ 'message': mess })
    // })
   

  }


};
