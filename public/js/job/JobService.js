/**
 * Created by ageorgin on 11/07/14.
 */
angular.module('myApp.job.service', [])
    .factory('JobService', ['$http', function($http){
        return {
            loadAllJob: function(){
                return $http.get('/api/v2/jobs');
            },
            loadJob: function(id){
                return $http.get('/api/v2/jobs/' + id);
            },
            getFilename: function(path) {
                var splitPath = path.split('/');
                return splitPath[splitPath.length - 1];

            },
            notifyOutput: function(jobId, filename, jobStatus, outputStatus) {
                return $http.post('/api/v2/notify', {'jobId': jobId, 'filename': filename, 'jobStatus': jobStatus, 'outputStatus': outputStatus});
            },
            notifyJob: function(jobId) {
                return $http.post('/api/v2/notify', {'jobId': jobId, 'filename': null});
            },
            deleteJob: function(jobId) {
                return $http.delete('/api/v2/jobs/' + jobId);
            }
        };
    }]);