"use strict";

var init = function() {
    if (
        !GSI ||
        !GSI.GLOBALS ||
        !GSI.GLOBALS.gsimaps ||
        !GSI.GLOBALS.gsimaps._mainMap ||
        !GSI.GLOBALS.gsimaps._mainMap._gsimaps ||
        !GSI.GLOBALS.gsimaps._mainMap._gsimaps._funcMenu ||
        !GSI.GLOBALS.gsimaps._mainMap._gsimaps._mainMap ||
        !GSI.GLOBALS.gsimaps._mainMap._gsimaps._mainMap._mapMenu
    ) {
        setTimeout(init, 100)
        return;
    }

    var m = GSI.GLOBALS.gsimaps._mainMap._gsimaps
    m._funcMenu.destroy()
    m._mainMap._mapMenu.destroy()

    var map = GSI.GLOBALS.gsimaps._mainMap.getMap()

    var layer = L.layerGroup() // アイコン用のレイヤー
    layer.addTo(map)
    layer.addIcon = function(lat, lng, name, iconurl, iconsize, callback) {
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
        marker.on("click", function() {
            callback(name);
        });
        this.addLayer(marker);
        return marker
    }

    gsimap_init(map, layer)
}
init();
