const { SongPayloadSchema } = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const SongsValidator = {
  validateSongPayload: (payload) => {
    const validationResult = SongPayloadSchema.validate(payload);
    if (validationResult.error) {
      const error = new InvariantError(validationResult.error.message);
      error.isJoi = true;
      throw error;
    }
  },

};

module.exports = SongsValidator;
