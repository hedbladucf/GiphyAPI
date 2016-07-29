// RUN WHEN DOCUMENT LOADS
$(document).ready(function()
{

	/* ARRAY OF SPORTS */
	var sports = [
		"golf",
		"skiing",
		"snowboarding",
		"longboarding",
		"sky diving",
		"swimming"
	];

	for(var i = 0; i < sports.length; i++)
	{
		makeSportsButtons(sports[i]);
	}

	/* FUNCTION TO CREATE BUTTONS */
	function makeSportsButtons(sport)
	{
		var style = "margin-left:10px;"
		var button = $('<button>',
		{
			'class': 'btn sports-btn',
			'value': sport,
			'text': sport,
			'data-tag': sport,
			'style': style
		});
		$('.tags').append(button);
	}

	$('.tags').on('click', 'button', function() 
	{
		/* ON-CLICK VARIABLES & QUERY URL + API KEY
			SETS UP INITIAL BUTTONS
		*/ 
		var numberOfGiphys = 4;
		var apiKey = "dc6zaTOxFJmzC";
		var buttonTag = $(this).data('tag');
		var queryURL = "http://api.giphy.com/v1/gifs/random?api_key=" + apiKey + "&tag=" + buttonTag;

		for(var i = 0; i < numberOfGiphys; i++)
		{
			/* AJAX CALL */
			$.ajax({url: queryURL, method: 'GET'}).done(function(data)
			{
				/* STILL- AND ANIMATED IMAGE VARIABLES */
				var still = data.data.fixed_height_small_still_url;
				var animate = data.data.fixed_height_small_url;
				var giphyImage = $('<img>');

				/* SET THE NEEDED ATTRIBUTES */
				// giphyImage.addClass('giphySpace');
				giphyImage.attr('src', still);
				giphyImage.attr('data-still', still);
				giphyImage.attr('data-animate', animate);
				giphyImage.attr('data-state', 'still');
				giphyImage.attr('style', "margin-left:20px;width:300px;")

				/* APPEND THE GIPHY IMAGE TO THE BEGINNING */
				$('.giphy').prepend(giphyImage);
			});
		}
	});

	$('.giphy').on('click', 'img', function() 
	{

		/* GETS THE STATE OF THE IMAGE*/
		var imageState = $(this).attr('data-state');

		/* DETERMINES HOW TO HANDLE THE IMAGE (STILL VS. ANIAMTED) */
		if(imageState == "still")
		{
			$(this).attr('src', $(this).data('animate'));
			$(this).attr('data-state', 'animate');
		}
		else
		{
			$(this).attr('src', $(this).data('data-still'));
			$(this).attr('data-state', 'still');
		}
	});

	/* ADDS A NEW SPORT AS A BUTTON */
	$('#add-sport').click(function() 
	{
		var newSport = $('#addNewSport').val();
		makeSportsButtons(newSport);
		$('#addNewSport').val("");
	});

});