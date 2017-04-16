var events = [];
var eventIds = [0, 1, 2, 3, 4, 5, 6, 7]
var eventNames = ["Board Game Night", "Movie Night", "Chocolate Fountain", "Halloween Party", "White Elephant", "Grape Juice and Cheese", "Sushi and Boba", "Pie Taste Testing"];
var eventDescriptions = ["Come make enemies out of your friends", "Come watch a movie", "Come eat chocolate out of a fountain", "Come get spooped", "Better than secret santa!", "Fancy break for the underaged", "The two best things about life", "Bake 314 pies!"];
var eventCosts = [2, 1, 3, 3, 1, 2, 4, 4];
var eventPrepTimes = [1, 1, 2, 4, 1, 1, 1, 4];
var eventParticipations = [4, 4, 2, 2, 2, 2, 4, 4];
var eventImages = [];

for (var i = 0; i < eventIds.length; i++) {
	var eventJson = {};
	eventJson.id = eventIds[i];
	eventJson.name = eventNames[i];
	eventJson.description = eventDescriptions[i];
	eventJson.cost = eventCosts[i];
	eventJson.prepTime = eventPrepTimes[i];
	eventJson.participation = eventParticipations[i];
	// eventJson[image] = eventImages[i];

	events.push(eventJson);
}

// console.log(events);

$(document).ready(function() {
	var eventContainerName = ".event-div-container";
	var eventContainer = $(eventContainerName);

	for (var i = 0; i < events.length; i++) {
		var event = events[i];
		var eventId = event.id;
		var eventName = event.name;
		var eventCost = event.cost;
		var eventPrepTime = event.prepTime;
		var eventParticipation = event.participation;
		// var eventImage = event.image;

		var eventDiv = $("<div class='event-div'></div>").attr("id", eventId);
		
		// var eventImageDiv = $("<div class='event-image'></div>").css("background-image", "url(" + eventImage + ")");
		var eventTextDiv = $("<div class='event-text'></div>");

		var eventNameDiv = $("<div class='event-name'>" + eventName + "</div>");
		var eventPropertiesDiv = $("<div class='event-properties'></div>");

		var eventCostDiv = $("<div class='event-property'>Cost: " + eventCost + "</div>");
		var eventPrepTimeDiv = $("<div class='event-property'>PrepTime: " + eventPrepTime + "</div>");
		var eventParticipationDiv = $("<div class='event-property'>Participation: " + eventParticipation + "</div>");

		eventPropertiesDiv.append(eventCostDiv);
		eventPropertiesDiv.append(eventPrepTimeDiv);
		eventPropertiesDiv.append(eventParticipationDiv);

		eventTextDiv.append(eventNameDiv);
		eventTextDiv.append(eventPropertiesDiv);

		// eventDiv.append(eventImageDiv);
		eventDiv.append(eventTextDiv);

		eventContainer.append(eventDiv);
	}

});