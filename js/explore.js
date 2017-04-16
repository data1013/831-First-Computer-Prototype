var events = [];
var eventIds = [0, 1, 2, 3, 4, 5, 6, 7]
var eventNames = ["Board Game Night", "Movie Night", "Chocolate Fountain", "Halloween Party", "White Elephant", "Grape Juice and Cheese", "Sushi and Boba", "Pie Taste Testing"];
var eventDescriptions = ["Come make enemies out of your friends", "Come watch a movie", "Come eat chocolate out of a fountain", "Come get spooped", "Better than secret santa!", "Fancy break for the underaged", "The two best things about life", "Bake 314 pies!"];
var eventCosts = [2, 1, 3, 3, 1, 2, 4, 4];
var eventPrepTimes = [1, 1, 2, 4, 1, 1, 1, 4];
var eventdurations = [4, 4, 2, 2, 2, 2, 4, 4];
var eventImages = ["gamenight.jpg", "movienight.jpg", "chocolatefountain.jpg", "halloweenparty.jpg", "whiteelephant.jpg", "grapejuice.jpg", "sushiboba.jpg", "pietastetest.jpg"];

for (var i = 0; i < eventIds.length; i++) {
	var eventJson = {};
	eventJson.id = eventIds[i];
	eventJson.name = eventNames[i];
	eventJson.description = eventDescriptions[i];
	eventJson.cost = eventCosts[i];
	eventJson.prepTime = eventPrepTimes[i];
	eventJson.duration = eventdurations[i];
	eventJson.image = eventImages[i];

	events.push(eventJson);
}

var sortHelper = function(property, sortReverse) {
	var sortOrder = 1;
	if (sortReverse) {
		sortOrder = -1;
	}

	return function(a, b) {
		var result;
		if (a[property] < b[property]) {
			result = -1;
		} else if (a[property] > b[property]) {
			result = 1;
		} else {
			result = 0;
		}

		return result * sortOrder;
	}
}

var rewriteEvents = function(filters, sortProperty, sortReverse) {
	// We only need a shallow copy because we aren't editting the objects inside the array
	var eventsCopy = events.slice();

	if (filters) {
		for (var filterKey in filters) {
			if (filters.hasOwnProperty(filterKey)) {
				var filterValue = filters[filterKey];

				 eventsCopy = eventsCopy.filter(function(event) {
					return event[filterKey] === filterValue;
				});
			}
		}
	}

	if (sortProperty) {
		var sortFunction = sortHelper(sortProperty, sortReverse);
		eventsCopy.sort(sortFunction);
	}

	var eventContainerName = ".event-div-container";
	var eventContainer = $(eventContainerName);
	eventContainer.empty();

	for (var i = 0; i < eventsCopy.length; i++) {
		var event = eventsCopy[i];
		var eventId = event.id;
		var eventName = event.name;
		var eventCost = event.cost;
		var eventPrepTime = event.prepTime;
		var eventduration = event.duration;
		var eventImage = event.image;

		var eventDiv = $("<div class='event-div'></div>").attr("id", eventId);

		// TODO: Need to get rid of hardcoding the image div's size here and put it in css
		var eventImageDiv = $("<div class='event-image'></div>").css("background-image", "url('./images/"+ eventImage + "')").css({'width': '300px', 'height': '300px'});
		var eventTextDiv = $("<div class='event-text'></div>");

		var eventNameDiv = $("<div class='event-name'>" + eventName + "</div>");
		var eventPropertiesDiv = $("<div class='event-properties'></div>");

		var eventCostDiv = $("<div class='event-property'>Cost: " + eventCost + "</div>");
		var eventPrepTimeDiv = $("<div class='event-property'>PrepTime: " + eventPrepTime + "</div>");
		var eventdurationDiv = $("<div class='event-property'>Duration: " + eventduration + "</div>");

		eventPropertiesDiv.append(eventCostDiv);
		eventPropertiesDiv.append(eventPrepTimeDiv);
		eventPropertiesDiv.append(eventdurationDiv);

		eventTextDiv.append(eventNameDiv);
		eventTextDiv.append(eventPropertiesDiv);

		eventDiv.append(eventImageDiv);
		eventDiv.append(eventTextDiv);

		eventContainer.append(eventDiv);
	}
}

$(document).ready(function() {
	rewriteEvents();
	// rewriteEvents({"cost": 2, "duration": 4}, "duration", true);

	$('.ui.dropdown').dropdown();  
	$("#stock-image").on("click", function() {
		$('.ui.modal').modal('show');  
	});
     
	$(".user-input").on("click", function() {
		console.log($(this).attr("data-value"));  
	});
	var currentFilters = {};
	var currentSortProperty;
	var currentSortReverse;

	$(".item").on("click", function() {
		var filterInfo = $(this).attr("data-value");
		var filterInfoArray = filterInfo.split("-");
		currentFilters[filterInfoArray[0]] = parseInt(filterInfoArray[1]);

		rewriteEvents(currentFilters, currentSortProperty, currentSortReverse);
	});
});

