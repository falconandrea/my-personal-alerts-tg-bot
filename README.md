# My personal Telegram bot for alerts

![Alt text](example-gif.gif)

## How to get BOT_TOKEN

Contact [@BotFather](http://telegram.me/BotFather) on telegram for create a new bot and receive the token. Enter the token in the `BOT_TOKEN` field in `.env` file.

## How to get Client ID and Secret Key from Twitch

Go on the [Twitch Console](https://dev.twitch.tv/console/), register a new Application. Insert Name, `http://localhost` as URL OAuth and Chat Bot as Category. Get ID client and generate a new Secret. Enter the values in the `TWITCH_CLIENT_ID` and `TWITCH_SECRET` fields in `.env` file.

## For testing webhook in local env

Use [LocalTunnel](https://github.com/localtunnel/localtunnel).

```
npm install -g localtunnel
# Use the env PORT value
lt --port 5123
```

Insert the url inside `WEBHOOK_BASE_URL` field in `.env` file.

## Bot commands

```
/start
Launch the bot

/help
Show commands

/register
Command to register your Telegram user in MongoDb table

/follow NAME_CHANNEL
Command to add NAME_CHANNEL channel in your list

/unfollow NAME_CHANNEL
Command to remove NAME_CHANNEL channel from your list

/check
Command to see which of the channels you follow are live
```
