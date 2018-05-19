document.getElementById("search").addEventListener('submit', function(evt) {
    evt.preventDefault();
    var resultsDOM = document.getElementById("results");
    var domain = document.getElementById("domain").value;
    var ext = document.getElementById("ext").value;
    var url = "https://web.archive.org/cdx/search/cdx?output=json&fl=original,timestamp,mimetype,statuscode,length&url=" + encodeURIComponent(domain) + "&matchType=domain&filter=original:" + encodeURIComponent("(?i).*\." + ext);
    console.log(url);
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function() {
        var response = this.response
        var table = document.createElement("table");
        var thead = table.createTHead();
        var headerRow = thead.insertRow();
        headerRow.insertCell().appendChild(document.createTextNode("Link"));
        headerRow.insertCell().appendChild(document.createTextNode("Timestamp"));
        headerRow.insertCell().appendChild(document.createTextNode("MIME Type"));
        headerRow.insertCell().appendChild(document.createTextNode("Status code"));
        headerRow.insertCell().appendChild(document.createTextNode("Length"));
        
        for(var i = 1; i < response.length; i++) {
            var original = response[i][0];
            var timestamp = response[i][1];
            var mimetype = response[i][2];
            var statuscode = response[i][3];
            var length = response[i][4];
            
            var archiveURL = "https://web.archive.org/web/" + timestamp + "/" + original;
            var link = document.createElement("a");
            link.href = archiveURL;
            link.textContent = original;
            
            var row = table.insertRow();
            row.insertCell().appendChild(link);
            row.insertCell().appendChild(document.createTextNode(timestamp));
            row.insertCell().appendChild(document.createTextNode(mimetype));
            row.insertCell().appendChild(document.createTextNode(statuscode));
            row.insertCell().appendChild(document.createTextNode(length));
        }
        
        resultsDOM.innerHTML = "";
        resultsDOM.appendChild(table);
    });
    xhr.responseType = "json";
    xhr.open("GET", url);
    xhr.send();
    resultsDOM.innerHTML = "Searching...";
});