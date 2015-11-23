The Pale Moon window renamer addon allows you to better track your permanent windows - do you have more than 2 windows always open, containing tabs dedicated to different jobs? If yes, you might be interested in this addon's ability to set an individual window's title (not tab titles) to a particular fixed string, that survives a restart.

E.g. I use the following fixed window titles:

Main - Pale Moon
Downloading - Pale Moon
Programming - Pale Moon
Japanese - Pale Moon
Wiki - Pale Moon

Rather than the previous mess of multiple windows titled by whatever tab they happen to be on, I can now find the right window at a glance, and do stuff like using wmctrl to raise the right window bound to a key combination etc.

Last updated on 23.11.15 for v1.


Installation
============

1. Fetch the latest xpi from the [release branch](https://github.com/OmegaPhil/pale-moon-window-renamer/tree/release).
2. Tools -> Addons, see the button to the left of the search bar -> Install add-on from file -> browse to the xpi and install.


Dependencies
============

The addon should be self-contained - it is based on the Addon SDK and has been tested/used with Pale Moon v25.7.2+, although as it appears to be simple it should work with all versions of the browser - if not, please let me know (see Bugs And Feature Requests below) and I'll update this.


Uninstallation
==============

Uninstall as you would a normal addon.


General Use
===========

Window Renamer adds the 'Rename Window' item to the bottom of your Tools menu:

![Tools menu item](https://github.com/OmegaPhil/pale-moon-window-renamer/blob/master/doc/tools-menu-item.png?raw=true)

Using this pops up the following dialog:

![Rename window dialog](https://github.com/OmegaPhil/pale-moon-window-renamer/blob/master/doc/rename-window-dialog.png?raw=true)

Enter a title or leave blank to get the default title.

The script works by overriding Pale Moon's updateTitlebar function with its own - the original is restored when requested.

Note that disabling this addon is equivalent to uninstalling it - due to a limitation of the AddonSDK, the script can't tell the difference between disabling and uninstalling, therefore if you disable it you will lose your saved window titles.


Bugs And Feature Requests
=========================

Please create an issue on the [Github issue tracker](https://github.com/OmegaPhil/pale-moon-window-renamer/issues).


Contact Details
===============

OmegaPhil@startmail.com
