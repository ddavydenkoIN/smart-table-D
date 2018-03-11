angular.module('smart').component('dBox', {
	bindings: {
	    headerName: '<',
	    isOpen: '=',
	    headerId: '<'
	},
    template: `
	    <div class="box">
	    	<button class="d-box-header" ng-attr-id="{{ $ctrl.headerId }}" type="button" data-ng-click="$ctrl.isOpen = !$ctrl.isOpen">
				<span>
					<i class="fa" data-ng-class="{'fa-chevron-up': $ctrl.isOpen, 'fa-chevron-down': !$ctrl.isOpen}"></i> {{ $ctrl.headerName }}
				</span>
			</button>
			<div data-ng-if="$ctrl.isOpen" class="d-box-body">
				<ng-transclude></ng-transclude>
			</div>
		</div>
	`,
	transclude: true
});