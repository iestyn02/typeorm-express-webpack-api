module.exports = {
  transform: {
    "^.+\\.ts?$": "ts-jest"
  },
  moduleNameMapper: {
    "^@vars": "<rootDir>/src/config/vars",
    "^@api(.*)$": "<rootDir>/src/api/v1/$1",
    "^@models(.*)$": "<rootDir>/src/api/@models/$1",
    "^@services(.*)$": "<rootDir>/src/api/@services/$1"
  }
};
