var events = [];
var eventIds = [0, 1, 2, 3, 4, 5, 6, 7]
var eventNames = ["Board Game Night", "Movie Night", "Chocolate Fountain", "Halloween Party", "White Elephant", "Grape Juice and Cheese", "Sushi and Boba", "Pie Taste Testing"];
var eventWings = ["2E", "2W", "3E", "3W", "4E", "4W", "5E", "5W"];
var eventDescriptions = ["Come make enemies out of your friends", "Come watch a movie", "Come eat chocolate out of a fountain", "Come get spooped", "Better than secret santa!", "Fancy break for the underaged", "The two best things about life", "Bake 314 pies!"];
var eventCosts = [2, 1, 3, 3, 1, 2, 4, 4];
var eventPrepTimes = [1, 1, 2, 4, 1, 1, 1, 4];
var eventdurations = [4, 4, 2, 2, 2, 2, 4, 4];
var eventImages = ["gamenight.jpg", "movienight.jpg", "chocolatefountain.jpg", "halloweenparty.jpg", "whiteelephant.jpg", "grapejuice.jpg", "sushiboba.jpg", "pietastetest.jpg"];
var eventComments = [["Great! We played Catan and Dominion", "Maybe some food would be nice"], ["Sending out a movie poll beforehand was nice"], ["The chocolate got everywhere"], ["You should try making people come in costumes"], ["Explaining the rules was a bit hard"], ["We ate a lot of cheese! A+ event"], ["Probably the best event I've tried"], ["I didn't make nearly as many pies, but it was still fun"]];

var costIcon = '<i class="dollar icon"></i>';
var prepTimeIcon = '<i class="hand paper icon"></i>';
var durationIcon = '<i class="clock icon"></i>';

var costConversion = ["", "&lt;$50", "$50 - $100", "$100 - $200", "&gt;$200"];
var prepTimeConversion = ["", "&lt;2hr", "2hr - 4hr", "4hr - 6hr", "&gt;6hr"];
var durationConversion = ["", "&lt;30min", "30min - 1hr", "1hr - 2hr", "&gt;2hr"];

for (var i = 0; i < eventIds.length; i++) {
	var eventJson = {};
	eventJson.id = eventIds[i];
	eventJson.name = eventNames[i];
	eventJson.wing = eventWings[i];
	eventJson.description = eventDescriptions[i];
	eventJson.cost = eventCosts[i];
	eventJson.prepTime = eventPrepTimes[i];
	eventJson.duration = eventdurations[i];
	eventJson.image = eventImages[i];
	eventJson.comments = eventComments[i];

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

var rewriteEvents = function(searchQuery, filters, sortProperty, sortReverse) {
	// We only need a shallow copy because we aren't editting the objects inside the array
	var eventsCopy = events.slice();

	if (searchQuery) {
		eventsCopy = eventsCopy.filter(function(event) {
			var eventNameLower = event.name.toLowerCase();
			var searchQueryLower = searchQuery.toLowerCase();
			return eventNameLower.indexOf(searchQueryLower) >= 0;
		});
	}

	if (filters) {
		for (var filterKey in filters) {
			if (filters.hasOwnProperty(filterKey)) {
				var filterArray = filters[filterKey];

				if (filterArray.length > 0) {
					eventsCopy = eventsCopy.filter(function(event) {
						console.log(event[filterKey]);
						return filterArray.indexOf(parseInt(event[filterKey])) > -1;
					});
				}
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
		var eventDuration = event.duration;
		var eventImage = event.image;

		var eventDiv = $("<div class='event-div ui segment'></div>").attr("id", eventId);

		var eventImageDiv = $("<div class='event-image'></div>").css("background-image", "url('./images/"+ eventImage + "')");
		var eventTextDiv = $("<div class='event-text'></div>");

		var eventNameDiv = $("<div class='event-name'>" + eventName + "</div>");
		var eventPropertiesDiv = $("<div class='event-properties'></div>");

		var costIcons = costIcon.repeat(eventCost);
		var prepTimeIcons = prepTimeIcon.repeat(eventPrepTime);
		var durationIcons = durationIcon.repeat(eventDuration);
        
        var costPopupString = "'Cost: " + costConversion[eventCost] + "' ";
        var prepTimePopupString = "'Prep Time: " + prepTimeConversion[eventPrepTime] + "' ";
        var durationPopupString = "'Duration: " + durationConversion[eventDuration] + "' ";
    
		var eventCostDiv = $("<div class='event-property' data-tooltip=" + costPopupString + "data-position='left center'>" + costIcons + "</div>");
		var eventPrepTimeDiv = $("<div class='event-property 'data-tooltip=" + prepTimePopupString + "data-position='left center'>" + prepTimeIcons + "</div>");
		var eventDurationDiv = $("<div class='event-property' data-tooltip=" + durationPopupString + "data-position='left center'>" + durationIcons + "</div>");

		eventPropertiesDiv.append(eventCostDiv);
		eventPropertiesDiv.append(eventPrepTimeDiv);
		eventPropertiesDiv.append(eventDurationDiv);

		eventTextDiv.append(eventPropertiesDiv);
		eventTextDiv.append(eventNameDiv);

		eventDiv.append(eventImageDiv);
		eventDiv.append(eventTextDiv);

		eventContainer.append(eventDiv);
	}
}

$(document).ready(function() {
	rewriteEvents();

	$('.ui.dropdown').dropdown();  
 
	var currentFilters = {"cost": [], "prepTime": [], "duration": []};
	var currentSortProperty;
	var currentSortReverse = false;
    

	$(".user-filter").on("click", function() {
		var filterInfo = $(this).attr("data-value");
		var filterInfoArray = filterInfo.split("-");

		var filterProperty = filterInfoArray[0];
		var filterValue = parseInt(filterInfoArray[1]);

		var currentFilterArray = currentFilters[filterInfoArray[0]];
		var currentFilterIndex = currentFilterArray.indexOf(filterValue);

		if (currentFilterIndex > -1) {
			currentFilterArray.splice(currentFilterIndex, 1);
		} else {
			currentFilterArray.push(filterValue);
		}

		rewriteEvents(null, currentFilters, currentSortProperty, currentSortReverse);
	});
    
    $(".user-sort").on("click", function(e) {
        e.stopPropagation();
		var sortInfo = $(this).attr("data-value");
		var sortInfoArray = sortInfo.split("-");
        currentSortProperty = sortInfoArray[0];
        currentSortReverse = sortInfoArray[1] === "up" ? false : true;

		rewriteEvents(null, currentFilters, currentSortProperty, currentSortReverse);

		var $selected = $(this).hasClass("item") ? $(this) : $(this).closest(".item");
		$(".user-sort").removeClass("active selected");
		$selected.addClass("active selected");
		var $dropdown = $(this).closest(".ui.dropdown");
		var $dropdownText = $dropdown.find("span.text").first();
		$dropdownText.text($selected.find("span.text").text());
		var $dropdownCaret = $dropdown.find(".dropdown.icon");
		$dropdownCaret.remove();
		var $dropdownCaretContainer = $selected.find(".caret-container");
		var $activeCaret = currentSortReverse ? $dropdownCaretContainer.find(".down") : $dropdownCaretContainer.find(".up");
		$activeCaret.addClass("active");
		$(".ui.dropdown>.caret.icon").remove();
		$dropdown.append($activeCaret.clone());
	});

	$("#search-event-button").on("click", function() {
		var searchBox = $('#user-input-search');
        var searchQuery = searchBox.val();
        rewriteEvents(searchQuery, currentFilters, currentSortProperty, currentSortReverse);
    });

    $('#user-input-search').on("click", function(e) {
    	$(this).removeAttr("placeholder");
    });
    
    $("#user-input-search").on("keypress", function(e) {
        if (e.keyCode == 13) {
        	var searchBox = $('#user-input-search');
            var searchQuery = searchBox.val();
            rewriteEvents(searchQuery, currentFilters, currentSortProperty, currentSortReverse);
        }
    })

    $('#search-clear-button').on("click", function() {
    	var searchBox = $('#user-input-search');
    	searchBox.val('');
    	searchBox.attr("placeholder", "Search events...");
    	rewriteEvents(null, currentFilters, currentSortProperty, currentSortReverse);
    });

    var currentModalId;
	var modalName = '.ui.modal';
	var modalDiv = $(modalName);

	$(document).on("click", ".event-div", function() {
		modalDiv.empty();
		var eventId = this.id;
		currentModalId = eventId;
		var event;

		modalDiv.append("<i class='close icon'></i>");

		for (var i = 0; i < events.length; i++) {
			if (events[i].id === parseInt(eventId)) {
				event = events[i];
				break;
			}
		}

		var eventName = event.name;
		var eventWing = event.wing;
		var eventCost = event.cost;
		var eventPrepTime = event.prepTime;
		var eventDuration = event.duration;
		var eventImage = event.image;  
		var eventDescription = event.description;
		var eventComments = event.comments;

		var modalHeaderDiv = $("<div class='modal-header'></div>");

		var modalImageDiv = $("<div class='modal-image'></div>").css("background-image", "url('./images/"+ eventImage + "')");
		var modalNameDiv = $("<div class='modal-name'>" + eventName + "</div>");
		var modalWingDiv = $("<div class='modal-wing'>Wing: " + eventWing + "</div>");
		var modalPropertiesDiv = $("<div class='modal-properties'></div>");

		var costIcons = costIcon.repeat(eventCost);
		var prepTimeIcons = prepTimeIcon.repeat(eventPrepTime);
		var durationIcons = durationIcon.repeat(eventDuration);

		var modalCostDiv = $("<div class='modal-property'>Cost: " + costIcons + "</div>");
		var modalPrepTimeDiv = $("<div class='modal-property'>Prep Time: " + prepTimeIcons + "</div>");
		var modalDurationDiv = $("<div class='modal-property'>Duration: " + durationIcons + "</div>");

		modalPropertiesDiv.append(modalCostDiv);
		modalPropertiesDiv.append(modalPrepTimeDiv);
		modalPropertiesDiv.append(modalDurationDiv);

		modalHeaderDiv.append(modalImageDiv);
		modalHeaderDiv.append(modalNameDiv);
		modalHeaderDiv.append(modalWingDiv);
		modalHeaderDiv.append(modalPropertiesDiv);

		modalDiv.append(modalHeaderDiv);

		var modalDescriptionDiv = $("<div class='modal-description-container'></div>");
		var modalDescriptionTitleDiv = $("<div class='modal-description-title'>Description</div>");
		var modalDescriptionTextDiv = $("<div class='modal-description-text'>" + eventDescription + "</div>");

		modalDescriptionDiv.append(modalDescriptionTitleDiv);
		modalDescriptionDiv.append(modalDescriptionTextDiv);

		modalDiv.append(modalDescriptionDiv);

		var modalCommentsDiv = $("<div class='modal-comments-container'></div>");
		var modalCommentsTitleDiv = $("<div class='modal-comments-title'>Comments</div>");
		var modalCommentsBoxDiv = $("<div class='modal-comments-box'></div>");
		var modalCommentsAddDiv = $("<div class='modal-comments-add'><form class='ui reply form modal-form'> <div class='field'><textarea></textarea></div> \
    	<div class='ui blue labeled submit icon button modal-reply-button'><i class='icon edit'></i> Add Comment </div> </form></div>");

		for (var i = 0; i < eventComments.length; i++) {
			var modalCommentsTextDiv = $("<div class='modal-comments-text'>" + eventComments[i] + "</div>");
			modalCommentsBoxDiv.append(modalCommentsTextDiv);
		}

		modalCommentsDiv.append(modalCommentsTitleDiv);
		modalCommentsDiv.append(modalCommentsBoxDiv);
		modalCommentsDiv.append(modalCommentsAddDiv);

		modalDiv.append(modalCommentsDiv);

		$(modalName).modal('show');
	});
});
