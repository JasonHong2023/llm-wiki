---
title: "flomesh-io/ztm: ZTM (Zero Trust Mesh) is a privacy-first open-source decentralized end-to-end encrypted software defined network, based on HTTP/2 tunnels. Experience boundless connectivity and mesh the globe!"
type: framework
created: 2026-07-04T08:54
updated: 2026-07-04T08:54
tags: [Markdown, English, 技術, programming, development, API, REST, Zero Trust Mesh, HTTP/2, PipyJS, JavaScript, TLS, 網絡安全, source:browser-extension]
confidence: high
---

# flomesh-io/ztm: ZTM (Zero Trust Mesh) is a privacy-first open-source decentralized end-to-end encrypted software defined network, based on HTTP/2 tunnels. Experience boundless connectivity and mesh the globe!

ZTM is an open source network infrastructure software for running a * decentralized* network. It is built upon 

*and can run on*

**HTTP/2 tunnels***such as LANs, containerized networks and the Internet, etc.*

**any sort of IP networks**ZTM lays the foundation for building * decentralized applications* by providing a set of core capabilities including:

- Network connectivity across Internet gateways and firewalls
- TLS-encrypted communication channels
- Certificate-based authentication and access control
- Decentralized application publishing and deployment
- Decentralized file discovery and data sharing

ZTM can be used in various settings ranging from a * 2-node personal network connecting one's home and workplace* to a 

*. Examples of applications that can leverage ZTM are:*

**10,000-node enterprise network connecting offices and branches across the globe**- Remote access your home computer from anywhere in the world
- Share documents, pictures and videos within a group of people without the need of a big-tech social networking platform
- Private and secure P2P data transfer without the fear of eavesdropping

ZTM is written in **PipyJS**, a JavaScript dialect designed for **Pipy** (https://github.com/flomesh-io/pipy). **Pipy** is an open source programmable proxy software. Thanks to **Pipy**, ZTM has many unique features on top of the capabilities it offers:

- 
**Fast**. HTTP/2 multiplexing is fast. And**Pipy**is fast. Like, C++ fast.
- 
**Secure**. All traffic is encrypted by TLS and has identities via certificates. By using**PipyJS**, security policy can be easily customized to meet the requirements in your organization.
- 
**Highly customizable and programmable**, since**Pipy**in itself is a general-purpose network scripting engine.
- 
**Portable**. Choose your CPU architecture: x86, ARM, MIPS, RISC-V, LoongArch... Choose your operating system: Linux, Windows, macOS, FreeBSD, Android... ZTM runs anywhere.

The easiest way to get started is download the latest binary release of ZTM from our release page. If you prefer to have your own build from the source, you can follow the instructions in Build.

The official build releases of ZTM come in two forms of packaging: the CLI tool as a SEA (Single Executable Application), and the desktop application that wraps up the CLI tool and provides a GUI for desktop environments.

In this guide, we'll be only utilizing the CLI for setting up a simple mesh. For more guides, including the usage of the desktop app, please check out our Wiki.


To enable shell completion, run:

```
mkdir -p ~/.local/share/ztm/completions
ztm completion bash > ~/.local/share/ztm/completions/ztm.bash
source ~/.local/share/ztm/completions/ztm.bash
```
For zsh users:

```
mkdir -p ~/.local/share/ztm/completions
ztm completion zsh > ~/.local/share/ztm/completions/_ztm
fpath=(~/.local/share/ztm/completions $fpath)
autoload -U compinit && compinit
```
A common setup consists of 3 nodes: 1 node running the *Hub*, the other 2 nodes running two *Agents* who wish to communicate with each other.

```
                            Data Center
          +-------------------------------------------+
          |                     Hub                   |
          |        (state in ~/.ztm/ztm-hub.db)       |
          +-------------------------------------------+
        HTTPS | Port 8888                 HTTPS | Port 8888
              |                                 |
  ------------|---------------------------------|--------------
              |             Firewall            |
  ------------|---------------------------------|--------------
              |                                 |
              |             Internet            |
              |                                 |
  ----------------------------  |  ----------------------------
          Firewall              |            Firewall
  ----------------------------  |  ----------------------------
              |                 |               |
              |                 |               |
  +--------------------------+  |  +--------------------------+
  |      Agent @ Home        |  |  |    Agent @ Workplace     |
  | (state in ~/.ztm/ztm.db) |  |  | (state in ~/.ztm/ztm.db) |
  +--------------------------+  |  +--------------------------+
                                |
```
We'll only cover the setup of a Hub on Linux, since that's where they are usually run - a cloud-hosted Linux virtual machine.


Suppose you have a Linux box in the cloud, with a public IP address `1.2.3.4` and a public TCP port `8888`. Start a Hub service by typing:

`ztm start hub --listen 0.0.0.0:8888 --names 1.2.3.4:8888 --permit root.json`You might need

`sudo`when executing the above command because it needs to install a service to`systemd`.

Now the Hub should be up an running. Plus, a file named `root.json` should have been generated for us to allow *endpoints* to join our mesh.

Once the Hub gets up and running in the cloud, we can go on and add as many *endpoints* as we like to the mesh by using the generated permit file `root.json`.

An

endpointis just a computer running in various network environments with access to the Internet.

First, start an Agent on an endpoint computer that is going to join our mesh:

`ztm start agent`On Windows, starting as a system service isn't supported yet. You'll have to do

`ztm run agent`instead.

And then, join the mesh by saying:

`ztm join MESH_NAME --as EP_NAME --permit root.json`Where `MESH_NAME` can be any name of your choice for identifying a mesh locally if you have many. `EP_NAME` is the name of your current endpoint seen by other endpoints in the same mesh. `root.json` is the permit file generated in our first step where a Hub is set up.

If everything works out, you can now check out the status of the mesh by typing:

`ztm get mesh`Or look up for endpoints that already joined the mesh:

`ztm get ep`For detailed usage of the command-line tool, type:

`ztm help`If you prefer GUI, you can open your browser and point it to `http://localhost:7777` right after command `ztm start agent`. You can join a mesh, find other endpoints, using apps and everything. Almost all functionalities ZTM provides are available from both the CLI and the GUI.

Repeat the above procedure for every endpoint in your mesh. Then, you will be able to manage your mesh via terminal or browser from any endpoint in the mesh.

Only connecting a bunch of endpoints as a mesh isn't very useful. What makes your mesh useful is the *apps* running in it. The official ZTM releases come with a number of builtin apps including:

- Tunnel - Establish secure TCP/UDP tunnels between endpoints
- Proxy - A SOCKS/HTTP forward proxy that takes in traffic from one endpoint and forward out via another endpoint
- Script - Execute *PipyJS*scripts remotely on an endpoint
- Terminal - Remote access to the shell on an endpoint

Third-party apps can also be installed. Also, new apps can be developed rather easily thanks to the *PipyJS* scripting capability of **Pipy**.

To get a list of all installed apps, type:

`ztm get app`You can use an app from either the browser GUI or the command-line tool. On a terminal, one can access an app's CLI in a way like:

`ztm APP_NAME ...`To find out detailed information about using an app via CLI, type:

`ztm APP_NAME help`ZTM supports plugins through **OpenClaw**, an AI-native gateway that integrates ZTM with external systems. Plugins enable messaging, automation, and third-party integrations.

| Component | Purpose | 
|---|---|
| OpenClaw | AI-native gateway that routes messages to/from external systems | 
| Plugins | Channel adapters that connect OpenClaw to specific platforms | 
| ZTM Chat | Built-in chat app for decentralized P2P messaging | 

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  ZTM User       │────▶│   ZTM Network   │────▶│  OpenClaw       │
│  (Chat App)     │     │   (P2P Mesh)    │     │  (AI Gateway)   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                        │
                                                        ▼
                                               ┌─────────────────┐
                                               │  External       │
                                               │  Systems        │
                                               │  (ztm-chat,     │
                                               │   slack, etc.)  │
                                               └─────────────────┘
```
The ZTM Chat plugin connects OpenClaw to ZTM Chat, enabling your AI agent to send and receive decentralized P2P messages with other ZTM users.

Follow these steps in order:

```
# Start the ZTM Agent service
ztm start agent
```
```
# Install the Chat app
ztm app install chat
# Verify installation
ztm get app
```
```
# Create a dedicated user account for the bot
ztm user add openclaw-bot
```
If OpenClaw is not yet installed, download and install it from OpenClaw Releases:

```
# Download the latest OpenClaw for your platform
# Then start the OpenClaw service
openclaw start
```
```
# Install from local path (when using ZTM source repository)
openclaw plugins install -l ./extensions/ztm-chat
# Or install from URL (when using published package)
openclaw plugins install -u https://github.com/flomesh-io/ztm/plugins/ztm-chat
```
Choose one of these methods:

**Option A: Interactive Wizard (Recommended)**

```
# Run the setup wizard
openclaw ztm-chat-wizard
# The wizard will guide you through:
# 1. ZTM Agent URL (default: https://localhost:7777)
# 2. Mesh name
# 3. Bot username (default: openclaw-bot)
# 4. mTLS authentication (optional)
# 5. Security settings
```

Note: Use`openclaw ztm-chat-wizard`when running from the ZTM source repository (before npm publication). Use`npx ztm-chat-wizard`only after the package is published to npm.

**Option B: Manual Configuration**

```
# Create config file
mkdir -p ~/.openclaw/channels
cat > ~/.openclaw/channels/ztm-chat.json << 'EOF'
{
  "agentUrl": "https://your-ztm-agent.example.com:7777",
  "meshName": "your-mesh-name",
  "username": "openclaw-bot"
}
EOF
```
For all configuration options, see ZTM Chat Plugin README.

```
# Apply the new configuration
openclaw restart
```
```
# Check channel status
openclaw channels status ztm-chat
# Test connection
openclaw channels status ztm-chat --probe
```
```
# Setup wizard
openclaw ztm-chat-wizard
# Auto-discover existing ZTM configuration
openclaw ztm-chat-discover
# Check channel status
openclaw channels status ztm-chat
# Probe connection
openclaw channels status ztm-chat --probe
# List connected peers
openclaw channels directory ztm-chat peers
# Enable/disable channel
openclaw channels disable ztm-chat
openclaw channels enable ztm-chat
```

Note: When using the ZTM source repository (before npm publication), use`openclaw ztm-chat-wizard`and`openclaw ztm-chat-discover`. Use`npx`only after the package is published to npm.

**Connection Failed**

```
# Verify ZTM Agent is running
curl https://your-ztm-agent.example.com:7777/api/meshes
# Check mesh name
ztm get mesh
# Check plugin logs
openclaw logs --level debug --channel ztm-chat
```
**No Messages Received**

```
# Verify Chat app is installed
ztm get app
# Check bot username
ztm user list
```
For detailed troubleshooting, see ZTM Chat Plugin README.

- How-to: Using ZTM for Secure Remote Desktop Protocol (RDP) Access
- QuickStart : ZTM Tunnel | Tunnel Demo
- QuickStart : ZTM Proxy
- QuickStart : ZTM Terminal
- QuickStart : ZTM Script
- QuickStart : ZTM Cloud | Cloud Demo

Here's a recap of what CLI commands you need to do on each computer node.

```
                       Cloud-hosted VM
  +---------------------------------------------------------+
  | ztm start hub --names x.x.x.x:8888 --permit root.json   | ---+
  +---------------------------------------------------------+    |
              |          x.x.x.x:8888          |                 |
  ------------|--------------------------------|-------------    |
              |            Firewall            |                 |
  ------------|--------------------------------|-------------    |
              |                                |                 |
              |            Internet            |                 | root.json
              |                                |                 |
  --------------------------   |   --------------------------    |
           Firewall            |            Firewall             |
  --------------------------   |   --------------------------    |
              |                |               |                 |
              |                |               |                 |
  +------------------------+   |   +------------------------+    |
  | ztm start agent        |   |   | ztm start agent        |    |
  | ztm join my-mesh \     |   |   | ztm join my-mesh \     | <--+
  |   --as home \          |   |   |   --as workplace \     |
  |   --permit root.json   |   |   |   --permit root.json   |
  +------------------------+   |   +------------------------+
           PC @ Home           |         PC @ Workplace
```
For more information on the CLI, please refer to:

`ztm help`

## Related Pages

- [[OpenCode_AI_編碼助理完全入門指南開源免費工具的力量_LETWEBS_來網頁資訊_引領未來線上整合提供商]]
