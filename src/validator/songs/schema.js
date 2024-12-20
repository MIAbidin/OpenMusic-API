const Joi = require('joi');

const currentYear = new Date().getFullYear();
const SongPayloadSchema = Joi.object({
  title: Joi.string().min(1).required(),  // Title must be a non-empty string
  year: Joi.number().integer().min(1500).max(currentYear).required(),
  genre: Joi.string().min(1).required(),  // Genre must be a non-empty string
  performer: Joi.string().required(),
  duration: Joi.number(),
  albumId: Joi.string(),
});

module.exports = { SongPayloadSchema };
