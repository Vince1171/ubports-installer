"use strict";

/*
 * Copyright (C) 2020-2021 UBports Foundation <info@ubports.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

const axios = require("axios");

/** @module opengapps */

const baseURL = "https://api.opengapps.org/";
const opengapps_list = `${baseURL}list`;

const api = axios.create({ baseURL, timeout: 15000 });


/**
 * get all available channel for a given arch and Android version
 * @param {String} arch device arch
 * @param {String} version device Android version
 * @returns {Promise<Array<String>>} channels
 * @throws {Error} message "unsupported" if 404 not found
 */
 const getChannels = (arch, version) =>
 api
   .get(`${opengapps_list}`)
   .then(({ data }) => { return data.archs[arch].apis[version].variants })
   .catch(error => {
     throw error;
   });
module.exports = { getChannels };
