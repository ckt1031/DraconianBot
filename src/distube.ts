import { DisTube } from 'distube';
import { SoundCloudPlugin } from '@distube/soundcloud';
import { SpotifyPlugin } from '@distube/spotify';
import { YtDlpPlugin } from '@distube/yt-dlp';

import client from './bot';

export default new DisTube(client, {
  // While playing
  leaveOnStop: false,
  leaveOnEmpty: true,
  leaveOnFinish: true,
  // Emits
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  // Plugins
  plugins: [
    new YtDlpPlugin({
      update: true,
    }),
    new SoundCloudPlugin(),
    new SpotifyPlugin({
      emitEventsAfterFetching: true,
    }),
  ],
});
