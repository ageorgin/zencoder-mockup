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

        $scope.notifyOutput = function(jobId, filename, jobStatus, outputStatus) {
            clearMessages();
            JobService.notifyOutput(jobId, filename, jobStatus, outputStatus)
                .success(function(response) {
                    $scope.loadJob($routeParams.id);
                    $scope.msgSuccess = 'Fichier notifié avec succès';
                })
                .error(function() {
                    $scope.msgAlert = 'Erreur lors de la notification';
                });
        }

        $scope.notifyJob = function(jobId) {
            JobService.notifyJob(jobId);
        }

        function clearMessages() {
            $scope.msgSuccess = '';
            $scope.msgAlert = '';
        }

        $scope.loadJob($routeParams.id);
    }]);