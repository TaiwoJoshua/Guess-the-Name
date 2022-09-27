var inputs = {};
inputs = {};
function game(name1, name2, name3, name4, nplayer){
    score1 = 0;
    score2 = 0;
    score3 = 0;
    score4 = 0;
    final = 0;
    names = "";
    $("#score1").text(score1);
    $("#score2").text(score2);
    $("#score3").text(score3);
    $("#score4").text(score4);
    $("#playerwr").fadeOut(1000, function(){
        // let listed = ["Joshua", "Goodness", "Jehovah", "Harvest", "Ayomide", "Olamilekan", "Erioluwa", "Daniel", "Boaz"];
        let players = [name1, name2, name3, name4];
        $("#turn").text(players[0]);
        namelist = listed.length;
        m = Math.floor(Math.random() * namelist);
        n = parseInt(nplayer);
        names = listed[m].toUpperCase();
        console.log(names);
        let l = names.length;
        let pname = $(".pname");
        for(i = 0; i < l; i++){
            $("#namew").append('<div class="divs"></div>')
        };
        for(i = 0; i < n; i++){
            pname.eq(i).text(players[i]);
        }
        let player1 = $("#player1");
        let player2 = $("#player2");
        let player3 = $("#player3");
        let player4 = $("#player4");
        if(n === 1){
            player1.show();
        }else if(n === 2){
            player1.show();
            player2.show();
        }else if(n === 3){
            player1.show();
            player2.show();
            player3.show();
        }else if(n === 4){
            player1.show();
            player2.show();
            player3.show();
            player4.show();
        }
        $(".special").fadeIn(3000, function(){
            pturn = 0;
            $("#check").click(function(e){
                e.preventDefault();
                let letter = $("#guess").val().toUpperCase();
                if(letter != ""){
                    let x = $(".divs");
                    let q = 1;
                    let score = 0;
                    if(inputs[letter] > -1){
                        $("#exist").show();
                        $("#right").hide();
                        $("#wrong").hide();
                        $("#empty").hide();
                    }else{
                        for(i = 0; i < x.length; i++){
                            me = 0;
                            if(letter === names[i]){
                                q = 0;
                                x.eq(i).text(letter.toUpperCase(), score++);
                                $("#right").show();
                                $("#continue").show();
                                $("#check").hide();
                                $("#pass").hide();
                                $("#wrong").hide();
                                $("#empty").hide();
                                $("#exist").hide();
                            }else{
                                score += 0;
                            }
                            if(q === 1){
                                me = 1;
                                $("#right").hide();
                                $("#wrong").show();
                                $("#check").hide();
                                $("#pass").hide();
                                $("#continue").show();
                                $("#empty").hide();
                                $("#exist").hide();
                            }
                        }
                        inputs[letter] = score;
                        let scored = 0;
                        if(me === 0){
                            scored = (10 * score);
                        }
                        $("#score1").text(score1);
                        $("#score2").text(score2);
                        $("#score3").text(score3);
                        $("#score4").text(score4);
                        if(pturn === 0){
                            score1 += scored;
                            $("#score1").text(score1);
                        }else if(pturn === 1){
                            score2 += scored;
                            $("#score2").text(score2);
                        }else if(pturn === 2){
                            score3 += scored;
                            $("#score3").text(score3);
                        }else if(pturn === 3){
                            score4 += scored;
                            $("#score4").text(score4);
                        }
                        final = score1 + score2 + score3 + score4;
                        if(final == (l * 10)){
                            winner = Math.max(score1, score2, score3, score4);
                            if(winner === score1){
                                $("#winner").text(name1 + " is the winner!!!");
                            }else if(winner === score2){
                                $("#winner").text(name2 + " is the winner!!!");
                            }else if(winner === score3){
                                $("#winner").text(name3 + " is the winner!!!");
                            }else if(winner === score4){
                                $("#winner").text(name4 + " is the winner!!!");
                            }
                            $("#winner").fadeIn(4000, function(){
                                $(document).click(function(){
                                    stopConfetti();
                                    $("#winner").fadeOut(2000, function(){
                                        $(".pagew").css("zIndex", 1);
                                        $("#gover").show(function(){
                                            $("#gover").animate({opacity: '1'}, 5000);
                                            $("#again").show(function(){
                                                $("#again").animate({opacity: '1'}, 5000);
                                            });
                                        }) 
                                    })
                                })
                            })
                            startConfetti();
                            $(".pagew").css("zIndex", -1);
                            $(".special").fadeOut(2000); 
                        }
                    }
                }else{
                    $("#empty").show();
                    $("#right").hide();
                    $("#wrong").hide();
                    $("#exist").hide();
                }
            });
            n = parseInt(nplayer);
            $("#continue").click(function(){
                $("#right").hide();
                $("#wrong").hide();
                $("#continue").hide();
                $("#check").show();
                $("#pass").show();
                $("#guess").val('');
                pturn++;
                if(pturn === n){
                    pturn = 0;
                }
                $("#turn").text(players[pturn]);
            });
            $("#pass").click(function(){
                $("#empty").hide();
                $("#right").hide();
                $("#wrong").hide();
                $("#exist").hide();
                $("#guess").val('');
                n = parseInt(nplayer);
                pturn++;
                if(pturn === n){
                    pturn = 0;
                }   
                $("#turn").text(players[pturn]);
            })
        }
        );
    });
    $("#again").click(function(){
        $("#gover").hide();
        $("#again").hide();
        $(".divs").remove();
        // del = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
        for(var del in inputs){
            if(inputs.hasOwnProperty(del)){
                delete inputs[del];
            }
        }
        game(name1, name2, name3, name4, nplayer);
    });        
}
$(document).ready(function(){
    $("#tjg").fadeIn(2000, function(){
        $("#tjg").fadeOut(1000);
        $("#present").fadeIn(2000, function(){
            $("#present").fadeOut(1000);
            $("#game").fadeIn(2000, function(){
                $("#game").fadeOut(1000);
                $("#open").fadeIn(2000, function(){
                    $('#any').show();
                    setInterval(function(){$("#any").fadeToggle()},500);
                    $(document).one('click', function(){
                        $("#open").fadeOut(1000, function(){
                            $("#playerw").fadeIn(2000);
                        });
                    })
                });
            });
        });
    });
    $("input[name='player']").click(function(){
        nplayer = $(this).val();
        if(nplayer === "1"){
            $("#playerw").fadeOut(1000, function(){
                $("#players").html("<input type='text' id='name1' maxlength='15' required placeholder='Player One...'>");
                $("#playerwr").fadeIn(1000);
            }); 
        }else if(nplayer === "2"){
            $("#playerw").fadeOut(1000, function(){
                $("#players").html("<input type='text' id='name1' maxlength='15' required placeholder='Player One...'><input type='text' id='name2' maxlength='15' required placeholder='Player Two...''>");
                $("#playerwr").fadeIn(1000);
            }); 
        }else if(nplayer === "3"){
            $("#playerw").fadeOut(1000, function(){
                $("#players").html("<input type='text' id='name1' maxlength='15' required placeholder='Player One...'><input type='text' id='name2' maxlength='15' required placeholder='Player Two...'><input type='text' id='name3' maxlength='15' required placeholder='Player Three...'>");
                $("#playerwr").fadeIn(1000);
            }); 
        }else if(nplayer === "4"){
            $("#playerw").fadeOut(1000, function(){
                $("#players").html('<input type="text" id="name1" maxlength="15" required placeholder="Player One..."><input type="text" id="name2" maxlength="15" required placeholder="Player Two..."><input type="text" id="name3" maxlength="15" required placeholder="Player Three..."><input type="text" id="name4" maxlength="15" required placeholder="Player Four...">');
                $("#playerwr").fadeIn(1000);
            }); 
        }
        
    });
    $("#submit").click(function(event){
        event.preventDefault();
    })
    $("#submit").one('click', function(){
        let name1 = $("#name1").val();
        let name2 = $("#name2").val();
        let name3 = $("#name3").val();
        let name4 = $("#name4").val(); 
        if(name1 == "" || name2 == "" || name3 == "" || name4 == ""){
            $("#your").show();
        }else{
            game(name1, name2, name3, name4, nplayer);   
        }
    });
})