var MainController = function ($scope) {
    $scope.Title = "EMtalks";
    
}

var SpeakersController = function ($scope, $http, $timeout) {
    //$scope.Title = "EMtalks";    

    $scope.initialDisplay = 15;
	
	var getSpeakers = function () {
        return $http({
            method: "GET",
            url: "https://ishareteam4.na.xom.com/sites/ONE_EMIT/EMtalks/_vti_bin/ListData.svc/Speakers",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; odata=verbose",
            }
        });
    };
	
	var getSpeakersComplete = function(response) {

		$scope.Speakers = response.data.d.results;
		       
    }
	
	$scope.openModal = function(speaker){
        $('#theModal').modal('show');
        document.getElementById("theModalPic").setAttribute("src", speaker.Picture);
        document.getElementById("theModalTitle").innerHTML =speaker.Name;
        document.getElementById("theModalBody").innerHTML =speaker.Bio;
    }
    //init
    var getSpeakersPromise = getSpeakers()
        .then(getSpeakersComplete);
    
};


var NominateController = function ($scope, $http, $location) {
    
	$scope.EventTitle = "EMtalks"; //set this to the name of your event
	$scope.myForm = {};
		
	 
    $scope.register = function () {

	    $http({
            method: "POST",
            url: "https://ishareteam4.na.xom.com/sites/ONE_EMIT/EMtalks/_vti_bin/ListData.svc/SpeakerNominations",
            data: JSON.stringify({"Title" : "Nomination", "Name" : $scope.Name, "Email" : $scope.Email, "BusinessLine" : $scope.BusinessLine, 
            "Description" : $scope.Description, "SpeakerType" : $scope.SpeakerType}),
            
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; odata=verbose",
            }
        }).success(function(data){
            $location.path('/SpeakerConfirm');
        });
    };
}

var RegistrationController = function ($scope, $http, $location) {
    

    $scope.EventTitle = "EMtalks";
    $scope.EventTitle = "EMtalks";
    $scope.myForm = {};
    
    
    
    $scope.populateUserInfo = function(){
        
        var id = 0;
        
        $http.get("https://ishareteam4.na.xom.com/_api/Web/CurrentUser?$select=Id")
        .success(function(response){
            var txt = response.toString();

            if (window.DOMParser)
              {
                parser = new DOMParser();
                xmlDoc = parser.parseFromString(txt, "text/xml");
              }
            else // Internet Explorer
              {
                xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                xmlDoc.async = false;
                xmlDoc.loadXML(txt);
              }
            var id = xmlDoc.getElementsByTagName("d:Id")[0].childNodes[0].nodeValue;

            //NESTED INSIDE THE OTHER GET
            $http.get("https://ishareteam4.na.xom.com/_api/Web/SiteUserInfoList/Items("+id+")?$select=Name,Title")
            .success(function(response){
                var txt = response.toString();
                if (window.DOMParser)
                  {
                    parser = new DOMParser();
                    xmlDoc = parser.parseFromString(txt, "text/xml");
                  }
                else // Internet Explorer
                  {
                    xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                    xmlDoc.async = false;
                    xmlDoc.loadXML(txt);
                  }
                $scope.userName = xmlDoc.getElementsByTagName("d:Title")[0].childNodes[0].nodeValue;
                var unformattedID = xmlDoc.getElementsByTagName("d:Name")[0].childNodes[0].nodeValue;
                var splitID = unformattedID.split("|");
                $scope.userID = splitID[1];
            })
        })
    }
    
    $scope.populateUserInfo();
    
    $scope.register = function () {
        $http({
            method: "POST",
            url: "https://ishareteam4.na.xom.com/sites/ONE_EMIT/EMtalks/_vti_bin/ListData.svc/Attendees",
            data: JSON.stringify({"Title" : "Register", "Occupation" : $scope.Occupation, "Symbol" : $scope.Symbol, "Power" : $scope.Power, "Hobbies" : $scope.Hobbies, "Name" : $scope.userID}),
            
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; odata=verbose",
            }
        }).error(function(data){
            $location.path('/duplicate');
        })
        .success(function(data){
            $location.path('/AttendeeConfirm');
           
        });
    }
}
