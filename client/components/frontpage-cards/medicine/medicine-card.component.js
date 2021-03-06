angular.module('leukemiapp').directive('medicineCard', function () {
   return {
      restrict: 'E',
      templateUrl: 'client/components/frontpage-cards/medicine/medicine-card.html',
      controllerAs: 'medcard',
      controller: MedicineCardController
   }
});

function MedicineCardController($scope, $reactive, $location) {
   $reactive(this).attach($scope);
   var vm = this;

   vm.subscribe('medicineData');

   vm.helpers({
      latestMedicineRegistration: () => {
         //var selectedDate = Session.get('selectedDate');
         return Medicine.findOne(
            {
               //timestamp: {$lt: moment(selectedDate).toDate()}
            }, {
               sort: {
                  timestamp: -1,
                  createdAt: -1
               }
            });
      }
   });

   vm.newRegistration = () => {
      Session.set('registrationType', 'Medicine');
      $location.path("questionwizard");
   };

   vm.showGraphData = () => {
      Session.set('graphDataType', 'Medicine');
      $location.path("graphdata")
   };

   vm.sixMP = () => {
      var registration = vm.latestMedicineRegistration;
      if (registration !== undefined)
         return registration.SixMP;
      else return ' - ';
   };

   vm.mtx = () => {
      var registration = vm.latestMedicineRegistration;
      if (registration !== undefined)
         return registration.MTX;
      else return ' - ';
   };
}