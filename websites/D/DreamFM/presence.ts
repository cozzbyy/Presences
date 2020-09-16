const presence = new Presence({ clientId: "744684298078126251" });
let sartist, strack, slisteners, sdj;

function newStats(): Promise<void> {
  window
    .fetch("https://radio.dreamfm.net/api/nowplaying/1")
    .then((res) => res.json())
    .then((data) => {
      strack = data.now_playing.song.title;
      sartist = data.now_playing.song.artist;
      sdj = data.live.streamer_name;
      slisteners = data.listeners.total;
    });
}

setInterval(newStats, 10000);
newStats();

const stamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    details: `🎙️ | ${sdj || 'AutoDJ'}`,
    state: `🎵 | ${strack || "Title"} - ${sartist || "Artist"}`,
    smallImageText: `Listeners: ${listeners}`,
    startTimestamp: stamp
  };

  if (sdj !== null) presenceData.smallImageKey = "play";
  else delete presenceData.smallImageText;

  presence.setActivity(presenceData);
});