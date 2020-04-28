# Kaetram (Next)

[![Codacy Grade](https://img.shields.io/codacy/grade/4eb2509a5848486194d7990e863a4663?logo=codacy)](https://app.codacy.com/manual/lemueldls/Kaetram-Next?utm_source=github.com&utm_medium=referral&utm_content=lemueldls/Kaetram-Next&utm_campaign=Badge_Grade_Settings)
[![Travis Build Status](https://img.shields.io/travis/com/lemueldls/Kaetram-Next?logo=travis)](https://travis-ci.com/lemueldls/Kaetram-Next)
[![AppVeyor Build Status](https://img.shields.io/appveyor/build/lemueldls/Kaetram-Next?logo=appveyor)](https://ci.appveyor.com/project/lemueldls/kaetram-next)
[![Codecov Coverage Status](https://img.shields.io/codecov/c/gh/lemueldls/Kaetram-Next?logo=codecov)](https://coveralls.io/github/lemueldls/Kaetram-Next?branch=master)
[![Version](https://img.shields.io/github/package-json/v/lemueldls/Kaetram-Next?style=flat)](https://github.com/lemueldls/Kaetram-Next)
[![MPL-2.0 License](https://img.shields.io/github/license/lemueldls/Kaetram-Next?style=flat)](https://github.com/lemueldls/Kaetram-Next/blob/master/LICENSE)
[![Website](https://img.shields.io/website?url=https%3A%2F%2Fkaetram.com%2F&style=flat)](https://kaetram.com/)
[![Open Issues](https://img.shields.io/github/issues/lemueldls/Kaetram-Next?style=flat)](https://github.com/lemueldls/Kaetram-Next/issues)
[![Watch This Repo](https://img.shields.io/github/watchers/lemueldls/Kaetram-Next?style=social&icon=github)](https://github.com/lemueldls/Kaetram-Next/subscription)
[![Star This Repo](https://img.shields.io/github/stars/lemueldls/Kaetram-Next?style=social&icon=github)](https://github.com/lemueldls/Kaetram-Next/stargazers)
[![Fork This Repo](https://img.shields.io/github/forks/lemueldls/Kaetram-Next?style=social&icon=github)](https://github.com/lemueldls/Kaetram-Next/fork)
[![Discord](https://img.shields.io/discord/583033499741847574?logo=discord&color=7289da&style=flat)](https://discord.gg/MmbGAaw)
[![Subreddit subscribers](https://img.shields.io/reddit/subreddit-subscribers/kaetram?style=social&icon=reddit)](https://www.reddit.com/r/kaetram/)

This repo is a **very experimental** fork of
<https://github.com/Veradictus/Kaetram-Open> to add _modern tools_ to aims to
shorten the systems development life cycle and provide continuous delivery with
high software quality (hence the `next`). _If you really want to know the
difference between the two, go to
<https://github.com/lemueldls/Kaetram-Next/wiki/Upstream-Difference>._

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

## Table of Contents

-   [Kaetram (Next)](#kaetram-next)
    -   [Table of Contents](#table-of-contents)
    -   [Features](#features)
        -   [Regions](#regions)
        -   [Tilemap](#tilemap)
        -   [Kaetram Hub](#kaetram-hub)
    -   [Get Started](#get-started)
        -   [Prerequisites](#prerequisites)
            -   [NOTE: Node.js](#note-nodejs)
            -   [NOTE: MongoDB](#note-mongodb)
        -   [Installing and Running](#installing-and-running)
    -   [Running Tests](#running-tests)
    -   [Deployment](#deployment)
    -   [Map Parsing](#map-parsing)
    -   [TODO](#todo)
        -   [Gameplay](#gameplay)
        -   [Codebase Development](#codebase-development)
        -   [Miscellaneous](#miscellaneous)
    -   [License](#license)

## Features

BQ was intended as an experiment to showcase HTML5 capabilities, since then,
technology has only served to advance. Kaetram contains a lot of ideas and
features that build on top of its predecessor, a couple is:

-   Multiplayer using [Socket.IO](https://socket.io)

-   Enhanced rendering engine (includes dynamic lighting, overlays, animated
    tiles)

-   Region system (client receives only necessary data and saves it)

-   Questing and achievements system.

-   Plugin-based combat system (for bosses/special enemies)

-   And much more

### Regions

The region system sends data to the client according to the map data of the
server. The collisions are checked both server-side and client-side to avoid
cheating. The region system makes use of dynamic tiles, which are unlocked
according to a player's progress. Furthermore, there is integrated support for
instance, where we can use a section of the map (or clone it) and reuse it for
certain groups of players. The instancing is perfect for activities such as
minigames, where we will want to run multiple instances in parallel.

### Tilemap

Kaetram is built with modularity in mind, as such, the client supports multiple
tileset parsing. The tilemap can easily be constructed using
[Tiled Map Editor](https://www.mapeditor.org/). Using our map parsing tool
located in [`tools/map/exportmap.js`](tools/map/exportmap.js) you can easily
export your creation to both the client and the server.

### Kaetram Hub

There is also support for a hub server. This can help connect servers across one
another, allowing players to interact with their friends across them in a
variety of ways (private messaging and guilds). Furthermore, the hub serves as a
gateway for determining what server to place players in. If a server is full, it
simply returns another server that has room for the player.

## Get Started

### Prerequisites

You must first [install Node.js](https://nodejs.org/en/download/) to run the
server, and [install MongoDB](https://www.mongodb.com/download-center/community)
database to store user data.

#### NOTE: Node.js

> Node.js version must be greater than or equal to `10.0.0` as anything under
> this version would interpret something like `catch {}` instead of the usual
> `catch (err) {}` as a Syntax Error. _This error is not in this codebase, it's
> in one of the necessary node modules currently installed_

#### NOTE: MongoDB

> MongoDB is a requirement for Kaetram to run with all the features enabled, but
> you can still run your own limited version if you do not want to install
> MongoDB. To do this, set `Config.offlineMode = true` in the server
> configuration. _If you do choose to install MongoDB, a user is not necessary,
> but you can enable authentication with the `Config.mongoAuth` variable in the
> [server configuration](server/config.ts)._

After installing Node.js, install all packages by running

```console
npm install
```

### Installing and Running

Before starting Kaetram, there is some pre-configuration that must be done. Run

```console
npm run setup
```

this renames the client configurations([`config.ts-dist`](config.ts-dist) to
[`config.ts`](config.ts)), and the server
configurations([`config.dev.ts`](config.dev.ts) to
[`config.json`](config.dev.ts)). Make sure the settings in the client match
those in the server. Modify the file accordingly to fit your needs.

```console
npm install
npm run build
npm start
```

## Running Tests

> TODO: Tests are unfinished, yet alone barley even started.

Tests _and coverage_ are ran with [Jest](https://jestjs.io/) To run the tests,
simply run

```console
npm test
```

## Deployment

You want to run this on your network or server? Well first, set the `host`name
and `port` of the server in the [server configuration](server/config.ts) and
[client configuration](client/data/config.ts) to match.

## Map Parsing

Once you finish modifying your map in [`tools/map/data`](tools/map/data) you can
parse the map data by executing [`exportmap.ts`](exportmap.ts) in
[`tools/map`](tools/map) directory. Example command:

```console
npx ts-node ./exportmap.ts ./data/map.json
```

To build the current game map you can run

```console
npm run map
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

## License

This project is licensed under the MPL-2.0 License - see the [LICENSE](LICENSE)
file for details
