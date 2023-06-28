---
title: Switch Terminal.app Theme On SSH Connection
date: "2021-02-11"
description: "Change Terminal.app Themes automatically when connecting to different SSH hosts."
---

You are in your terminal, remoting into a server in your stage
environment. Time to run that script to drop a bunch of database tables
(isn't Friday at 4:59 PM the best?)!

*Sinking Feeling...* That was Stage, right? All these terminal tabs look
the same!

Whether you're running commands on remote machines and want some peace
of mind or just want a little more swag, adding some color to distinguish 
your SSH sessions sure is nice.

**Here's how I got it done on my Mac's default terminal, Terminal.app.**

> Note: If you don't use Terminal.app as your terminal emulator,
> you could replace all references of running the AppleScript with 
> another script that interfaces with your terminal.

## Set Up

### Terminal Settings

The terminal has a selection of themes available in the terminal
preferences.

![Terminal Preferences](./terminal-preferences.png)

These themes can be really detailed and are what we are going to switch
dynamically when connecting to different SSH connections. We can use any
of the default themes here or create our own.

While we are here, We want to tweak the setting to ensure
`New tabs open with: Default Profile`.

![Terminal Preferences](./settings.png)

### AppleScript 

Now, let's create an AppleScript, 
`$HOME/Documents/scripts/changeTerminalTheme.scpt`, 
that updates the current Terminal tab's theme. 

```javascript
on run argv
    tell application "Terminal"
        set defaultTheme to name of default settings
        if (count of argv) is 0 then set argv to {defaultTheme}
        set current settings of selected tab of front window to settings set (item 1 of argv)
    end tell
end run
```

This small script takes the name of any theme we have defined in our 
Terminal preferences, and sets only the active tab to that theme. If
no theme name is passed, it uses the default theme.

See our script in action:

<p align="center">
  <img width="630" src="./apple-script-demo.gif">
</p>

Progress!

### SSH Alias

Add this alias to your `~/.bash_aliases` and make sure it is sourced
in your `~/.zshrc` (or `~/.bashrc`) with `source $HOME/.bash_aliases`.
This switches the terminal back to our default theme when an SSH 
connection closes.

```shell
#! /bin/bash

function ssh_alias() {
  trap "osascript ~/Documents/scripts/changeTerminalTheme.scpt" INT EXIT
  ssh "$@";
}

alias ssh=ssh_alias
```

### SSH Config

1. Edit `/etc/ssh/ssh_config` and ensure `PermitLocalCommand yes` is under your `Host *` config.
2. Edit `~/.ssh/config` and define the themes for any given host:
```shell
Host your.production.host
   User root
   LocalCommand osascript ~/Documents/scripts/changeTerminalTheme.scpt "Solid Colors"
```
Replace `Solid Colors` here with any theme defined in your terminal 
preferences.

### We're Done!

In this demo, I open up a connection to a server I have defined to use
the `Ocean` theme. I then open a new tab which starts with my default
`Basic` theme but changes when I SSH into a server defined to use the
`Other` theme. I then exit the SSH connections, and we can see each tab
switching back to the default `Basic` theme.

<p align="center">
  <img width="630" src="./final-demo.gif">
</p>
