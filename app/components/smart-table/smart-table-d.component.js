/*smart-table-d was built on angular-smart-table.
Usage:
	Create object with parameters:
		vm.tableConfig = [{      					<== config array
			name: 'Role Name',						<== Table's column header name. (Also name for sort input fields placeholder).
			field: 'roleName',						<== Field's name from the data object
			defaultSearchForMobile: true,			<== When opened on mobile, IT would be the default field to sort table.
			showSearch: true,						<== In Desktop view, if 'true' then sort input is enabled for this column.
			width: '30%'							<== Width of the column in %. IF not specified, width for every column would be equal. Total width should be:
		}, {														100% minus width of Actions column(in %, specified in .actionsConfig);
			name: 'User count',										90% in general if not specified Actions column width.
			field: 'userCount',
			showSearch: false,						<== would not have ability to sort by this column.
			width: '40%'
		}, {
			name: 'Updated',
			field: 'updatedDateft',
			showSearch: true,
			width: '10%'							<== Total sum should NOT be more than 90% if 'Actions' column is present.
		}												Without 'Actions' column should be 100% or less.
	];
	vm.rolesTableConfig = {							<== config object to pass to component. "<smart-table-d table-config="vm.rolesTableConfig"></...>"
		data: vm.rolesDetail,						<== Data to display.
		safeData: vm.rolesDetailsafe,				<== Copy of "data" object. Necessary for sorting. (required by angular-smart-table)
		config: vm.tableConfig,						<== Field holds configuration set above.
		tableBodyHeight: 450,						<== You can specified height of the table in px. The value represents height of body section of table, without header.
		showActions: true,							<== If set to "true" will show "Actions" column.
		hideSearchInputsDesk: true,					<== If set to "true", will hide search inputs on desktop view.
		hideSearchInputsMobile: true,				<== If set to "true", will hide search inputs on mobile view.
		actionsConfig: {							<== Config for 'Actions' column. Specify if 'showActions' is set to true.
			title: 'Actions',						<== Title of the 'Actions' column. (could set whatever you want)
			edit: {									<== Config object for 'Edit' button in 'Actions' column. Forwards you to edit section.
				stateName: 'editrole',				<== State name in router configuration.
				routerUrlParam: 'roleId',			<== Parameter in router config's state. Usually ID.
				fieldName: 'roleId'					<== Field name, from the data object, passed to component. (vm.rolesTableConfig.data[n].roleId);
			},
			view: {									
				stateName: 'viewrole',				<== Config object for 'View' button in 'Actions' column. Forwards you to view section.
				routerUrlParam: 'roleId',			<== Parameter in router config's state. Usually ID.
				fieldName: 'roleId'					<== Field name, from the data object, passed to component. (vm.rolesTableConfig.data[n].roleId);
			},
			customWidthApplied: '10%'				<== If present, could set width of 'Actions' column.
		}
	};
In HTML:
	<smart-table-d table-config="vm.tableConfig"></smart-table-d>
*/
angular.module('smart-table-d').component('smartTableD', {
	templateUrl: 'app/components/smart-table/smart-table-d.template.html',
	controllerAs: 'vm',
	bindings: {
		table: '<tableConfig'
	},
	controller: ['$window', '$state', function($window, $state) {
		var vm = this;
		var SCROLL_WIDTH = 17;
		var current, lastColumnWidth, columnWidthForBody;
		var customWidthsArray = [];
		
		vm.randomTableId = Math.floor((Math.random() * 100) + 1);
		
		function calculateWindowParams() {
			if(!vm.window) {
				vm.window = {
					height: $window.innerHeight,
					width: $window.innerWidth
				};
			}

		}

		function replaceEmptyCellsWithDashes(table) {
			angular.forEach(table.data, function(item) {
				angular.forEach(table.config, function(conf) {
					if (!item[conf.field] && item[conf.field] !== 0) {
						item[conf.field] = '-';
					}
				});
			});
		}

		function getColumnWidthForDesktopBody(colNum) {
			if (!vm.tableWidthInPx) {
				calculateTableWidth();
			}
			return vm.tableWidthInPx / colNum;
		}

		function calculateTableWidth() {
			vm.tableWidthInPx = document.getElementById('smart_table_' + vm.randomTableId).clientWidth;
		}

		function calculateWidthInPxFromCustomPercent(width) {
			if (!vm.tableWidthInPx) {
				calculateTableWidth();
			}
			return vm.tableWidthInPx * parseInt(width) / 100;
		}

		function calculateColumnWidths(table) {
			if (table) {
				calculateWindowParams();
				var colNum = table.showActions ? table.config.length + 1 : table.config.length;
				vm.columnWidthForHeader = vm.window.width <= 840 ? '100%' : (100 / colNum) + '%';
				columnWidthForBody = vm.isMobile ? vm.columnWidthForHeader : getColumnWidthForDesktopBody(colNum);
				lastColumnWidth = columnWidthForBody - SCROLL_WIDTH;
			}
		}

		function calculateColumnWidthsForCustom(config) {
			for (var i = 0; i <= config.length; i++) {
				if (config[i]) {
					customWidthsArray[i] = calculateWidthInPxFromCustomPercent(config[i].width);
				}
			}
		}

		function getDefaultSearchForMobile(configArray) {
			angular.forEach(configArray, function(config) {
				if (config.defaultSearchForMobile) {
					vm.selectedMobileSearch = config.name;
					vm.selectedMobileField = config.field;
				}
			});
		}
		function isMobile() {
			if (navigator.userAgent.match(/Android/i)
					|| navigator.userAgent.match(/webOS/i)
					|| navigator.userAgent.match(/iPhone/i)
					|| navigator.userAgent.match(/iPad/i)
					|| navigator.userAgent.match(/iPod/i)
					|| navigator.userAgent.match(/BlackBerry/i)
					|| navigator.userAgent.match(/Windows Phone/i)
					|| $window.innerWidth < 1024) {
				return true;
			} else {
				return false;
			}
		}

		vm.$onInit = function() {
			vm.isMobile = isMobile();
			if(!vm.window) {
				calculateWindowParams();
			}
		};

		vm.$onChanges = function(chagesObj) {
			if (chagesObj.table && chagesObj.table.currentValue) {
				current = chagesObj.table.currentValue;
				replaceEmptyCellsWithDashes(current);
				if (vm.isMobile) {
					getDefaultSearchForMobile(current.config);
				}
				if (vm.table.showActions) {
					vm.actions = vm.table.actionsConfig;
					vm.actionsTitle = vm.table.actionsConfig.title || 'ACTIONS';
				}
				vm.isCustomWidth = current.config[0].width !== undefined;
				angular.element(document).ready(function () {
					if (current.config[0].width) {
						calculateColumnWidthsForCustom(current.config);
					} else {
						calculateColumnWidths(current);
					}
				});
			}
		};

		vm.setChangesToColumn = function(index) {
			if (vm.highlightedIndex !== index) {
				vm.arrowDown = true;
			} else {
				vm.arrowDown = !vm.arrowDown;
			}
			vm.highlightedIndex = index;  
		};

		vm.getLastColumnWidth = function() {
			return lastColumnWidth;
		};

		vm.getWidthForTableBodyCells = function(index, isLast, customWidth) {
			if (customWidth) {
				return vm.isMobile ? customWidth : isLast ? customWidthsArray[index] - SCROLL_WIDTH : customWidthsArray[index];
			}
			if (!lastColumnWidth || !columnWidthForBody) {
				calculateColumnWidths(current);
			}
			return isLast && !vm.table.showActions && !vm.isMobile ? lastColumnWidth : columnWidthForBody;
		};
		vm.view = function(row) {
			var view = vm.actions.view;
			$state.go(view.stateName, { [view.routerUrlParam]: row[view.fieldName]});
		};
		vm.edit = function(row) {
			var edit = vm.actions.edit;
			$state.go(edit.stateName, { [edit.routerUrlParam]: row[edit.fieldName]});
		}
	}]	
});