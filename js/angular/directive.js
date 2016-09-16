var parseDate = function(){
    return {
        restrict: "EA",
        link: function (scope, element, attrs) {
            var date = attrs["date"];
            var format = attrs['format'];
            date = new Date(parseInt(date.replace(/\/Date\((\d+)\)\//gi, "$1")));

            var m_names = new Array("","January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
            //get offset in hours
            var timezoneOffset = date.getTimezoneOffset()/60;
            var yyyy = date.getFullYear().toString();
            var mm = (date.getMonth()+1).toString();
            var dd  = date.getDate().toString();

            var mmChars = mm.split('');
            var ddChars = dd.split('');
            if (format) {
                displayDate = m_names[mm];
            } else {
                var displayDate = m_names[Number((mmChars[1]?mm:"0"+mmChars[0]))] + ' ' + (ddChars[1]?dd:"0"+ddChars[0]) + ', ' + yyyy + "    " + formatAMPM(date, timezoneOffset);
            }
            element.html(displayDate);
        }
    };
};

/*
 * Format datetime in standard US format
 * @params date: date object
 */
function formatAMPM(date, timezoneOffset) {
    var hours = date.getHours() + timezoneOffset;
    var minutes = date.getMinutes();
    var ampm = (hours >= 12 && hours <= 23)? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

/* Register */
var register = function ($http) {
    return {
        restrict: "EA",
        link: function (scope, element, attrs) {
            var checkRegistration = function () {
                var eventID = attrs["eventId"];
                var isRegistered = scope.isRegistered(eventID);
                if (isRegistered) {
                    element.html("Unregister");
                    element.addClass("grey-bck");
                    scope.unRegisteredSeat = false;
                    scope.registeredSeat = true;
                } else if (!isRegistered && scope.seatsAvailable(parseInt(eventID, 10))) {
                    element.html("Register");
                    element.removeClass("grey-bck");
                    element.removeClass("red-bck");
                    scope.unRegisteredSeat = true;
                    scope.registeredSeat = false;
                } else {
                    element.html("No Seats Available");
                    element.addClass("red-bck");
                    element.removeClass("grey-bck");
                    scope.unRegisteredSeat = false;
                    scope.registeredSeat = false;
                }
            }
            scope.$watch('registrationChange', function (newVal) {
                if(newVal > 0){
                    checkRegistration();
                }
            });
        }
    };
};

var autolinker = function () {
    return {
        restrict: 'E',
        scope: {
        text: '=',
        location: '='
        },
        link: function (scope, element, attrs) {
            var description = '';
            if (scope.text != undefined) {
                description += scope.text;
            }
            if (scope.location != undefined) {
                description += ' ' + scope.location;
            }
            element.html(Autolinker.link(description, { truncate: 35 }));
        }
    }
};