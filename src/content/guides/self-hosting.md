---
title: Host the web app yourself
description: Run the OpenTubeX web app with or without its own Invidious server, and open it in any browser.
order: 7.6
icon: lucide:container
---

The OpenTubeX web app is the same app as the [web demo](/demo/), and you can run it on your own server with Docker Compose. The setup includes an [Invidious](https://invidious.io/) server, so searches, channel pages, thumbnails, and videos load through your server instead of from YouTube or a public Invidious instance.

Your library stays in each browser, as in the web demo. The server does not store subscriptions, history, or playlists. To share them between browsers and devices, [sync them](/docs/sync/).

## Before you start

You need a computer that runs Docker with Compose.

Browsers only store the library on HTTPS addresses and on `localhost`. On a plain `http://` address, OpenTubeX can't open the library and doesn't work. To use it from other devices, give the server an HTTPS address as described in [Open it from other devices](#open-it-from-other-devices).

## Start the server

1. Create a folder for the server and download the Compose file into it:

   ```sh
   mkdir opentubex && cd opentubex
   curl -O https://raw.githubusercontent.com/OpenTubeX/OpenTubeX/development/docker/compose.yaml
   ```

2. Create a `.env` file next to it with two different random keys. Invidious uses them to sign its data and to talk to the part of the server that loads videos:

   ```sh
   echo "INVIDIOUS_HMAC_KEY=$(openssl rand -hex 8)" >> .env
   echo "INVIDIOUS_COMPANION_KEY=$(openssl rand -hex 8)" >> .env
   ```

3. Start it:

   ```sh
   docker compose up -d
   ```

4. Open `http://localhost:8080` in a browser on the same computer.

The server needs about a minute after the first start before videos play. Until then, pages load but videos show an error.

To use a different port, add `OPENTUBEX_PORT=8081` to `.env` and run `docker compose up -d` again.

## Open it from other devices

The server only accepts connections from the computer it runs on. Put an HTTPS service in front of port 8080 to reach it from other devices:

- **[Tailscale](https://tailscale.com/)** keeps the server private to your own devices. Run `tailscale serve --bg 8080` on the server, then open the `https://….ts.net` address it prints on any device in your tailnet.
- **[Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/)** gives the server a public address without opening ports. Point a tunnel at `http://localhost:8080`, and protect the address with [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) so that only you can use it.
- **A reverse proxy** such as [Caddy](https://caddyserver.com/) works with your own domain. Caddy obtains a certificate on its own:

  ```text
  opentubex.example.com {
  	reverse_proxy localhost:8080
  }
  ```

Anyone who can reach the address can use your server. With a public address, limit access with Cloudflare Access, your reverse proxy's authentication, or a firewall, so that strangers can't use your server's connection to YouTube.

## Update

Download the latest images and restart:

```sh
docker compose pull
docker compose up -d
```

The `latest` image follows stable releases. To try nightly builds, change `ghcr.io/opentubex/opentubex-web:latest` in `compose.yaml` to `ghcr.io/opentubex/opentubex-web:nightly`.

## Use the Local API

Browsers don't let web pages read YouTube's responses, so the web app has no Local API on its own. The [OpenTubeX Local API extension](https://github.com/OpenTubeX/OpenTubeX/tree/development/browser-extension) lets it request YouTube directly from your browser, as the desktop and mobile apps do. Each browser that opens the web app needs the extension:

1. Install the extension as its [README](https://github.com/OpenTubeX/OpenTubeX/tree/development/browser-extension#install) describes. It isn't in the browser add-on stores yet.
2. If you open OpenTubeX on an address other than `localhost`, open the extension's options and add that `https://` address.
3. Reload OpenTubeX.

OpenTubeX then uses the Local API, and falls back to your Invidious server when **Fallback to Non-Preferred Backend** is on. YouTube receives these requests from your browser's IP address, not your server's.

## Run it without Invidious

With the extension in every browser you use, the server doesn't need Invidious. Download the smaller Compose file instead of `compose.yaml`, and start it:

```sh
mkdir opentubex && cd opentubex
curl -O https://raw.githubusercontent.com/OpenTubeX/OpenTubeX/development/docker/compose.without-invidious.yaml
docker compose -f compose.without-invidious.yaml up -d
```

It needs no `.env` keys. Browsers without the extension use public Invidious instances instead, as in the web demo. To update, add `-f compose.without-invidious.yaml` to the commands in [Update](#update).

## Limitations

Without the extension, the web app has no Local API, as in the web demo. It can't fall back to YouTube when Invidious fails, and features that need the Local API are missing. [Choose a content provider](/docs/providers/) explains what each provider supports.

YouTube sometimes blocks servers that make many requests. If videos stop playing for everyone, restarting the server with `docker compose restart` can help. The [Invidious documentation](https://docs.invidious.io/youtube-errors-explained/) explains common YouTube errors.
