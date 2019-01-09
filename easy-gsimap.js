"use strict";

var makeIcon = function(lat, lng, name, iconurl, iconsize) {
	var icon = L.icon({
		iconUrl: iconurl,
		iconSize: [ iconsize, iconsize ],
		iconAnchor: [ iconsize / 2, iconsize / 5 ]
	})
	var marker = L.marker([ lat, lng ],{
		title : name,
		icon : icon,
	})
	marker.bindPopup(
        "<h2>" + name + "</h2>",
        {
			maxWidth: 500
		}
    );
    return marker
};
var init = function() {
    if (!GSI || !GSI.GLOBALS || !GSI.GLOBALS.gsimaps) {
        setTimeout(init, 100)
        return;
    }

    var m = GSI.GLOBALS.gsimaps._mainMap._gsimaps
    m._funcMenu.destroy()
    m._mainMap._mapMenu.destroy()

    var map = GSI.GLOBALS.gsimaps._mainMap.getMap()
    gsimap_init(map)
}
init();
