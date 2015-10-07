/*
(c) 2015 OmegaPhil (OmegaPhil@startmail.com)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/


"use strict";

// XPCOM objects
const {Cc, Ci} = require("chrome");
const session_store = Cc["@mozilla.org/browser/sessionstore;1"]
                   .getService(Ci.nsISessionStore);
const promptSvc = Cc["@mozilla.org/embedcomp/prompt-service;1"].
                getService(Ci.nsIPromptService);

// SDK objects
const tab_utils = require("sdk/tabs/utils");
const unload = require("sdk/system/unload");
const windows = require("sdk/windows").browserWindows;
const win_utils = require("sdk/window/utils");

// 3rd party objects
const menuitems = require("menuitems");


// Maintaining original updateTitlebar function
var update_title_bar_func = null;

/* Sort all windows in the initial browser session - the window open
 * event does not fire for these?? */
win_utils.windows().forEach(redef_updateTitlebar);

/* Hook into windows open event - this doesn't actually pass me the
 * relevant window?? */
windows.on('open', redef_updateTitlebar);

/* Insert into tools menu at the end - menuitems isn't able to add a
 * submenu, and it looks like it would be a major research project to do
 * this myself without just changing the addon to use a XUL overlay - so
 * leaving this as-is for now */
menuitems.Menuitem({
    id: 'window-renamer_tools',
    menuid: 'menu_ToolsPopup',
    label: "Rename Window",
    disabled: false,
    checked: false,
    onCommand: rename_window_prompt
});

// Hooking into disable/uninstall/shutdown events
unload.when(uninstall);


function redef_updateTitlebar(win)
{
    // Debug code
    //console.info('redef_updateTitlebar ran!');

    /* Process the passed in window, otherwise fetch the latest one
     * (the windows open event does not pass the window affected...) */
    if (win == undefined) {
        win = win_utils.getMostRecentBrowserWindow();
    }

    /* Replace titlebar update function, which is associated with the
     * tabbrowser widget from the window - need to create a closure to
     * hold on to the tabbrowser reference */
    var tabbrowser = tab_utils.getTabBrowser(win);
    update_title_bar_func = tabbrowser.updateTitlebar;
    tabbrowser.updateTitlebar = function () {

        /* Renaming window if user has specified a fixed name, otherwise
         * deferring to the usual code */
        var win_name = session_store.getWindowValue(win,
                                                'window-renamer.name');
        if (!win_name)
        {
            /* Needs to be call'd rather than ()'d as the default function
             * maintains and uses a stale this reference otherwise */
            update_title_bar_func.call(tabbrowser);
        }
        else
        {
            tabbrowser.ownerDocument.title = win_name;
        };
    };

    // Update title (in the case of a previous saved title)
    tabbrowser.updateTitlebar();
}

function rename_window_prompt()
{
    var win = win_utils.getMostRecentBrowserWindow();

    /* Prompting user for new window name - preparing object to receive
     * output value */
    var win_name = {};
    win_name.value = session_store.getWindowValue(win,
                                                'window-renamer.name');
    var result = promptSvc.prompt(null, 'Rename Window - Window Renamer',
                'Please specify name to use (leave blank for default):',
                                  win_name, null, {});

    // Only acting if prompt was OK'd
    if (!result) { return; }

    // Updating stored window name, killing off if requested
    if (win_name.value == '')
    {
        session_store.deleteWindowValue(win, 'window-renamer.name');
    }
    else
    {
        session_store.setWindowValue(win, 'window-renamer.name',
                                    win_name.value);
    }

    // Triggering GUI update
    var tabbrowser = tab_utils.getTabBrowser(win);
    tabbrowser.updateTitlebar();
}

function uninstall(reason)
{
    // Nothing to do if shutting down
    if (reason == 'shutdown') { return; };

    // Debug code
    //console.log("uninstall ran");

    win_utils.windows().forEach(function (win) {

        /* Restore original titlebar update function and call it to
         * update window title */
        var tabbrowser = tab_utils.getTabBrowser(win);
        tabbrowser.updateTitlebar = update_title_bar_func;
        tabbrowser.updateTitlebar.call(tabbrowser);

        /* Clearing up sessionstore values - note that this kills off
         * saved names even when the addon is disabled, but the current
         * SDK does not allow me to differentiate between disable and
         * a real uninstall */
        session_store.deleteWindowValue(win, 'window-renamer.name');
    });

    // The menu entry detects the need to uninstall on its own
}
