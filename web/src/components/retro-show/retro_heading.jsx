/*
 * Postfacto, a free, open-source and self-hosted retro tool aimed at helping
 * remote teams.
 *
 * Copyright (C) 2016 - Present Pivotal Software, Inc.
 *
 * This program is free software: you can redistribute it and/or modify
 *
 * it under the terms of the GNU Affero General Public License as
 *
 * published by the Free Software Foundation, either version 3 of the
 *
 * License, or (at your option) any later version.
 *
 *
 *
 * This program is distributed in the hope that it will be useful,
 *
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 *
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *
 * GNU Affero General Public License for more details.
 *
 *
 *
 * You should have received a copy of the GNU Affero General Public License
 *
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import React from 'react';
import {FlatButton, FontIcon, RaisedButton} from 'material-ui';
import types from 'prop-types';
import RetroMenu from '../shared/retro_menu';
import {DEFAULT_TOGGLE_STYLE} from "../shared/constants";
import Dialog from "material-ui/Dialog";
import Toggle from "material-ui/Toggle";


// not pure: uses window.localStorage to check login status
export default class RetroHeading extends React.Component {
  static propTypes = {
    retro: types.object.isRequired,
    retroId: types.string.isRequired,
    archives: types.bool.isRequired,
    isMobile: types.bool.isRequired,
    routeToRetroArchives: types.func.isRequired,
    routeToRetroSettings: types.func.isRequired,
    requireRetroLogin: types.func.isRequired,
    showDialog: types.func.isRequired,
    onShareRetro: types.func.isRequired,
    onArchiveRetro: types.func.isRequired,
    signOut: types.func.isRequired,
  };

  // 1. we completely decouple RetroHeading from the fact that we show a dialog
  // 2. we modify showDialog to accept a renderer/component, not just title and message
  // 3. modal manager

  constructor(props) {
    super(props);

    this.onArchivesButtonClicked = this.onArchivesButtonClicked.bind(this);
    this.handleViewArchives = this.handleViewArchives.bind(this);
    this.handleRetroSettings = this.handleRetroSettings.bind(this);
  }

  onArchivesButtonClicked() {
    const {retroId} = this.props;
    this.props.routeToRetroArchives(retroId);
  }

  renderBackButton() {
    const {archives, isMobile} = this.props;
    if (!archives) {
      return null;
    }
    return (
      <div className="small-2 columns back-button">
        <FlatButton
          className="retro-back"
          onClick={this.onArchivesButtonClicked}
          label="Archives"
          labelStyle={isMobile ? {'display': 'none'} : {}}
          icon={<FontIcon className="fa fa-chevron-left"/>}
        />
      </div>
    );
  }

  handleViewArchives() {
    const {retroId} = this.props;
    this.props.routeToRetroArchives(retroId);
  }

  handleRetroSettings() {
    const {retroId} = this.props;

    if (window.localStorage.getItem(`apiToken-${retroId}`) !== null) {
      this.props.routeToRetroSettings(retroId);
    } else {
      this.props.requireRetroLogin(retroId);
    }
  }

  getMenuItems() {
    const {archives, retro} = this.props;
    const items = [
      {
        title: 'Archive this retro',
        callback: this.props.onArchiveRetro,
        isApplicable: !archives && retro.items && retro.items.length > 0,
        button: true,
      },
      {
        title: 'View archives',
        callback: this.handleViewArchives,
        isApplicable: !archives && retro.archives && retro.archives.length > 0,
      },
      {
        title: 'Retro settings',
        callback: this.handleRetroSettings,
        isApplicable: true,
      },
      {
        title: 'Sign out',
        callback: this.props.signOut,
        isApplicable: window.localStorage.length > 0,
      },
    ];

    return items.filter((item) => item.isApplicable);
  }

  render() {
    const {retro, isMobile} = this.props;

    return (
      <div className="retro-heading">
        {this.renderBackButton()}
        <span className="retro-heading-content">
          <div className="retro-name">
            <h1>{retro.name}</h1>
          </div>
          <div className="retro-heading-buttons">
            <RaisedButton
              className="retro-heading-button share-button"
              backgroundColor="#2574a9"
              labelColor="#f8f8f8"
              label="SHARE"
              onClick={this.props.onShareRetro}
            />
            {
              retro.video_link ? (
                <RaisedButton
                  className="retro-heading-button video-button"
                  backgroundColor="#2574a9"
                  labelColor="#f8f8f8"
                  href={retro.video_link}
                  target="_blank"
                  label="VIDEO"
                />
              ) : null
            }

            <RetroMenu isMobile={isMobile} items={this.getMenuItems()}/>
          </div>
        </span>
      </div>
    );
  }
}
