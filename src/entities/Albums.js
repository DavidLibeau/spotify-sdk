'use strict';

import Client from '../Client';

/**
 * Methods for retrieving information about one or more albums from the Spotify catalog.
 *
 * @see https://developer.spotify.com/web-api/album-endpoints/
 */
class Album {

  /**
   * @param {Object} data Album object
   */
  constructor(data) {
    return Object.assign(this, data);
  }

  /**
   * Get a collection of albums that match a keyword string.
   *
   * @see https://developer.spotify.com/web-api/search-item/
   *
   * @public
   * @param {String} name Name of the album.
   * @param {Object} [query] Query parameters.
   * @returns {Promise} albumsCollection
   */
  search(name, query) {
    return Client.instance.request(`/search?type=album&q=${encodeURIComponent(name)}`, 'GET', query);
  }

  /**
   * Get a single/collection of album/s identified by its unique/list of Spotify ID.
   *
   * @see https://developer.spotify.com/web-api/get-album/
   *
   * @public
   * @param {String|Array} ids Album id/ids to retrive
   * @param {Object} [query] Query parameters.
   * @returns {Promise} Album|albumsCollection
   */
  get(ids, query) {
    if (Array.isArray(ids)) {
      return Client.instance.request(`/albums/?ids=${ids}`, 'GET', query);
    } else {
      return Client.instance.request(`/albums/${ids}`, 'GET', query);
    }
  }

  /**
   * Get Spotify catalog information about an album’s tracks. 
   *
   * @see https://developer.spotify.com/documentation/web-api/reference/albums/get-albums-tracks//
   *
   * @public
   * @param {String} id Album id to retrive
   * @param {Object} [query] Query parameters.
   * @return {Promise} tracksCollection
   */
  getTracks(id, query) {
   return Client.instance.request(`/albums/${id}/tracks`, 'GET', query);
  }

  /**
   * Get a list of new album releases featured in Spotify.
   *
   * @see https://developer.spotify.com/web-api/get-list-new-releases/
   *
   * @public
   * @required {OAuth} user-library-read
   * @param {Object} [query] Query parameters.
   * @returns {Promise} albumsCollection
   * TODO: Move
   */
  getNewReleases(query) {
    return Client.instance.request(`/browse/new-releases`, 'GET', query);
  }

}

/**
 * Exports the Album class.
 */
export default Album;