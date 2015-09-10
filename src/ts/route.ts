export module angularDemo {
    export class Routes {
        static $inject = ["$routeProvider"];
        public static configureRoutes($routeProvider: ng.route.IRouteProvider) {

            $routeProvider.when("/angularDemo",
                {
                    controller: "angularDemo.controllers.angularDemoController",
                    templateUrl: "templates/demoView.html",
                    controllerAs: "angularDemo"
                });

            $routeProvider.otherwise({ redirectTo: "/angularDemo" });
        }
    }
}