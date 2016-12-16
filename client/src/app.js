/**
 * Created by sergiodiazpinilla on 29/11/16.
 */
import angular from 'angular'
import 'angular-ui-router';

angular.module('pensiones',["ui.router"])
    .config(($stateProvider,$urlRouterProvider) => {
        $urlRouterProvider.otherwise("/personas");

        $stateProvider
            .state("personas",{
                url:"/personas",
                templateUrl : "templates/personas-nav.html",
                resolve:{
                    personasService : function ($http) {
                        return $http.get("/personas");
                    }
                },
                controller : function (personasService) {
                    this.personas = personasService.data;
                },
                controllerAs:"personasCtrl"
            });
    });