$(".button").hover(function(){
	$(this).addClass("hlighted");
},function(){
	$(this).removeClass("hlighted");
});
function autoResize(){
	var height = $('body').height() - $('#top-bar').height();
	$('.codepane').height(height);
}
autoResize();
$(window).resize(function(){
	autoResize();
})
function updateOutput(){
	$("#output-content").contents().find("html").html("<html><head><style type='text/css'>"+$("#csstxt").val()+"</style></head><body>"+$("#htmmltxt").val())+"</boyd></html>";
	document.getElementById('output-content').contentWindow.eval($('#javascripttxt').val());
}
$(".button").click(function(){
	var pane="#"+($(this).attr("id").replace("-btn",""));
	var noVisiblePane = 0;
	$(pane).toggle();				
	$(".codepane").each(function(){
		if ($(this).is(":visible")){
			noVisiblePane++;						
		}
	});
	
	if (noVisiblePane == 0){
		$(pane).toggle();
		noVisiblePane++;
		return false;
	} 
	var width = 100/noVisiblePane;
	$('.codepane').width(width+"%");
	$(this).toggleClass('active');
})

updateOutput();
$( ".codepane" ).on('change keyup paste',function() {
	updateOutput();
});

//tab key press
$("textarea").keydown(function(e) {
	if(e.keyCode === 9) { // tab was pressed
		// get caret position/selection
		var pane="#"+$(this).attr("id");
		var start = this.selectionStart;
		var end = this.selectionEnd;
		
		var $this = $(pane);
		var value = $this.val();
		var result = "\t"+value.substring(end);
		if (start!=end){
			result = "";
			selectedTxt = value.substring(start,end).split("\n");
			for (var i = 0, len = selectedTxt.length; i < len; i++) {						  
			  result = result + "\t" + selectedTxt[i];
			  if (i<len-1){
					result+="\n";
				}
			}
		}
		// set textarea value to: text before caret + tab + text after caret
		
		
		$(pane).val(value.substring(0, start)
					+ result);

		// put caret at right position again (add one for the tab)
		this.selectionStart = this.selectionEnd = start + 1;

		// prevent the focus lose
		e.preventDefault();
	}
});