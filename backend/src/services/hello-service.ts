import { HelloWorldResponse } from '../models';

const getHelloWorld = async (name: string): Promise<HelloWorldResponse> => {
  const timeout = 100;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (name) {
        resolve({ message: `hello${name}` });
      } else {
        reject('Without a name I am not gonna say hello');
      }
    }, timeout);
  });
};

export const helloService = {
  getHelloWorld,
};
