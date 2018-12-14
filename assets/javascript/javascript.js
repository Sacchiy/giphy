$(document).ready(function () {
    //create an array with animals
    var animals = ['dog', 'cat', 'bird', 'pig', 'cow', 'rabbit', 'llama', 'penguin', 'owl', 'bear', 'koala', 'kangaroo', 'elephant', 'giraffe'];

    //for loop anilams and display them in buttons
    function createButton() {
        for (var i = 0; i < animals.length; i++) {
            $('#buttons').append($('<button/>', { class: 'animalButton', type: 'button', id: 'animal' + i, text: animals[i] }));

            //$('#animal' + i).on('click', {'idx': i}, function(e) {
            //store    
        };
    };

    createButton();
    displayGiphy();

    //push input value to an array when submit button is clicked
    $('#submit-button').on('click', function () {
        event.preventDefault();
        var string = $('input:text').val();
        console.log(string);
        animals.push(string);
        $('#buttons').empty();
        createButton();
        displayGiphy();
    });

    //add buttons data
    function displayGiphy() {
        for (var i = 0; i < animals.length; i++) {
            $('#animal' + i).on('click', { 'idx': i }, function (e) {
                //store
                var chosen = e.data.idx;
                //API query
                var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animals[chosen] + "&api_key=3NL0A8m1exuUzp8RTui5qJG91FNJV8yk";

                $.ajax({
                    url: queryURL,
                    method: "GET"
                })
                    // After data comes back from the request
                    .then(function (response) {

                        $('#gifs-appear-here').empty();

                        // storing the data from the AJAX request in the results variable
                        var results = response.data;

                        // Looping through each result item
                        for (var i = 0; i < 10; i++) {
                            // Creating and storing a div tag
                            var animalDiv = $("<div id='animalDiv'>");

                            // Creating a paragraph tag with the result item's rating
                            var p = $("<p id='rating'>").text("Rating: " + results[i].rating);

                            // Creating and storing an image tag
                            var animalImage = $("<img class='img'>");
                            // Setting the src attribute of the image to a property pulled off the result item
                            animalImage.attr("src", results[i].images.fixed_height_still.url);
                            animalImage.attr("data-still", results[i].images.fixed_height_still.url);
                            animalImage.attr("data-animate", results[i].images.fixed_height.url);
                            animalImage.attr("alt", 'animal-image');

                            // Appending the paragraph and image tag to the animalDiv
                            animalDiv.append(p);
                            animalDiv.append(animalImage);

                            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                            $("#gifs-appear-here").prepend(animalDiv);

                            //Stop, Start gifs
                            $(".img").on("click", function () {
                                // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
                                var state = $(this).attr("data-state");

                                // If the clicked image's state is still, update its src attribute to what its data-animate value is.
                                // Then, set the image's data-state to animate
                                // Else set src to the data-still value
                                if (state === "still") {
                                    $(this).attr("src", $(this).attr("data-animate"));
                                    $(this).attr("data-state", "animate");
                                } else {
                                    $(this).attr("src", $(this).attr("data-still"));
                                    $(this).attr("data-state", "still");
                                }
                            });
                        };
                    });
            });
        };
    };
});