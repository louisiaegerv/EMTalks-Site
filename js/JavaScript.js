

// Sample from Hernan

// http://spservices.codeplex.com/documentation
w
var getEventsforUser = function () {
    var getEventsforUser = function () {
        var SPevents = [];
        $().SPServices({
            operation: "GetListItems",
            async: false,
            listName: "Events",
            CAMLViewFields: "<ViewFields><FieldRef Name='ID' /><FieldRef Name='location' /><FieldRef Name='year' /><FieldRef Name='seats' /></ViewFields>",
            CAMLQuery: "<Query><Where><Eq><FieldRef Name='Author' /><Value Type='Number'>" + $scope.person.ID + "</Value></Eq></Where></Query>",
            completefunc: function (xData, Status) {
                $(xData.responseXML).SPFilterNode("z:row").each(function () {
                    var responseObj = {
                        'AppconID': ($(this).attr("ows_ID")),
                        'Location': ($(this).attr("ows_location")),
                        'Year': ($(this).attr("ows_year")),
                        'Seats': ($(this).attr("ows_seats"))
                    };
                    SPevents.push(responseObj);
                });
                $scope.events = SPevents;
            }
        });
    };
}