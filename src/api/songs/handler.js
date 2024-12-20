const autoBind = require('auto-bind');

class SongsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async postSongHandler(request, h) {
    try {
      this._validator.validateSongPayload(request.payload);
      const { title, year, genre, performer, duration, albumId } = request.payload;

      const songId = await this._service.addSong({ title, year, genre, performer, duration, albumId });

      const response = h.response({
        status: 'success',
        data: { songId },
      });
      response.code(201);
      return response;
    } catch (error) {

      if (error.isJoi) {
        return h.response({
          status: 'fail',
          message: error.message,
        }).code(400);
      }

      return h.response({
        status: 'error',
        message: 'Internal server error',
      }).code(500);
    }
  }

  async getSongsHandler(request, h) {
    try {
      const { title, performer } = request.query;

      const songs = await this._service.getSongs({ title, performer });

      return {
        status: 'success',
        data: {
          songs,
        },
      };
    } catch (error) {
      return this._handleError(error, h);
    }
  }


  async getSongByIdHandler(request) {
    const { id } = request.params;
    const song = await this._service.getSongById(id);

    return {
      status: 'success',
      data: {
        song,
      },
    };
  }

  async putSongByIdHandler(request) {
    this._validator.validateSongPayload(request.payload);
    const { id } = request.params;
    const { title, year, genre, performer, duration, albumId } = request.payload;

    await this._service.editSongById(id, { title, year, genre, performer, duration, albumId });

    return {
      status: 'success',
      message: 'Song updated successfully',
    };
  }

  async deleteSongByIdHandler(request) {
    const { id } = request.params;
    await this._service.deleteSongById(id);

    return {
      status: 'success',
      message: 'Song deleted successfully',
    };
  }
}

module.exports = SongsHandler;
