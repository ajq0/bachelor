const bodyParser = require('body-parser')

module.exports = {
  numberFormat: (req, res, next, value, name)=>{
    try{

      let num = parseInt(value)
      if(num != NaN && num >= 0){
        req.params[name] = num
        next()
      }else{
        req.params[name] = undefined
        next()
      }

    }catch(err){
      next(err)
    }
  },

  json: bodyParser.json(),

  error: (err, req, res, next)=>{

    console.error(err)

    if(err.type === 'entity.parse.failed'){

      res.status(400).send('parse error, the data given was not accepted')

    }else{

      next()

    }

  },

  authentication: (req, res, next)=>{
    let token = req.get('authorization')
    res.locals.isUser = true
    res.locals.userID = 1
    next()
  }
}
