$("#search-button").on("click", function() {
    $("#articlesDisplay").html("");
    // Saves search term in variable to use in queryURL
    var searchTerm = $("#exampleFormControlInput1").val();
    if (searchTerm === "") {
        return alert("Search Term is required");
    }
    // Saves number of records to use as number of for loop iterations
    var numberRecords = $("#exampleFormControlSelect1").val();
    // Saves value of start year form input
    var startYear = $("#start-year-text").val();
    if (isNaN(startYear)) {
        return alert("Start Year Must Be a Number");
    } else if (startYear !== "") {
        startYear = startYear + "0101";
    }
    // queryURL starts out blank
    var queryURL = "";
    // TO DO: End Year
    var endYear = "int-textarea";
    // Changes queryURL depending on if startYear is blank
    if (startYear === "") {
        // If start year is blank, ignore pub year API key
        queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchTerm + "&api-key=mSUWsLZWndi1b2hHg9mNUGFvYrzA1KZ7";
    } else {
        // If start year is filled in, add pub year API filter
        queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchTerm + "&begin_date=" + startYear + "&api-key=mSUWsLZWndi1b2hHg9mNUGFvYrzA1KZ7";
    }
    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
        var articlesArray = response.response.docs;
        for (var i = 0; i < numberRecords; i++) {
            var newHeader = $("<h3>");
            newHeader.text(articlesArray[i].headline.main);
            $("#articlesDisplay").append(newHeader);
            var newP = $("<p>");
            newP.text(articlesArray[i].abstract);
            $("#articlesDisplay").append(newP);
            var newImg = $("<img>");
            newImg.attr("src", "https://www.nytimes.com/" + articlesArray[i].multimedia[5].url);
            $("#articlesDisplay").append(newImg);
            $("#articlesDisplay").append("<br>");
            var newURL = $("<a>");
            newURL.attr("href", articlesArray[i].web_url);
            newURL.text(articlesArray[i].web_url);
            $("#articlesDisplay").append(newURL);
        }
    });
});