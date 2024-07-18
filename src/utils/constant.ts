export const API_PREFIX_PATH = '/interview/api/v1';

export const THROTTLE_TTL = 60;
export const THROTTLE_LIMIT = 30;

export const SALT_ROUNDS = 10;

export const PAGINATION = {
  LIMIT: 10,
  PAGE_DEFAULT: 1,
};

export const TIMEZONE = 'Asia/Tokyo';

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const PASSWORD_VALID_REGEX =
  /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d)(.{8,})$/;
