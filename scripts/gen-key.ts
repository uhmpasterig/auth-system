import { randomBytes } from 'crypto';
import { prompt } from 'enquirer';

interface Response {
  keyLength: string;
}

async function generateKey(): Promise<void> {
  const response: Response = await prompt({
    type: 'select',
    name: 'keyLength',
    message: 'Select key length:',
    choices: ['128', '256', '512', '1024'],
  });

  const key = randomBytes(parseInt(response.keyLength) / 8).toString('hex');
  console.log(`Your new ${response.keyLength}-bit key: ${key}`);
}

generateKey();
