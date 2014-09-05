/**
 * Created by ageorgin on 18/07/14.
 */
'use strict';

angular.module('myApp.job.detailController', [])
    .controller('JobDetailController', ['$scope', '$location', '$routeParams', 'JobService', function($scope, $location, $routeParams, JobService){
        $scope.loadJob = function(jobId) {
            JobService.loadJob(jobId)
                .success(function(response) {
                    $scope.job = response;
                })
                .error(function(){
                    $scope.msgAlert = 'Erreur lors du chargement du job ' + jobId;
                });
        }

        $scope.notifyOutput = function(jobId, filename) {
            JobService.notifyOutput(jobId, filename)
                .success(function(response) {
                    $scope.loadJob($routeParams.id);
                })
                .error(function() {
                    $scope.msgAlert = 'Erreur lors de la notification';
                });
        }

        $scope.notifyJob = function(jobId) {
            JobService.notifyJob(jobId);
        }

        $scope.loadJob($routeParams.id);
    }]);