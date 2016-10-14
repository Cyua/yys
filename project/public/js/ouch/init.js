//Hook up the tweet display

$(document).ready(function() {
						   
	$("#countdown").countdown({
				date: "14 october 2016 21:00:00",
				format: "on"
			},
			
			function() {
				// callback function
			});

    $(".tweet").tweet({
        username: "flashuser",
        count: 3,
        loading_text: "loading tweets..."
    });

});	
