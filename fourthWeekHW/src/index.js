import { series } from "./data.js";
import { fancyLogSeriesReport } from "./utils.js";

export function SeriesTracker(series) {
  this.numberOfWatched = 0;
  this.numberOfUnWatched = 0;
  this.series = [];
  this.lastSerie = undefined;
  this.currentSerie = undefined;
  this.nextSerie = undefined;

  this.add = function (serie) {
    this.series.push(serie);
    if (serie.isWatched) {
      // Update the count of watched series: "numberOfWatched"
      this.numberOfWatched++;
      // Check for "lastSerie" property, set if we don't.
      if (!this.lastSerie) {
        this.lastSerie = serie;
      }
      // Check for "lastSerie"'s finishedDate, if the serie's "finishedDate" prop is greater,
      if (new Date(serie.finishedDate) > new Date(this.lastSerie.finishedDate)) {
        // set "lastSerie" prop to "serie" object.//
        this.lastSerie = serie;
      }
    } else {// If a serie hasn't been watched:
      this.numberOfUnWatched++; //update the number of series marked unwatched:
      if (serie.isCurrent) {// Check if serie has "isCurrent" prop
        // Check if we have a "currentSerie" property. Set if we don't.
        this.currentSerie = serie;
      } else if (!this.nextSerie) {// Check if we have a "nextSerie" property - if we didn't
        // set the .currentSerie property, set the .nextSerie property.
        this.nextSerie = serie;
      }
    }
  };
  //check to see if we have series to process
  if (series.length > 0) {
    //Loop through all of the series in the "series" argument
    //Use the .add function to handle adding series, so we keep counts updated.
    series.forEach((serie) => {
      this.add(serie);
    });
  }

  this.finishSerie = function () {
    this.series.forEach((serie) => {
      // find and update currently watching serie in "this.series" array
      if (serie.isCurrent) {
        // update "lastSerie" with the finished one
        serie.isWatched = true;
        serie.finishedDate = new Date().toISOString().slice(0, 10);;
        serie.isCurrent = false;
        this.lastSerie = serie
        this.numberOfWatched++; // update "numberOfWatched" props
      }
      if (this.nextSerie.id === serie.id) {
        // set "currentSerie" with the next one
        serie.isCurrent = true;
        this.currentSerie = serie;
        this.numberOfUnWatched--;// update "numberOfUnWatched" props
      }
    });

    // set new nextSerie value with the next one which has not been watched.
    this.nextSerie = this.series.find((serie) => {
      return !serie.isWatched && !serie.isCurrent
    })
  };
  this.printSeriesReport = function () {
    fancyLogSeriesReport(this);
  };
}

// Case 1
// -------------------------------------------------
/*
const mySeriesTracker = new SeriesTracker(series);
mySeriesTracker.printSeriesReport();
*/
// Case 2
// -------------------------------------------------
/*
const mySeriesTracker = new SeriesTracker(series);
mySeriesTracker.finishSerie();
mySeriesTracker.printSeriesReport();
*/
// Case 3
// -------------------------------------------------
/*
const mySeriesTracker = new SeriesTracker(series);
const newSerie = {
  id: "9",
  name: "Lost",
  genre: "Adventure",
  directorId: "4"
};
mySeriesTracker.add(newSerie);
mySeriesTracker.printSeriesReport();
*/