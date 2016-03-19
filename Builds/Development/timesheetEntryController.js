"use strict";

(function() {
  var app = angular.module("Timesheet");
  app.controller("timesheetEntryController", ["$scope", "$location", "links", "moment", function($scope, $location, links, moment) {

    $scope.links = links;

    $scope.AcOpenStatusFor = {
      details: true,
      summary: true,
      personalHours: true
    };

    $scope.VM = {
      projects: []
    };

    $scope.totalDetailHours = function() {
      var h = $scope.projectHours;
      var hours = 0;
      for(var i=0;i<h.length; i++)
        if(h[i].itemType === 'primary' && !isNaN(parseFloat(h[i].hours)))
            hours += parseFloat(h[i].hours);

      return hours;
    };

    $scope.totalHours = function() {
      return $scope.totalDetailHours() + $scope.totalPersonalHours();
    };

    $scope.projectActivities = [{
      code: 30011,
      name: 'OPEX General Activity'
    }, {
      code: 30006,
      name: 'Support-Application Configurat'
    }, {
      code: 30008,
      name: 'Support-Estimation'
    }, {
      code: 30007,
      name: 'Support-Implementation'
    }];

    $scope.projects = [{
      code: '9000000',
      name: 'Non-Project Related'
    }, {
      code: '0002376',
      name: 'Support - MS Portal'
    }, {
      code: '0002421',
      name: 'Enhancement - .NET/Portal'
    }, {
      code: '0002030',
      name: 'Digital Data Capture&Analytics'
    }];

    $scope.hoursList = [];
    var i=0;
    for (; i<=8; i++) {
      if (i === 0)
        $scope.hoursList.push({
          id: i,
          chk: true
        });
      else
        $scope.hoursList.push({
          id: i,
          chk: false
        });

      $scope.hoursList.push({
        id: i + 0.5,
        chk: false
      });
    }
    $scope.hoursListSelected = 0;

    $scope.projectHours = [];
    var startDate = moment().day('Sunday');
    for (i = 1; i <= 7; i++) {
      $scope.projectHours.push({
        itemType: 'primary',
        dayDisplay: startDate.add(1, 'd').format('ddd DD'),
        hours: (i<6)?(7 + (i % 3) * .5):0,
        project: {
          code: '9000000',
          name: 'Support - MS Portal'
        },
        activity: {
          code: '30011',
          name: 'OPEX General Activity'
        },
        billable: 'Billable'
      });
    }

    $scope.addProjectHours = function(index, proj, activity, hours, billable) {
      var obj = {
        itemType: 'secondary',
        dayDisplay: $scope.projectHours[index - 1].dayDisplay,
        hours: 7.5,
        project: {
          code: '80000',
          name: 'MS Portal'
        },
        activity: {
          code: '30011',
          name: 'COPEX Activity'
        },
        billable: 'Internal'
      }
      $scope.delProjectHours(index);
      $scope.projectHours.splice(index, 0, obj); // Add additional project hours entry
    }
    
    $scope.editProjectHours = function(index) {
      var obj = {
        itemType: 'editor',
        dayDisplay: 'Mon 09',
        hours: 7.5,
        project: {
          code: '80000',
          name: 'MS Portal'
        },
        activity: {
          code: '30011',
          name: 'COPEX Activity'
        },
        billable: 'Internal'
      }
      $scope.projectHours.splice(index, 0, obj);
    }
    
    $scope.delProjectHours = function(index) {
      $scope.projectHours.splice(index, 1);
    }
    
    /*************  Personal Hours ********************/
    $scope.personalHours = {
      selectedDescription:"Administration",
      selectedDay:moment().day('Monday').format('ddd DD'),
      selectedHours:{id: '7.5'},
      items:[]
    };
    
    $scope.addPersonalHours = function() {
      var obj = {
        itemType: 'personal',
        description: $scope.personalHours.selectedDescription,
        dayDisplay: $scope.personalHours.selectedDay,
        hours: $scope.personalHours.selectedHours.id
      }
      $scope.personalHours.items.push(obj); // Add personal hours entry
    }
    
    $scope.delPersonalHours = function(index) {
      $scope.personalHours.items.splice(index, 1);
    }
    
    $scope.totalPersonalHours = function() {
      var h = $scope.personalHours.items;
      var hours = 0;
      for(var i=0;i<h.length; i++)
        if(h[i].itemType === 'personal' && !isNaN(parseFloat(h[i].hours)))
            hours += parseFloat(h[i].hours);

      return hours;
    };
    
    //$scope.editProjectHours(2);
  }]);
})();