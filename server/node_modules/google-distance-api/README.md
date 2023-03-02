# Node.js wrapper for Google Distance Matrix API

Google Distance Matrix API is a service that provides travel data for a given list of origins and destinations. The data returned is duration and distance calculated by Google Map API for the recommended route between the start and end points.


Please refer to [Google Distance Matrix API](https://developers.google.com/maps/documentation/distancematrix/) documentation.


## Installation

`npm install google-distance-api`

```
## Parameters

### API Key

Please read the [API Key](https://developers.google.com/maps/documentation/distancematrix/#api_key).

If using a **key**:

* Pass the key in the options object

```javascript
const options = {
    key: '<Key>'
}
```

* If using **client** and **signature**:

```javascript
const options = {
    client: '',
    signature: ''
}
```

### Optional paramaters to be specified

optional mode. Valid values: `driving | walking | bicycling`, and defaults to `driving`

```javascript
const options = {
    mode: 'driving'
}
```

Language (optional): default `en`

```javascript
const options = {
    language: 'en'
}
```

optional avoid. Valid values: `tolls | highways | ferries`, and defaults to `null`

```javascript
const options = {
    avoid: 'tolls'
}
```

optional units. Valid values: `metric | imperial`, and defaults to `metric`

```javascript
const options = {
    units: 'metric'
}
```

optional departure_time. Desired time in seconds since midnight, January 1, 1970 UTC. Defaults to 'now'

```javascript
const options = {
    departure_time: 1404696787
}
```

optinal arrival_time. Desired time of arrival as seconds since midnight, January 1, 1970 UTC

```javascript
const options = {
    arrival_time: 1404696787
}
```

### Origins
An array of places (addresses, lat & long, or google place_id) used as the starting point to calculate the distance and time.
```javascript
...
const options = {
    origins ['51.5033640,-0.1276250', 'Manchester, UK']
}
...
```
### Destinations
An array of places (addresses, lat & long, or google place_id) used as the end point to calculate the distance and time.
```javascript
...
const options = {
    destinations: ['Manchester, UK', 'Liverpool, UK', '51.5033640,-0.1276250']
}
...
```
## Example

```javascript
const GoogleDistanceApi = require('google-distance-api');
const options = {
  key: '<googleApiKey>',
  origins: ['51.5033640,-0.1276250'],
  destinations: ['Manchester, UK', 'Liverpool, UK']
}
const data  = GoogleDistanceApi.distance(options, (err, data) => {
    if(err) {
        return console.log(err);
    }

    console.log(data);
});
