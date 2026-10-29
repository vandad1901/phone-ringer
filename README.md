# Phone Ringer

An Android app that turns one phone into a remote-controlled ringer. One phone runs the **Player**, which listens on the local network and plays a ring sound. A second phone uses the **Remote** tab to connect to it and start or stop the ring.

## Usage

1. Install the app on both phones and connect them to the same Wi-Fi network.
2. On the ringing phone, open the **Player** tab and note the IP address it shows. Optionally, tap **Blackout** to turn the screen black; tap anywhere to bring it back.
3. On the other phone, open the **Remote** tab, enter that IP and tap **Connect**. Then use **Play** and **Stop**.

The Player listens on TCP port `9333` and accepts the newline-terminated commands `PLAY` and `STOP`, so you can also trigger it from a computer:

```sh
echo PLAY | nc <phone-ip> 9333
```

## Download

You can find the downloadable assets in [GitHub Release](https://github.com/vandad1901/phone-ringer/releases).

## Development

```sh
pnpm install
pnpm android
```
