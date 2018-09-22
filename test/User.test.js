const chai = require('chai');
const expect = chai.expect;
const url = `http://localhost:3000/`;
const request = require('supertest')(url);
import { ResponseMessage } from 'utils';

describe('Checking Register', () => {
  it('Register with email already in use', done => {
    request
      .post('graphql')
      .send({
        query:
          'mutation { register (firstName: "test2", lastName: "test2" , email: "test2@gmail.com" ,password: "test2") {id,firstName,lastName,email} }'
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.errors[0].message).equal(
          ResponseMessage.MESSAGE_EMAIL_ALREADY_IN_USE
        );
        done();
      });
  });

  it('Register with invalid email', done => {
    request
      .post('graphql')
      .send({
        query:
          'mutation { register (firstName: "test2", lastName: "test2" , email: "test" ,password: "test2") {id,firstName,lastName,email} }'
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.errors[0].message).equal(
          ResponseMessage.MESSAGE_INVALID_EMAIL
        );
        done();
      });
  });

  it('Register successful', done => {
    request
      .post('graphql')
      .send({
        query:
          'mutation { register (firstName: "test3", lastName: "test3" , email: "test3@gmail.com" ,password: "test3") {firstName,lastName,email} }'
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        if (res.body.data.register === null) {
          expect(res.body.errors[0].message).equal(
            ResponseMessage.MESSAGE_EMAIL_ALREADY_IN_USE
          );
          done();
        } else {
          const successRegisterData = {
            firstName: 'test3',
            lastName: 'test3',
            email: 'test3@gmail.com'
          };
          expect(res.body.data.register).to.deep.eq(successRegisterData);
          done();
        }
      });
  });
});
