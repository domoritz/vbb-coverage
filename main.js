$(function() {
    //============
    // Base Layers

    var osm = L.tileLayer('http://{s}.tile2.opencyclemap.org/transport/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors,' +
            'tiles from <a href="http://www.opencyclemap.org/">OpenCycleMap</a>'
    });

    map = new L.Map('map', {
        center: new L.LatLng(52.51538, 13.40997),
        zoom: 8,
        layers: [osm]
    });

    L.control.scale().addTo(map);
    L.control.locate().addTo(map);

    //================
    // Set up overlays

    var initRadius = 800;
    $('input.range').attr('value', initRadius);

    var coverageLayer = new L.TileLayer.MaskCanvas({'opacity': 0.5, radius: initRadius, useAbsoluteRadius: true, 'attribution': 'Get the data at <a href="//daten.berlin.de/datensaetze/vbb-fahrplan2012">daten.berlin.de</a>. Code on <a href="//github.com/domoritz/vbb-coverage">Github</a>'});

    var loadOverlay = function(id) {
        var url = 'data/' + id + '.json';
        $.getJSON(url).success(function(data) {
            coverageLayer.setData(data);
            //L.rectangle(coverageLayer.bounds, {color: "#ff7800", weight: 1}).addTo(map);
            map.fitBounds(coverageLayer.bounds);
            map.addLayer(coverageLayer);
        }).error(function(err) {
            alert('An error occurred when loading the JSON', err);
        });
    };

    loadOverlay('VBB');

    $('input.range').change(function() {
        var value = $(this).val();
        coverageLayer.setRadius(value);
    });
});