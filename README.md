# Horus Heresy 3rd Edition List Builder

*https://hirmetrium.github.io*

Currently a work in progress with several challenges to overcome. Forked from the incredible MESBG-v2024 list builder, and with no small help from Marcel to get this operational.

A temporarily incomplete build is hosted for feedback and design on the githubpages link.

<!-- TOC -->
* [To Do](#to-do)
* [Feature Highlights](#feature-highlights)
* [Usage](#usage)
* [Contact information](#contact-information)
* [Contributing](#contributing)
* [Helpful information](#helpful-information)
  * [PWA Installation](#pwa-installation)
    * [Desktop (PWA)](#desktop-pwa)
    * [Android (PWA)](#android-pwa)
    * [iOS (PWA)](#ios-pwa)
<!-- TOC -->

## To Do:
- Finish clean-up of original code-base to make specific to HH:
  - Leader functionality
  - Adapting of heroes/warbands into detachments
  - Fix unit/model/slot calculator function for metadata
  - Fix Warnings
  - Fix special rules displays
  - Fix upversioning/changelog
  - Fix Options lists to be multi-selection
  - Fix Options display to not take up so much space (two columns?)
- Builder:
  - Redesign Unit Cards to use minimum and maximum squad quantities when adding units by default
  - Prevent adding multiple units per slot
  - Fix metadata calculations on units / slots
  - Add profile data and profile cards (significant work, may need parsing with AI, or collaboration with Data guys)
  - Add Validation for detachments
- Detachments:
  - Design, create and build new data functionality for detachment data object to manage slots across detachments
  - Potentially can update army-list-restrictions on heroes into detachment restrictions (will be necessary for each individual faction/army)
  - Associated UI / icons (have placeholders)
	- Prevent additional units being added
	- Add pipeline scripts to convert detachment data into .json
	- Restriction data for army lists currently works to a degree
- Identify potential improvements to data structure to share generic units across legions to save repeating data entries/multiple entry updates (may not be possible with detachment restriction/data or current model)
- Add / Design new prime benefit functionality and associated UI
- Add data for:
  - Legions
  - Mech
  - Solar Aux
  - Questoris
  - Legacies

## Feature Highlights:
- Installable Desktop and Mobile application though PWA. (Available for [Desktop](#desktop-pwa), [Android](#android-pwa) and [iOS](#ios-pwa))
- Currently only Legiones Astartes Data for building/testing purposes, prior to release of full rules.
- Retained Feature: Easy-to-share screenshot of your roster list, or alternatively use text-print view.
- Currently Broken Feature: Gamemode features
- Retained Feature: PDF print-out for your list, providing all profile stats, special rules, etc.
- Currently Broken Feature: Match History
 - Keeping track of your match results when ending a game though the Digital trackers
 - Record matches manually when not using the digital trackers
 - Get a full breakdown of your results per opponent, army and scenario.
- Retained Feature: Collection/Inventory warnings (opt-in<sup><small>\[1]</small></sup>)
 - Manage which models and loadouts you have in your collection
 - Get warnings when building your army lists for models you don't own or have enough of
- Retained Feature: Browser storage used to persist your data allowing you to continue building and tracking at a later point.
 - Import/Export functionality for your army lists and match history to keep your data safe.

<small>_[1]_; These features are not enabled by default. You can enable them
in [the site/app settings](https://hirmetrium.github.io/#/settings).</small>

## Usage
If you want to use the list builder you can head over to \*https://v2024.mesbg-list-builder.com\* and start by creating
your first army list.

## Contact information
I am best reached on Reddit or Discord for now; search for 'Hirmetrium'.

## Contributing
Pull requests are welcome. I am not a coder.

## Helpful information

### PWA Installation

#### Desktop (PWA)

Desktop PWA installation is currently supported by Google Chrome and Microsoft Edge on Linux, Windows, macOS, and
Chromebooks. These browsers will show an install-badge (icon) in the URL bar, stating that the current site is
installable. This badge is located next to the bookmark badge.

#### Android (PWA)

On Android, PWA install prompts differ by device and browser. Users may see:

- Variations in the wording of the menu item for install such as Install or Add to Home Screen.
- Detailed installation dialogs.

If the website does not propt you to install the application you can forcefully install it using the chrome options.
Clicking the 3-dots at the top right and then selecting the "Add to home screen" option.

#### iOS (PWA)

A browser prompt to install your PWA doesn't exist On iOS and iPadOS. On these platforms PWAs are also known as home
screen web apps. These apps have to be added manually to the home screen via a browser share menu.

**The steps to add apps to the home screen are:**

1. Open the Share menu, available at the bottom or top of the browser.
2. Click **Add to Home Screen**.
3. Confirm the name of the app; the name is user-editable.
4. Click **Add**. On iOS and iPadOS, bookmarks to websites and PWAs look the same on the home screen.
