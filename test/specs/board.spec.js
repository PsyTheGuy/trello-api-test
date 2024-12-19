import request from 'supertest';
import { API } from '../configs/environment.config.js';
import { expect } from 'chai';

let boardName = 'whateverBoard';
let boardId;
let response;

describe(`POST - Create a board`, () => {
  before(async () => {
    response = await request(API.url).post(`/1/boards/?name=${boardName}&key=${API.key}&token=${API.token}`).then(response => response);
    boardId = response.body.id;
  });
  
  it('returns with CODE 200', () => {
    expect(response.status).to.equal(200);
  });
  
  it('returns with application/json content-type header', () => {
    expect(response.headers['content-type']).to.match(/application\/json/);
  });

  it('returns the created board as json', () => {
    expect(response.body).to.have.property('name', boardName);
  });
});

describe('GET - Read a board', () => {
  before(async () => {
    response = await request(API.url).get(`/1/boards/${boardId}?key=${API.key}&token=${API.token}`).then(response => response);
  });

  it('returns with a CODE of 200', () => {
    expect(response.status).to.be.equal(200);
  });

  it('returns with application/json content-type header', () => {
    expect(response.headers['content-type']).to.match(/application\/json/);
  });

  it('returns the requested board as json', () => {
    expect(response.body).to.have.property('id', boardId);
  });  
});

describe('PUT - Update a board', () => {
  before(async () => {
    boardName = 'someBoard';
    response = await request(API.url).put(`/1/boards/${boardId}?name=${boardName}&key=${API.key}&token=${API.token}`).then(response => response);
  });

  it('returns with a CODE of 200', () => {
    expect(response.status).to.be.equal(200);
  });

  it('returns with application/json content-type header', () => {
    expect(response.headers['content-type']).to.match(/application\/json/);
  });

  it('returns the updated board as json', () => {
    expect(response.body).to.have.property('name', boardName);
  });
});

describe('DELETE - Delete a board', () => {
  before(async () => {
    response = await request(API.url).delete(`/1/boards/${boardId}?key=${API.key}&token=${API.token}`).then(response => response);
  });

  it('returns with CODE 200', () => {
    expect(response.status).to.be.equal(200);
  });

  it('returns with application/json content-type header', () => {
    expect(response.headers['content-type']).to.match(/application\/json/);
  });

  it('returns with _value null in json', () => {
    expect(response.body).to.have.property('_value', null);
  });
});