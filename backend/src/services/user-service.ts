import { db } from '../data/connection';
import {
  DbResult,
  RegistrationRequest,
  RegistrationResponse,
  ErrorHandling,
  LoginRequest,
  LoginResponse,
  User,
} from '../models';
import config from '../config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { createErrorPromise } from '.';

const register = async (
  request: RegistrationRequest
): Promise<RegistrationResponse | ErrorHandling> => {
  const { lastname, firstname, username, password } = request;

  // check if all inputs are given
  if (!lastname || !firstname) {
    return createErrorPromise('Full name is required.');
  } else if (!username) {
    return createErrorPromise('Username is required.');
  } else if (!password) {
    return createErrorPromise('Password is required.');
  } else if (password.length < 6) {
    return createErrorPromise(
      'Password needs to be at least 6 characters long.'
    );
  } else {
    // checking if username is still available
    const data: DbResult = await db
      .query(`SELECT * FROM users u WHERE u.username = ?`, [username])
      .catch(error => {
        throw new Error(`Database error: ${error.message}`);
      });

    if (data.results.length > 0) {
      return createErrorPromise('Username is already taken.');
    } else {
      // generate bcrypted password
      const saltRounds = await bcrypt.genSalt();
      const hashPromise = () => {
        return new Promise((resolve, reject) => {
          bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
              reject(err);
            } else {
              resolve(hash);
            }
          });
        });
      };

      const hash = await hashPromise().catch(() => {
        throw new Error('Hashing password ran into some error.');
      });

      // posting data to database
      await db
        .query(
          `INSERT INTO users (lastname, firstname, username, password) VALUES (?, ?, ?, ?)`,
          [lastname, firstname, username, hash]
        )
        .catch(error => {
          throw new Error(`database error: ${error.message}`);
        });

      // query inserted data
      const insertedData: DbResult = await db
        .query(
          `SELECT id, lastname, firstname, username FROM users u WHERE u.username = ?`,
          [username]
        )
        .catch(error => {
          throw new Error(`database error: ${error.message}`);
        });

      const responseData: RegistrationResponse = insertedData
        .results[0] as unknown as RegistrationResponse;
      return new Promise<RegistrationResponse>(resolve => {
        resolve(responseData);
      });
    }
  }
};

const login = async (
  request: LoginRequest
): Promise<LoginResponse | ErrorHandling> => {
  const { username, password } = request;

  if (!username && !password) {
    return createErrorPromise('Username and password are required.');
  } else if (!username && password) {
    return createErrorPromise('Username is required.');
  } else if (username && !password) {
    return createErrorPromise('Password is required.');
  } else {
    const data: DbResult = await db
      .query(`SELECT * FROM users WHERE username = ?`, [username])
      .catch(error => {
        throw new Error(`Database error: ${error.message}`);
      });

    const result: User = data.results[0] as unknown as User;

    if (!result) {
      return createErrorPromise('Username or password is incorrect.');
    } else {
      return new Promise<LoginResponse>((resolve, reject) => {
        bcrypt.compare(password, result.password, (err, bcryptResult) => {
          if (err) {
            reject(err.message);
          } else if (!bcryptResult) {
            resolve({
              status: 'error',
              message: 'Username or password is incorrect.',
            });
          } else {
            const user: User = result;
            const secret: jwt.Secret = config.accessTokenSecret as jwt.Secret;
            const accessToken: string = jwt.sign(user, secret);
            resolve({
              status: 'ok',
              authorization: `Bearer ${accessToken}`,
              username: username,
            });
          }
        });
      });
    }
  }
};

export const userService = {
  register,
  login,
};
