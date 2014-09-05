/**
 * Created by ageorgin on 11/07/14.
 */
'use strict';

angular.module('myApp', [
        'ngRoute',
        'myApp.job.listController',
        'myApp.job.detailController',
        'myApp.job.service'
    ])
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
                when('/', {
                    templateUrl: 'partials/job-list.html',
                    controller: 'JobListController'
                }).
                when('/job/:id', {
                    templateUrl: 'partials/job-detail.html',
                    controller: 'JobDetailController'
                }).
                otherwise({
                    redirectTo: '/'
                });
        }]);