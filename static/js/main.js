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

    var loadOverlay = function(id) {
        var url = 'data/' + id + '.json';
        $.getJSON(url).success(function(data) {
            coverageLayer.setData(data);
            //L.rectangle(coverageLayer.bounds, {color: "#ff7800", weight: 1}).addTo(map);
            map.fitBounds(coverageLayer.bounds);
            map.addLayer(coverageLayer);
        }).error(function(err) {
            alert('An error occurred', err);
        });
    };

    loadOverlay('VBB');
});