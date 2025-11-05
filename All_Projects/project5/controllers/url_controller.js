const URL = require('../models/url')
const shortid = require('shortid')




async function HandleUrlCreate(req,res) {
    const body = req.body
    if(!body.url){ return res.status(400).render('index', { message: 'URL is required' });}
    const shortID = shortid(5)
    const adddata = await URL.create({
        id:shortID,
        URL:String(body.url),
        History:[]

    })
    
    return res.status(201).render('index', { message: 'Successfully created', shortID: shortID })

    
}

async function HandleGetUrlsandUpdate(req,res) {

    const shortID = req.params.id
    console.log('Redirecting for id:', shortID);

    const entry = await URL.findOneAndUpdate({id: shortID},{$push:{History:{timestamps:Date.now()}}},{ new: true } )
    if (!entry) {
  return res.status(404).send('Short URL not found');
}

    return res.status(201).redirect(entry.URL)
}


async function HandleGetAllData(req,res) {
    
    return res.status(201).render('index',{message: null,shortID: null})
    
}


module.exports = {
    HandleUrlCreate,
    HandleGetUrlsandUpdate,
    HandleGetAllData
}