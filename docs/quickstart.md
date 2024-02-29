# Quickstart

Installing sinag is easiest with [WP-CLI](https://make.wordpress.org/cli/handbook/ ':target=_blank') using any [local server](https://wordpress.org/support/article/installing-wordpress-on-your-own-computer/ ':target=_blank') that meets the [requirements](/features/requirements).

1. Run <span style="letter-spacing:-0.03em">`wp theme install --activate https://github.com/tcmulder/sinag/archive/refs/heads/master.zip`</span>.
2. Run `cd wp-content/themes/sinag` to enter sinag's directory.
3. Rename the `.env.example` file to `.env` and update the URL value appropriately.
4. Run `npm install` to install the build tool.
5. Run `npm run start` to fire up the dev server (and `npm run build` for a production build).
6. Optionally, [initialize the theme](/features/wp-cli#wp-sinag-setup) by running `wp sinag setup`.

You're all set! Next up, familiarize yourself with sinag's [features](/features/).

?> If you'd prefer to install manually, just [download sinag](https://github.com/tcmulder/sinag/archive/refs/heads/master.zip ':download=download') and [install the theme](https://wordpress.org/support/article/using-themes/#adding-new-themes-using-the-administration-screens ':target=_blank') like normal.
