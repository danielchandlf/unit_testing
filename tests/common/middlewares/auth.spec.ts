import jwt from 'jsonwebtoken';
import { auth } from '@/common/middlewares/auth';
import { NextFunction, Request, Response, response } from 'express';
import { Result } from '@/common/core/Result';

jest.mock('jsonwebtoken');

describe('Auth Middleware Test', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();
  const verify = jwt.verify as jest.MockedFunction<typeof jwt.verify>
  beforeEach(() => {
    mockRequest = {
      headers: {}
    };
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  test('it should throw 401 error with no auth headers', () => {

    auth(mockRequest as Request, mockResponse as Response, nextFunction);
    expect(mockResponse.status).toHaveBeenCalledWith(401);


  });

  test('it should call next function with valid auth token', () => {
    const validToken = 'your-valid-token-here';
    mockRequest.headers.authorization = `Bearer ${validToken}`;
    const mockJWT = jest.spyOn(jwt, "verify")
    mockJWT.mockImplementation((token, secretOrPublicKey, options, callback) => {
      return callback(null, { user: '123' });
    });
    auth(mockRequest as Request, mockResponse as Response, nextFunction);
    expect(nextFunction).toHaveBeenCalled();

  });

  test('it should throw Jwt Expired error with expired token', async () => {

    mockRequest = {
      headers: {
        'authorization': 'Bearer your_expired_token_here'
      }
    };


    jest.spyOn(jwt, 'verify').mockImplementation((token, secretOrPublicKey, options, callback) => {
      const error = new jwt.TokenExpiredError('jwt expired', new Date());
      error.message = 'jwt expired'
      callback(error, null);
    });
    auth(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(Result.fail("Access Token expired."))
    
  });


  test('it should throw error with invalid auth token', () => {
    mockRequest = {
      headers: {
        'authorization': 'Bearer invalid'
      }
    };
    jest.spyOn(jwt, 'verify').mockImplementation((token, secretOrPublicKey, options, callback) => {
      const error = new jwt.TokenExpiredError('invalid token', new Date());
      error.message = 'invalid token'
      callback(error, null);
    });
    auth(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith(Result.fail("invalid token"))
    
  });
});
