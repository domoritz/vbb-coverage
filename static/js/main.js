$(function() {
    //============
    // Base Layers

    var cloudmadeAttribution =  'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>';

    var layer_CloudMate = new L.tileLayer(
        'http://{s}.tile.cloudmade.com/63250e2ef1c24cc18761c70e76253f75/997/256/{z}/{x}/{y}.png',{
            attribution: cloudmadeAttribution,
            maxZoom: 18
        }
    );

    map = new L.Map('map', {
        center: new L.LatLng(52.51538, 13.40997),
        zoom: 8,
        layers: [layer_CloudMate]
    });

    L.control.scale().addTo(map);
    L.control.locate().addTo(map);

    //================
    // Set up overlays

    var coverageLayer = new L.TileLayer.MaskCanvas({'opacity': 0.5, radius: 750, useAbsoluteRadius: true, 'attribution': 'Get the data at <a href="//daten.berlin.de/datensaetze/vbb-fahrplan2012">daten.berlin.de</a>. Code on <a href="//github.com/domoritz/vbb-coverage">Github</a>'});

    var heatmapLayer = L.TileLayer.heatMap({
        // radius could be absolute or relative
        // absolute: radius in meters, relative: radius in pixels
        radius: { value: 800, absolute: true },
        //radius: { value: 20, absolute: false },
        opacity: 0.8,
        gradient: {
            0.45: "rgb(0,0,255)",
            0.55: "rgb(0,255,255)",
            0.65: "rgb(0,255,0)",
            0.95: "yellow",
            1.0: "rgb(255,0,0)"
        }
    });

    var loadOverlay = function(id) {
        var url = 'data/' + id + '.json';
        $.getJSON(url).success(function(data) {
            //coverageLayer.setData(data);
            //L.rectangle(coverageLayer.bounds, {color: "#ff7800", weight: 1}).addTo(map);
            //map.fitBounds(coverageLayer.bounds);
            //map.addLayer(coverageLayer);
            this.bounds = new L.LatLngBounds(data);

            converted = [];
            for (var i = data.length - 1; i >= 0; i--) {
                converted.push({
                    value: 1,
                    lat: data[i][0],
                    lon: data[i][1]
                });
            }
            heatmapLayer.setData(converted);
            map.addLayer(heatmapLayer);
        }).error(function(err) {
            alert('An error occurred', err);
        });
    };

    loadOverlay('VBB');
});