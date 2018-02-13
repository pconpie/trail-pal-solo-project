app.directive('popupDirective', function (params) {
    
    function PopupController() {
        
    }

    return {
        restrict: 'E',
        scope: { obj: '=' },
        template: '<div>Hello, {{obj.prop}}!</div>',
        controller: PopupController,
        controllerAs: 'vm',
    };

});

// template:
// `<div ng-controller="MapController as vm">
// <a href="/#!/details/${element.geometry.coordinates[0]}/${element.geometry.coordinates[1]}/${element.properties.id}">${element.properties.name}</a>
// <br/>
// <p>Description: ${markerDescription(element.properties.description)}</p>
// <p>Click on name to get more details!</p>
// ${compiledButton}
// </div>
// `