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
 * get latest build from the api
 * @param {String} arch the target architecture
 * @param {String} version version of android targetted
 * @param {String} variant pico/nano/micro/etc...
 * @returns {Promise<Array<Object>>} images array
 * @throws {Error} message "no network" if request failed
 */
const getLatestBuild = (arch, version, variant) =>
  api
    .get(`${opengapps_list}`)
    .then(({ data }) => {
      return api
        .get(data.archs[arch].apis[version].variants[variant].md5)
        .then(md5file => {
          console.log("bloppy");
          var md5 = String(md5file.data).split("  ")[0];
          return [
            {
              url: data.archs[arch].apis[version].variants[variant].zip,
              checksum: {
                sum: md5,
                algorithm: "md5"
              },
              name: "opengapps.zip"
            }
          ];
        });
    })
    .catch(error => {
      throw error;
    });

/**
 * get all available archs
 * @returns {Promise<Array<String>>} archs
 * @throws {Error} message "unsupported" if 404 not found
 */
const getArch = () =>
  api
    .get(`${opengapps_list}`)
    .then(({ data }) => {
      return data.archs;
    })
    .catch(error => {
      throw error;
    });

/**
 * get all available variants for a given arch and Android version
 * @param {String} arch device arch
 * @param {String} version device Android version
 * @returns {Promise<Array<String>>} variants
 * @throws {Error} message "unsupported" if 404 not found
 */
const getVariants = (arch, version) =>
  api
    .get(`${opengapps_list}`)
    .then(({ data }) => {
      return data.archs[arch].apis[version].variants;
    })
    .catch(error => {
      throw error;
    });

/**
 * get all Android version supported
 * @param {String} arch device arch
 * @returns {Promise<Array<String>>} versions
 * @throws {Error} message "unsupported" if 404 not found
 */
 const getSupportedVersions = (arch) =>
 api
   .get(`${opengapps_list}`)
   .then(({ data }) => { return data.archs[arch].apis; })
   .catch(error => {
     throw error;
   });

module.exports = { getArch, getVariants, getLatestBuild, getSupportedVersions };
