/**
 * Created by ageorgin on 11/07/14.
 */
'use strict';

angular.module('myApp.job.listController', [])
    .controller('JobListController', ['$scope', '$location', 'JobService', function($scope, $location, JobService){
        JobService.loadAllJob()
            .success(function(response) {
               $scope.listJob = response;
            })
            .error(function(){
                $scope.msgAlert = 'Erreur lors du chargement de la liste';
            });

        $scope.getFilename = JobService.getFilename;
    }]);