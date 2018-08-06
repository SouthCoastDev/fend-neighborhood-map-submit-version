# FEND Neighborhood Map Project

## How to run

Download the repo.

Prerequisites:
You must have Node js installed!

1. Install project dependencies : $ npm install

2. Create a deployable production build: $ npm run build

3. Serve with a static server : $ npm install -g serve

4. After static server installed add the build to it: $ serve -s build

The app should then be found running on locathost port 5000.

This version is the deployed version and so the service worker will work correctly.

## Extra Packages Used

react-google-maps

## What does it do

Find a small list of venues at a chosen location and use the filter to narrow down what you see.

Click on an item in the list or on the map to see info about it from Foursquare!

## External Sources Of Data

Google Maps
react-google-maps
Foursquare API
