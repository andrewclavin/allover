const router = require('express').Router()
const { Artist, Artwork } = require('../models')

router.get('/', async (req, res, next) => {
    const artists = await Artist.findAll()
    res.json(artists)
})

router.post('/', async (req, res, next) => {
    const artists = await Artist.create(req.body)
    res.json(artists)
})

router.get('/:id', async (req, res, next) => {
    const artists = await Artist.findById(req.params.id).catch(next)
    res.json(artists)
})

router.put('/:id', async (req, res, next) => {
    const artists = await Artist.update(req.body, { where: {id: req.body.id} }).catch(next)
    res.json(artists)
})

router.delete('/:id', async (req, res, next) => {
    Artwork.update({artistId: null}, {where: {artistId: +req.params.id}})
    const artist = await Artist.destroy({where: {id: +req.params.id}}).catch(next)
    res.json(req.params.id)
})

module.exports = router
