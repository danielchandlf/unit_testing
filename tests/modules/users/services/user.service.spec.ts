// import { userSignup } from '@modules/users/services/user.service';
// import * as UserRepositiory from '@modules/users/repository/user.repository';
// import { AppError, HttpCode } from '@common/exceptions/appError';
// import * as Mappers from '@modules/users/mappers/userResponseMapper';
// import sinon from 'sinon';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import { userSignin } from '@/modules/users/services/user.service';
// import { getUsers } from '@/modules/users/services/user.service';

// afterEach(() => {
//   sinon.restore();
// });

// describe('userSignup', () => {
//   const email = 'test@example.com';
//   const password = 'testPassword';
//   const payload = {
//     id: '1',
//     firstName: 'John',
//     lastName: 'Doe',
//     email,
//     password,
//     phoneNumber: '123-456-7890',
//     address: '123 Main St, Anytown USA'
//   };

//   test('it should throw an error if user already exists', async () => {
//     expect(0).not.toBeLessThanOrEqual(0);
//   });

//   test('it should return new created user with hashedPassword', async () => {
//     expect(0).not.toBeLessThanOrEqual(0);
//   });

//   test('it should throw error if creating user fails', async () => {
//     expect(0).not.toBeLessThanOrEqual(0);
//   });

//   test('it should not have "password" field in the returned data', async () => {
//     expect(0).not.toBeLessThanOrEqual(0);
//   });
// });

// describe('userSignin', () => {
//   const email = 'test@example.com';
//   const password = 'testPassword';
//   const payload = {
//     id: '1',
//     firstName: 'John',
//     lastName: 'Doe',
//     email,
//     password,
//     phoneNumber: '123-456-7890',
//     address: '123 Main St, Anytown USA'
//   };

//   test('it should throw an error if user with given email does not exist', async () => {
//     expect(0).not.toBeLessThanOrEqual(0);
//   });

//   test('it should throw error if password and email does not match', async () => {
//     expect(0).not.toBeLessThanOrEqual(0);
//   });

//   test('it should generate accessToken and refreshToken', async () => {
//     expect(0).not.toBeLessThanOrEqual(0);
//   });

//   test('it should return object containing id, name and tokens', async () => {
//     expect(0).not.toBeLessThanOrEqual(0);
//   });
// });

// describe('getUsers', () => {
//   const email = 'test@example.com';
//   const password = 'testPassword';
//   const expectedData = [
//     {
//       id: '1',
//       firstName: 'John',
//       lastName: 'Doe',
//       email,
//       phoneNumber: '123-456-7890',
//       address: '123 Main St, Anytown USA',
//       isActive: true,
//       isVerified: true,
//       createdAt: '2023-04-06T11:23:45.276Z',
//       updatedAt: '2023-04-06T11:23:45.276Z'
//     },
//     {
//       id: '2',
//       firstName: 'Jane',
//       lastName: 'Emilie',
//       email,
//       phoneNumber: '523-456-110',
//       address: '77 Gol Mont, Townany Nepal',
//       isActive: true,
//       isVerified: false,
//       createdAt: '2023-04-06T11:23:45.276Z',
//       updatedAt: '2023-04-06T11:23:45.276Z'
//     }
//   ];
//   const users = [
//     { ...expectedData[0], password },
//     { ...expectedData[1], password }
//   ];

//   test('it should throw an error if fetchUser fails', async () => {
//     expect(0).not.toBeLessThanOrEqual(0);
//   });

//   test('it should map users data proper response data', async () => {
//     expect(0).not.toBeLessThanOrEqual(0);
//   });

//   test('it should return mapped user data without password', async () => {
//     expect(0).not.toBeLessThanOrEqual(0);
//   });
// });
