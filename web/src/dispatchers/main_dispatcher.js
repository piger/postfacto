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

export default function (retroActionCreators, routerActionDispatcher) {
  return {
    redirectToHome() {
      routerActionDispatcher.home();
    },
    requireRetroLogin({data}) {
      routerActionDispatcher.retroLogin(data.retro_id);
    },
    redirectToRetroCreatePage() {
      routerActionDispatcher.newRetro();
    },
    routeToRetroArchives({data}) {
      routerActionDispatcher.retroArchives(data.retro_id);
    },
    routeToRetroArchive({data}) {
      routerActionDispatcher.retroArchive(data.retro_id, data.archive_id);
    },
    routeToRetroSettings({data}) {
      routerActionDispatcher.retroSettings(data.retro_id);
    },
    routeToRetroPasswordSettings({data}) {
      routerActionDispatcher.retroPasswordSettings(data.retro_id);
    },
    backPressedFromArchives({data}) {
      routerActionDispatcher.showRetroForId(data.retro_id);
    },
    signOut() {
      window.localStorage.clear();
      routerActionDispatcher.home();
    },
    backPressedFromSettings({data}) {
      routerActionDispatcher.showRetroForId(data.retro_id);
    },
    backPressedFromPasswordSettings({data}) {
      routerActionDispatcher.retroSettings(data.retro_id);
    },
    retroNotFound() {
      retroActionCreators.setNotFound({retro_not_found: true});
    },
    resetRetroNotFound() {
      retroActionCreators.setNotFound({retro_not_found: false});
    },
    notFound() {
      retroActionCreators.setNotFound({not_found: true});
    },
    resetNotFound() {
      retroActionCreators.setNotFound({not_found: false});
    },
    apiServerNotFound() {
      retroActionCreators.setNotFound({api_server_not_found: true});
    },
    resetApiServerNotFound() {
      retroActionCreators.setNotFound({api_server_not_found: false});
    },
    websocketRetroDataReceived({data}) {
      if (data.command === 'force_relogin') {
        retroActionCreators.forceRelogin(data.payload.originator_id, data.payload.retro.slug);
      } else {
        retroActionCreators.currentRetroUpdated(data.retro);
      }
    },
    websocketSessionDataReceived({data}) {
      retroActionCreators.updateWebsocketSession(data.payload);
    },
    toggleSendArchiveEmail({data: {currentSendArchiveEmail}}) {
      retroActionCreators.currentRetroSendArchiveEmailUpdated(!currentSendArchiveEmail);
    },
    hideAlert() {
      retroActionCreators.clearAlert();
    },
    showDialog({data}) {
      retroActionCreators.showDialog(data);
    },
    hideDialog() {
      retroActionCreators.clearDialog();
    },
    clearErrors() {
      retroActionCreators.clearErrors();
    },
  };
}
