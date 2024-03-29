// import { Result } from '@common/core/Result';
// import {
//   signup,
//   signin,
//   get
// } from '@modules/users/controllers/user.controller';
// import { HttpCode } from '@common/exceptions/appError';
// import { Request, Response } from 'express';
// import {
//   userSignup,
//   userSignin,
//   getUsers
// } from '@modules/users/services/user.service';
// import LoginResponse from '@/modules/users/dto/loginResponse.dto';

// jest.mock('@modules/users/services/user.service');

// beforeEach(() => {
//   jest.clearAllMocks();
// });

// describe('signup controller', () => {
//   const mockReq: Partial<Request> = {
//     body: {
//       email: 'test@example.com',
//       password: 'password123'
//     }
//   };

//   const mockRes: Partial<Response> = {
//     status: jest.fn().mockReturnThis(),
//     json: jest.fn()
//   };

//   const mockUserData = {
//     id: '123',
//     firstName: 'John',
//     lastName: 'Doe',
//     email: 'john.doe@example.com',
//     phoneNumber: '123-456-7890',
//     address: '123 Main St, Anytown USA',
//     isActive: true,
//     isVerified: true,
//     createdAt: new Date(),
//     updatedAt: new Date()
//   };

//   test('should call userSignup with the correct arguments', async () => {
//     expect(0).not.toBeLessThanOrEqual(0);
//   });

//   test('should return the correct response with status 201', async () => {
//     expect(0).not.toBeLessThanOrEqual(0);
//   });
// });

// describe('signin controller', () => {
//   const mockReq: Partial<Request> = {
//     body: {
//       email: 'test@example.com',
//       password: 'password123'
//     }
//   };

//   const mockRes: Partial<Response> = {
//     status: jest.fn().mockReturnThis(),
//     json: jest.fn()
//   };

//   const mockUserData = {
//     id: '123',
//     name: 'John Doe',
//     accessToken: 'john.doe@example.com',
//     refreshToken: 'john.doe@example.com'
//   } as LoginResponse;

//   test('should call userSignin with the correct arguments', async () => {
//     expect(0).not.toBeLessThanOrEqual(0);
//   });

//   test('should return the correct response with status 200', async () => {
//     expect(0).not.toBeLessThanOrEqual(0);
//   });
// });

// describe('getUsers controller', () => {
//   const mockReq: Partial<Request> = {};
//   const mockRes: Partial<Response> = {
//     status: jest.fn().mockReturnThis(),
//     json: jest.fn()
//   };

//   const mockUserData = [
//     {
//       id: '123',
//       firstName: 'John',
//       lastName: 'Doe',
//       email: 'john.doe@example.com',
//       phoneNumber: '123-456-7890',
//       address: '123 Main St, Anytown USA',
//       isActive: true,
//       isVerified: true,
//       createdAt: '2023-04-06T12:00:18.279Z',
//       updatedAt: '2023-04-06T12:00:18.279Z'
//     },
//     {
//       id: '345',
//       firstName: 'Xavier',
//       lastName: 'Cal',
//       email: 'xavier.cal@example.com',
//       phoneNumber: '123-456-7890',
//       address: '123 Main St, Anytown USA',
//       isActive: true,
//       isVerified: true,
//       createdAt: '2023-04-06T12:00:18.279Z',
//       updatedAt: '2023-04-06T12:00:18.279Z'
//     }
//   ];

//   test('should call getUsers with the correct arguments', async () => {
//     expect(0).not.toBeLessThanOrEqual(0);
//   });

//   test('should return the correct response with status 200', async () => {
//     expect(0).not.toBeLessThanOrEqual(0);
//   });
// });
