(function(){
	var holder = $(".text-wrapper");
	var sentence = holder.text();
	holder.html("<div class='word-0'></div>");
	var characters = sentence.split("");
	var wordCounter = 0;
	var animTimeout;

	for(let i = 0; i < characters.length; i++) {
		if(characters[i] == " ") {
			wordCounter++;
			holder.append("<div class='word-" + wordCounter + "'></div>");
			continue;
		}

		holder.children(".word-" + wordCounter).append("<span>" + characters[i] + "</span>");
	}

	holder.addClass("complete");

	$(".text-wrapper span").on("mouseover", function(){
		triggerElement($(this));
	});

	function triggerElement(letter) {
		letter = $(letter);
		clearTimeout(animTimeout);
		letter.removeClass("active");
		animTimeout = setTimeout(function(){
			letter.addClass("active");
		}, 10);
	}

	$(".text-wrapper").on("touchstart", function(e){
		$(".text-wrapper span").off("mouseover");
		if(e.target.tagName == "SPAN"){
			triggerElement(e.target);
		}
	});

	$(".text-wrapper").on("touchmove", function(e) {
		if (e.touches) {
			var realTarget = document.elementFromPoint(e.touches[0].pageX, e.touches[0].pageY);
			if(realTarget.tagName == "SPAN"){
				if( !$(realTarget).hasClass("tt")){
					$(".text-wrapper span").removeClass("tt");
					$(realTarget).addClass("tt");
					triggerElement(realTarget);
				}
			}
			else {
				$(".text-wrapper span").removeClass("tt");
			}	
		}
	});
})();
