'use strict';
var smart = angular.module('smart', ['smart-table-d']);

smart.run(['$rootScope', '$http', '$timeout', 'TableService', function($rootScope, $http, $timeout, TableService) {
	$rootScope.tableName = 'smart-table-D';
	$http.get('data/mock_data.json').then(function(response) {
		var tableData = response.data;
		var safeTableData = tableData;
		$rootScope.baseSmartTableConf = TableService.fillBaseTable(tableData, safeTableData);
		$rootScope.threeColTableConf = TableService.fillThreeColTable(tableData, safeTableData);
		$rootScope.withoutActionsColConf = TableService.withoutActionsCol(tableData, safeTableData);
		$rootScope.predefinedColWidthConf = TableService.predefinedColWidth(tableData, safeTableData);
		$rootScope.noSearchFields = TableService.noSearchFields(tableData, safeTableData);
	});
}]);
