var selectedFolder = null;

// Folder selector
$("a.collection-item").click(function() {
	$("a.collection-item").removeClass("active");
	$(this).addClass("active");
	selectedFolder = this;
	console.log(selectedFolder);
});

// Save images from all tabs
$('#save').click(function() {
	var queryInfo = {
		currentWindow: true,
		status: 'complete'
	};
	var toSave = [];

	chrome.tabs.query(queryInfo, function(tabs) {
		async.each(tabs, function(tab, callback) {
			// Iterate through tabs asynchronously
			testImage(tab.url, function(url, result) {

				if (result === "success") {
					console.log(result + ": " + url);
					var addToSave = true;

					toSave.forEach(function(saveTab, index) {
						if (saveTab.url === url) {
							// Duplicate tab
							// TODO: notification
							addToSave = false;
						}
					})

					if (addToSave) {
						toSave.push(tab);
						console.log(url + " added to toSave");
					}
				}
				callback();
			});
		}, function(error) {
			if (error) {
				console.log("An error occurred processing the tabs.");
			} else {
				// When all asynchronous calls are done
				console.log("Finished processing tabs: " + toSave);

				toSave.forEach(function(tab, index) {
					// Save tab image to selectedFolder


					console.log("removing tab: " + tab.url);
					chrome.tabs.remove(tab.id);
				});
			}
		});
	});
});

// Options
$('#options').click(function() {
	// TODO
});

// Open selected folder
$('#folder').click(function() {
	// TODO
});

function testImage(url, callback, timeout) {
	timeout = timeout || 5000; // Default timeout of 5s
	var timedOut = false, timer;
	var img = new Image();
	img.onerror = img.onabort = function() {
		if (!timedOut) {
			clearTimeout(timer);
			callback(url, "error (not image?)");
		}
	};

	img.onload = function() {
		if (!timedOut) {
			clearTimeout(timer);
			callback(url, "success");
		}
	};

	img.src = url;
	timer = setTimeout(function() {
		timedOut = true;
		callback(url, "timeout");
	}, timeout); 
}