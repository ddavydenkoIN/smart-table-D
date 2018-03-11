angular.module('smart').service('TableService', function() {
	this.fillBaseTable = function(tableData, safeTableData) {
		var tableConfig = [{
			name: 'Id',
			field: 'id',
			defaultSearchForMobile: true,
			showSearch: false
		}, {
			name: 'First Name',
			field: 'first_name',
			showSearch: true
		}, {
			name: 'Last Name',
			field: 'last_name',
			showSearch: true
		}, {
			name: 'Email',
			field: 'email',
			showSearch: true
		}, {
			name: 'Gender',
			field: 'last_name',
			showSearch: true
		}, {
			name: 'IP Address',
			field: 'ip_address',
			showSearch: true
		}];
		return {
			data: tableData,
			safeData: safeTableData,
			config: tableConfig,
			tableBodyHeight: 250,
			showActions: true,
			actionsConfig: {
				title: 'Actions',
				edit: {
					stateName: 'editrole',
					routerUrlParam: 'roleId',
					fieldName: 'id'
				},
				view: {
					stateName: 'viewrole',
					routerUrlParam: 'roleId',
					fieldName: 'id'
				},
				customWidthApplied: '10%'
			}
		}
	}
	this.fillThreeColTable = function(tableData, safeTableData) {
		var tableConfig = [{
			name: 'Id',
			field: 'id',
			defaultSearchForMobile: true,
			showSearch: false
		}, {
			name: 'First Name',
			field: 'first_name',
			showSearch: true
		}, {
			name: 'Last Name',
			field: 'last_name',
			showSearch: true
		}];
		return {
			data: tableData,
			safeData: safeTableData,
			config: tableConfig,
			tableBodyHeight: 250,
			showActions: true,
			actionsConfig: {
				title: 'Actions',
				edit: {
					stateName: 'editrole',
					routerUrlParam: 'roleId',
					fieldName: 'id'
				},
				view: {
					stateName: 'viewrole',
					routerUrlParam: 'roleId',
					fieldName: 'id'
				},
				customWidthApplied: '10%'
			}
		};
	};
	this.withoutActionsCol = function(tableData, safeTableData) {
		var tableConfig = [{
			name: 'Id',
			field: 'id',
			defaultSearchForMobile: true,
			showSearch: false
		}, {
			name: 'First Name',
			field: 'first_name',
			showSearch: true
		}, {
			name: 'Last Name',
			field: 'last_name',
			showSearch: true
		}];
		return {
			data: tableData,
			safeData: safeTableData,
			config: tableConfig,
			tableBodyHeight: 250
		};
	};
	this.predefinedColWidth = function(tableData, safeTableData) {
		var tableConfig = [{
			name: 'Id',
			field: 'id',
			width: '15%',
			showSearch: true
		}, {
			name: 'First Name',
			field: 'first_name',
			width: '30%',
			showSearch: true
		}, {
			name: 'Last Name',
			field: 'last_name',
			width: '55%',
			showSearch: true
		}];
		return {
			data: tableData,
			safeData: safeTableData,
			config: tableConfig,
			tableBodyHeight: 200
		};
	};
	this.noSearchFields = function(tableData, safeTableData) {
		var tableConfig = [{
			name: 'Id',
			field: 'id',
			showSearch: true
		}, {
			name: 'First Name',
			field: 'first_name',
			showSearch: true
		}, {
			name: 'Last Name',
			field: 'last_name',
			showSearch: true
		}];
		return {
			data: tableData,
			safeData: safeTableData,
			config: tableConfig,
			hideSearchInputsDesk: true,
			hideSearchInputsMobile: true,
			tableBodyHeight: 200
		};
	}
});