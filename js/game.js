let difficulty = 18;
let score;
let turns;
let turn;
let start = new Date().getTime();

function refreshGame() {
    let cards_array1 = [];
    let cards_array2 = [];
    let x = 1;
    let i = 1;
    
    turns = [];
    turn = 0;
    score = 0;
    $("#score").text(score);
    $("#gamecontainer").empty();

    while (i <= difficulty) {
         let random_num = Math.floor(Math.random() * difficulty);
         if(cards_array1.indexOf(random_num) == -1) {
             cards_array1.push(random_num);
             i++;
         }
    }
    
    i = 1;
    while (i <= difficulty) {
         let random_num = Math.floor(Math.random() * difficulty);
         if(cards_array2.indexOf(random_num) == -1) {
             cards_array2.push(random_num);
             i++;
         }
    }
    
    for(let i=0; i < difficulty; i++) {
        if (x % 6 == 0) {
            $("#gamecontainer").append("</div><div class='row'>");
            x = 1;
        }
        $("#gamecontainer").append("<div class='col-xs-6 col-sm-4 col-md-2'> <img class='cardback' id='a" + cards_array1[i] + "' src='img/back.jpg'><img class='card' name='a" + cards_array1[i] + "' src='img/" + cards_array1[i] + ".png'></div>");
        x++;
        $("#gamecontainer").append("<div class='col-xs-6 col-sm-4 col-md-2'> <img class='cardback' id='b" + cards_array2[i] + "' src='img/back.jpg'><img class='card' name='b" + cards_array2[i] + "' src='img/" + cards_array2[i] + ".png'></div>");
        x++
    }
    start = new Date().getTime();
}

refreshGame();

$(window).load(function() {
		$(".se-pre-con").fadeOut("slow");
	});

$(document).ready(function() {
    
    $(".cardback").click(function() {
        let pic = $(this).attr("id");

        $(this).hide();
        $("[name=" + pic + "]").show();
        if(turn == 2) {
            turn = 0;
            $("[name=" + turns[0] + "]").hide();
            $("[name=" + turns[1] + "]").hide();
            $("#" + turns[0]).show()
            $("#" + turns[1]).show();
            turns = [];
        }
        turns.push(pic);
        ++turn;
        if(turn == 2) {
            if(turns[0].slice(1,) == turns[1].slice(1,)) {
                score++
                $("#score").text(score);
                if (score == difficulty) {
                    let end = (((new Date().getTime() - start) / 1000) / 60).toFixed(2);
                    alert("You completed the puzzle in: " + end + " minutes.");
                }
                turn = 0;
                turns = [];
            }
        }
    })
})
