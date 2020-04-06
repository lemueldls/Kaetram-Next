# Kaetram (Next)

[![Codacy Grade](https://img.shields.io/codacy/grade/4eb2509a5848486194d7990e863a4663?logo=codacy)](https://app.codacy.com/manual/lemueldls/Kaetram-Next?utm_source=github.com&utm_medium=referral&utm_content=lemueldls/Kaetram-Next&utm_campaign=Badge_Grade_Settings)
[![Travis Build Status](https://img.shields.io/travis/com/lemueldls/Kaetram-Next?logo=travis)](https://travis-ci.com/lemueldls/Kaetram-Next)
[![Codecov Coverage Status](https://img.shields.io/codecov/c/gh/lemueldls/Kaetram-Next?logo=codecov)](https://coveralls.io/github/lemueldls/Kaetram-Next?branch=master)
[![Version](https://img.shields.io/github/package-json/v/lemueldls/Kaetram-Next?style=flat)](https://github.com/lemueldls/Kaetram-Next)
[![MPL-2.0 License](https://img.shields.io/github/license/lemueldls/Kaetram-Next?style=flat)](https://github.com/lemueldls/Kaetram-Next/blob/master/LICENSE)
[![Website](https://img.shields.io/website?url=https%3A%2F%2Fkaetram.com%2F&style=flat)](https://kaetram.com/)
[![Open Issues](https://img.shields.io/github/issues/lemueldls/Kaetram-Next?style=flat)](https://github.com/lemueldls/Kaetram-Next/issues)
[![Watch This Repo](https://img.shields.io/github/watchers/lemueldls/Kaetram-Next?style=social&icon=github)](https://github.com/lemueldls/Kaetram-Next/subscription)
<!-- /watchers -->
[![Star This Repo](https://img.shields.io/github/stars/lemueldls/Kaetram-Next?style=social&icon=github)](https://github.com/lemueldls/Kaetram-Next/stargazers)
[![Fork This Repo](https://img.shields.io/github/forks/lemueldls/Kaetram-Next?style=social&icon=github)](https://github.com/lemueldls/Kaetram-Next/fork)
[![Discord](https://img.shields.io/discord/583033499741847574?logo=discord&color=7289da&style=flat)](https://discord.gg/MmbGAaw)
[![Subreddit subscribers](https://img.shields.io/reddit/subreddit-subscribers/kaetram?style=social&icon=reddit)](https://www.reddit.com/r/kaetram/)

This repo is a **very experimental** fork of
<https://github.com/Veradictus/Kaetram-Open> with the goal to add _modern tools_
to enhance development in production (hence the `next`).

Kaetram is an open-source game-engine created to aid those interested in
entering the game development realm. The codebase is simple, clean, and
intuitive. This project is intended to be used as a learning tool. The original
idea is based on Little Workshop's demo game &ndash; BrowserQuest (BQ). This
game uses original BQ assets as well as custom-made ones. The entire code-base
has been written from scratch, using more modern approaches.

**Live Version** &ndash; <https://kaetram.com>

**Discord** &ndash; <https://discord.gg/MmbGAaw>

![Demo1](https://i.imgur.com/slnzrZB.png)
![Demo2](https://i.imgur.com/jS5d3oq.png)
![Demo3](https://i.imgur.com/cZTFqnd.png)

## Features

BQ was intended as an experiment to showcase HTML5 capabilities, since then,
technology has only served to advance. Kaetram contains a lot of ideas and
features that builds on top of its predecessor, a couple are:

-   Multiplayer using Socket.IO
-   Enhanced rendering engine (includes dynamic lighting, overlays, animated
    tiles)
-   Region system (client receives only necessary data and saves it)
-   Questing and achievements system.
-   Plugin-based combat system (for bosses/special enemies)
-   And much more

### Regions

Kaetram is built with modularity in mind, as such, the client supports multiple
tileset parsing. The tilemap can easily be constructed using
[Tiled Map Editor](https://www.mapeditor.org/). Using our map parsing tool
located in `tools/map/exportmap.ts` you can easily export your creation to both
the client and the server.

### Kaetram Hub

The rendering engine has been updated such that it can handle multiple tilesets
the same way Tiled editor can. Simply drop in your tileset in the
`client/img/tilesets`. There is also support for a hub server. This can help
connect servers across one another, allowing players to interact with their
friends across them in a variety of ways (private messaging and guilds).
Furthermore, the hub serves as a gateway for determining what server to place
players in. If a server is full, it simply returns another server that has room
for the player.

## Installing and Running

You must first [install Node JS](https://nodejs.org/en/download/) to run the
server.

Before starting Kaetram, there is some configuration that must be done. Run

```console
# If you use NPM:
npm run setup

# If you use Yarn:
yarn setup
```

this renames `config.ts-dist` to `config.ts`, and `config.dev.ts` to
`config.json`. Make sure the settings in the client match those in the server.
Modify the file as to fit your needs.

MongoDB is a requirement for Kaetram to run with all the features enabled, but
you can still run your own limited version if you do not want to install
MongoDB. To do this, set `offlineMode = true` in the server configuration.

If you do choose to install MongoDB, a user is not necessary, but you can enable
authentication with the `mongoAuth` variable in the server configuration.

```console
# If you use NPM:
npm install
npm start

# If you use Yarn:
yarn
yarn start
```

## Map Parsing

Once you finish modifying your map in `tools/map/data` you can parse the map
data by executing `exportmap.ts` in `tools/map` directory. Example command:

```console
npx ts-node ./exportmap.ts ./data/map.json
```

In order to build the current game map you can run

```console
# If you use NPM:
npm run map

# If you use Yarn:
yarn map
```

## TODO

### Gameplay

-   Finalize the new map.
-   Polish mob attributes.
-   Have a consistent storyline that goes with the game.
-   Implement special abilities and weapon perks.
-   Improve anti-cheating detections.
-   Add minigames

### Codebase Development

-   Write documentation outlining the entirety of the source code.

### Miscellaneous

-   Add (continue) to NPC talking &mdash; spacebar when talking
