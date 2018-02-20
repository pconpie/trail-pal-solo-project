app.controller('MapController', ['$mdDialog', '$http', '$compile', 'MapService', 'UserService', 'StateService', function ($mdDialog, $http, $compile, MapService, UserService, StateService) {
    const self = this;
    console.log('in map service');
    self.userService = UserService;
    document.getElementById('header').style.display = "block";
    self.loading = false;
    
    let statesData = {};
    StateService.getStateBounds().then((response)=>{
        statesData = response;
        console.log('data ', statesData);
        geojson = L.geoJson(statesData, {
            style: style,
            onEachFeature: onEachFeature
        }).addTo(map);
    })
    
    let defaultCoords = [37.8, -96];
    let map = L.map('mapid').setView(defaultCoords, 5);
    self.mapReset = function () {
        map.setView(defaultCoords, 5);
    }
    

    L.tileLayer(`https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicGF0cmlja2Nvbm5lbGx5OTUiLCJhIjoiY2pkNmZvaHFnNWZtYjJ4bnNraXFoaHgzbyJ9.W_MKgqXNF6CQf1ROquv8ZQ`, {
        id: 'mapbox.light',
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    }).addTo(map);
    // setTimeout(function () { map.invalidateSize() }, 1200);

    var geojson;

    function getColor(d) {
        return d > 400 ? '#00441b' :
            d > 300 ? '#006d2c' :
            d > 200 ? '#238b45' :
            d > 100 ? '#41ab5d' :
            d > 50 ? '#74c476' :
            '#a1d99b';
    }

    function highlightFeature(e) {
        var layer = e.target;

        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
    }

    function resetHighlight(e) {
        geojson.resetStyle(e.target);
    }

    function zoomToFeature(e) {
        console.log('State: ', e.target.feature.properties.name);
        findStateTrails(e.target.feature.properties.name);
        map.fitBounds(e.target.getBounds());
    }

    function style(feature) {
        return {
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7,
            fillColor: getColor(feature.properties.trailTotal)
        };
    }

    function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature
        });
    }
    

    let geoJSONs = [];
    var myLayer = L.geoJSON().addTo(map);

    function findStateTrails(state) {
        self.loading = true;
        $http.get(`/geoInfo/${state}`)
            .then((response) => {
                console.log('get geoInfo response ', response);
                for (let i = 0; i < response.data.length; i++) {
                    let element = response.data[i];
                    // console.log('data ', element);
                    geoJSONs.push(element);
                }
                mapGeoJSONs(geoJSONs);
                // console.log('geoJsons ', geoJSONs);
            })
            .catch((err) => {
                console.log('get geoInfo err ', err);
            })
            .finally(function () {
                // called no matter success or failure
                self.loading = false;
            });
    }

    let favoriteButton = `<button ng-click="vm.favoriteTrail()">Favorite Me!</button>`;
    let compiledButton = $compile(favoriteButton)(self);

    function markerDescription(description) {
        if (description == null) {
            return 'No description available at this time.'
        } else {
            return `${description.substring(0, 200)}...`;
        }
    }

    // function popup(element) {
    //     return L.popup.angular({
    //         template: `<div ng-controller="MapController as vm">
    //         <a href="/#!/details/${element.geometry.coordinates[0]}/${element.geometry.coordinates[1]}/${element.properties.id}">${element.properties.name}</a>
    //         <br/>
    //         <p>Description: ${markerDescription(element.properties.description)}</p>
    //         <p>Click on name to get more details!</p>
    //         <button ng-click="vm.favoriteTrail()">Favorite Me!</button>
    //         </div>
    //         `,
    //         controllerAs: 'vm',
    //         controller: [function () {
    //             const self = this;
    //             self.favoriteTrail = function () {
    //                 console.log('FAVORITE!');
    //             }
    //         }]
    //     });
    // }


    function mapGeoJSONs(array) {
        var markers = L.markerClusterGroup({
            showCoverageOnHover: false,
        });
        for (let i = 0; i < array.length; i++) {
            const element = array[i];
            let popup = L.popup.angular({
                template: `<div>
                        <a href="/#!/details/${element.geometry.coordinates[0]}/${element.geometry.coordinates[1]}/${element.properties.id}">${element.properties.name}</a>
                        <br/>
                        <p>Description: ${markerDescription(element.properties.description)}</p>
                        <p>Click on name to get more details!</p>
                        </div>
                        `,
                controllerAs: 'vm',
                controller: PopupInfoController
            });

            let marker = L.marker(element.geometry.coordinates).bindPopup(popup).openPopup();
            markers.addLayer(marker);
        }
        map.addLayer(markers);
    }
    // <button ng-click="vm.favoriteTrail()">Favorite Me!</button>

    function PopupInfoController(MapService) {
        const self = this;
        self.favoriteTrail = function (element) {
            MapService.favoriteTrail(element);
        }
    }
    // map.on('click', function(ev) {
    //     alert(ev.containerPoint); // ev is an event object (MouseEvent in this case)
    // });

}]);