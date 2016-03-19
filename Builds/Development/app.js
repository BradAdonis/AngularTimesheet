(function() {
  var app = angular.module("Timesheet", ["ngRoute", "ui.bootstrap", "angularMoment"]);

  app.config(function($routeProvider) {
      $routeProvider
        .when("/Home", {
          templateUrl: "Home.html",
          controller: "homeController"
        })
        .when("/Login", {
          templateUrl: "Login.html",
          controller: "loginController"
        })
        .when("/TimesheetEntry", {
          templateUrl: "TimesheetEntry.html",
          controller: "timesheetEntryController"
        })
        .when("/ViewTimesheets", {
          templateUrl: "ViewTimesheets.html",
          controller: "viewTimesheetsController"
        })
        .when("/Template", {
          templateUrl: "tplDayEntry.html",
          controller: "timesheetEntryController"
        })
        .when("/ConfirmSubmission", {
          templateUrl: "ConfirmSubmission.html",
          controller: "ConfirmSubmissionController"
        })
        .otherwise({
          //redirectTo: "/Login" // This is startup page.
            //redirectTo: "/ViewTimesheets"
            //redirectTo: "/Home"
            redirectTo: "/TimesheetEntry"
            //redirectTo: "/Template"
            //redirectTo: "/ConfirmSubmission"
        });
    })
    .service("links", function($location) {
      this.Home = function() {
        $location.path("/Home");
      };
      this.TimesheetEntry = function() {
        $location.path("/TimesheetEntry");
      };
      this.viewTimesheets = function() {
        $location.path("/ViewTimesheets");
      };
      this.Login = function() {
        $location.path("/Login");
      };
      this.ConfirmSubmission = function() {
        $location.path("/ConfirmSubmission");
      };
    })
    .controller("loginController", ["$scope", "$location", "links", function($scope, $location, links) {
      $scope.links = links;
    }])
    .controller("homeController", ["$scope", "$location", "$uibModal","links", function($scope, $location, $uibModal, links) {
      
      $scope.links = links;
      $scope.open = function() {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'myModalContent.html',
          controller: 'ModalInstanceCtrl',
        });
      };
      
    }])
    .controller("viewTimesheetsController", ["$scope", "$location", "links", function($scope, $location, links) {
      $scope.links = links;
    }])
    .controller("ConfirmSubmissionController", ["$scope", "$location", "links", function($scope, $location, links) {
      $scope.links = links;
    }])
    .controller('ModalInstanceCtrl', function($scope, $uibModalInstance, links) {
      $scope.ok = function() {
        $uibModalInstance.close();
        links.TimesheetEntry();
      };
      $scope.cancel = function() {
        $uibModalInstance.close();
      };
    })
}());