import * as argon2 from 'argon2';

export const HASHING_OPTIONS = {
  type: argon2.argon2id,
  memoryCost: 4096,
  timeCost: 4,
  parallelism: 2,
  saltLength: 16,
  secret: Buffer.from(process.env.ARGON2_SECRET),
  salt: Buffer.from(process.env.ARGON2_SALT),
};

export async function hash(text: string) {
  return await argon2.hash(text, HASHING_OPTIONS);
}

export async function verify(text: string, hash: string) {
  return await argon2.verify(hash, text, HASHING_OPTIONS);
}
