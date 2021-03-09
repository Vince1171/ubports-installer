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

const Plugin = require("../plugin.js");
const api = require("./api.js");

/**
 * OpenGApps plugin
 * @extends Plugin
 */
class OpenGAppsPlugin extends Plugin {
  /**
   * archs remote_values
   * @returns {Promise<Array<Object>>}
   */
  remote_values__archs() {
    return api.getArch().then(archs => {
      Object.keys(archs).map(arch => ({
        value: arch,
        label: arch
      }));
    });
  }

  /**
   * variants remote_values
   * @returns {Promise<Array<Object>>}
   */
  remote_values__variants() {
    return api.getVariants("arm64", "10.0").then(variants =>
      variants.map(variant => ({
        value: variants.indexOf(variant),
        label: variant.name
      }))
    );
  }

  /**
   * androidVersions remote_values
   * @returns {Promise<Array<Object>>}
   */
   remote_values__androidVersions() {
    return api.getSupportedVersions("arm64").then(versions =>
        Object.keys(versions).map(version => ({
        value: version,
        label: version
      }))
    );
  }

}

module.exports = OpenGAppsPlugin;
