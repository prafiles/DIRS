DIRS
====

Dynamic IP Remote Shell

A remote command execution implementation (suited for ssh) for scenarios where only outgoing http requests are allowed.
This also helps in cases where dynamic ips are involved or in cases where users are not acquainted with setting up ssh or likes.
 
Architecture:

Host: A central server which is pinged by both the client and terminal. 
This instance should have a public ip and should be able to open ports on it to allow listening to requests from other two.

Client: Anything which has to execute the remote commands.

Terminal: An interface to execute the remote commands.

Prerequisites

To use:

1. Clone the git.

2. npm install

3. Set up configuration file in config/config.js
  
4. "node host" on the server which is polled by both the clients.
 
5. "node client" on the client being controlled.

6. "node terminal" on the controlling client.

7. You're good to go.

Clone, Fork, Pull and contribute.