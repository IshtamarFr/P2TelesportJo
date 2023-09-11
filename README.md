# OlympicGamesStarter

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.3.

Don't forget to install your node_modules before starting (`npm install`).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build --base-href ./` to build the project. The build artifacts will be stored in the `dist/` directory, and can be served into your server folder (Apache, Nginx, etc.)

## Example

To see an example running, please visit `https://ishta.ishtamar.fr/test/ocr/p2`.

## How it works

* Home Page

This gets data from olympic game API to list countries and their total medals and show them in a pie-chart.
When a country is clicked-on, it redirects to that country's page for more details

* Country page

This gets data from olympic game API to retrieve infos about that country: year, name of event, total medals for this event, number of athletes.
This data is shown as a line-chart.
Total athletes and medals are rendered as well.
It's possible to get back to home page.

* Miscellaneous

Webapp redirect to error page if:
  * user tries to enter manually an address
  * a country doesn't exist
  * a problem occured with data (no Internet, data corruption,...)