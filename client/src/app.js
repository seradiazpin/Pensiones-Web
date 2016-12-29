/**
 * Created by sergiodiazpinilla on 29/11/16.
 */
import angular from 'angular'
import 'angular-ui-router';
import 'angular-ui-grid';

angular.module('pensiones',["ui.router","ui.grid"])
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

            })
            .state("id",{
                url:"/:idPersona",
                templateUrl:"templates/infomacion-persona.html",
                resolve:{
                    personaService:function ($http, $stateParams) {
                        console.log($stateParams.idPersona);
                        return $http.get($stateParams.idPersona);
                    }
                },
                controller: function(personaService) {
                    this.persona = personaService.data;
                },
                controllerAs : "personCtrl"
            });
    });

