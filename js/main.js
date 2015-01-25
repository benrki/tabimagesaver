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
	
});

// Options
$('#options').click(function() {
	
});

// Open selected folder
$('#folder').click(function() {
	
});