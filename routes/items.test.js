const request = require('supertest');

const app = require('../app');
const items = require('../fakeDB')

let pop = {name: 'lolypop', price: 1.49}


beforeEach(function(){
    items.push(pop);
})

afterEach(function(){
    items.length = 0;
})


describe('GET /api/items',  () => {
    test('should get all items', async () => {
        let res = await request(app).get('/api/items');

        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ items:[pop]})
        expect(Array.isArray(res.body.items)).toBe(true)
    })
})

describe('POST /api/items', () => {
    test('should create a new item', async () => {
        let res = await request(app).post('/api/items').send({name: 'muffin', price: 1.99})
        expect(res.statusCode).toBe(201)
        expect(res.body).toEqual({added: {name: 'muffin', price: "1.99"}})
    })
})

describe('PATCH /api/items/name', () => {
    test('should change an item', async () => {
        let res = await request(app).patch(`/api/items/${pop.name}`).send({name: 'fudge', price: 3})
        
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({updated: {name: 'fudge', price: 3}})
    })

    test('should return 404 if name is invalid', async () => {
        let res = await request(app).patch('/api/items/noni').send({name: 'fudge', price: 3})

        expect(res.statusCode).toBe(404)
        expect(res.body).toEqual({ error:'Item not found' })
    })
})

describe('GET /api/items/name', () => {
    test('should get item by name', async () => {
        let res = await request(app).get(`/api/items/${pop.name}`)

        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual( { item: { name: 'fudge', price: 3 } })
    })

    test('should return 404 if name is invalid', async () => {
        let res = await request(app).patch('/api/items/noni')

        expect(res.statusCode).toBe(404)
        expect(res.body).toEqual({ error: 'Item not found' })
    })
})

describe('DELETE /api/items/name', async () => {
    test('should delete a specific item', async () => {
        let res = await request(app).delete(`/api/items/${pop.name}`)

        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({message: 'Deleated'})
    })
    
    test('should return 404 if name is invalid', async () => {
        let res = await request(app).delete('/api/items/noni')

        expect(res.statusCode).toBe(404)
        expect(res.body).toEqual({ error: 'Item not found' })
    })
})