crms.controller('recruitCtrl',function ($scope, $http, $location) {
	$scope.name="";
	$scope.addRmsg="";
	$scope.companies=['Google','Microsoft','Amazon'];
	$scope.applicants=[];
	/* HTTP */
	$http({
		method: 'GET',
		url   : '/company/all'
	}).then(function(response){
		$scope.data=response.data;
	},function(err){
		console.log('err');
	});

	$scope.register   = function(cid){
		console.log(cid);
			$http({
			method : 'POST',
			url    : '/apply/new',
			headers: {'Content-Type':'application/json'},
			data   : {'cid':cid},
		    }).then(function(response){
		    		console.log('done');
		    });
	}
	$scope.getList = function(){
		console.log($scope.companyList);
		$http({
		method: 'GET',
		url   : '/apply/all',
		params: {'cid':$scope.companyList}
		}).then(function(response){
				$scope.applicants=response.data;
			},function(err){
				console.log('err');
			});
	}

	$scope.addCompany = function(c){
		console.log('hi');
		var company = {
			name: c.name,
			location: c.location,
			ctc:c.ctc,
			bperiod: c.bPeriod,
			domain: c.domain,
			pattern: c.pattern,
			doi: c.doi,
			doj: c.doj,
			year: c.year,
			about: c.about
		};
		$http({
			method : 'POST',
			url    : '/company/add',
			headers: {'Content-Type':'application/json'},
			data   : angular.fromJson(company)
		}).then(function(response){
			$scope.addRmsg="Successfully Added";
			c.name="";
			c.location="";
			c.ctc="";
			c.bPeriod="";
			c.domain="";
			c.pattern="";
			c.doi="";
			c.doj="";
			c.year="";
			c.about="";
		});
	}; 

} );