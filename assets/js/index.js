function checkinput(input, string){
    let length = string.length;
    let present = 0;
    let positions = [0];
    for(i = 0; i < length; i++){
        if(input === string[i]){
            present++;
            positions[0] = present;
            positions.push(i);
        }
    }
    return positions;
}

$(document).on("ready", function(){
    $("#tjg").fadeIn(2000, function(){
        $("#tjg").fadeOut(1000);
        $("#present").fadeIn(2000, function(){
            $("#present").fadeOut(1000);
            $("#game").fadeIn(2000, function(){
                $("#game").fadeOut(1000);
                $("#open").fadeIn(2000, function(){
                    $("#any").show();
                    setInterval(function(){$("#any").fadeToggle()},500);
                    $(document).one("click", function(){
                        $("#open").fadeOut(1000, function(){
                            $("#playerw").fadeIn(2000);
                        });
                    })
                });
            });
        });
    });
    $("input[name='player']").on("click", function(){
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
    $("#submit").on("click", function(){
        name1 = $("#name1").val();
        name2 = $("#name2").val();
        name3 = $("#name3").val();
        name4 = $("#name4").val(); 
        if(name1 == "" || name2 == "" || name3 == "" || name4 == ""){
            $("#your").show();
        }else{
            $("#submit").prop("disabled", true);

            function game(){

                let inputs = {};
                //Get Random Name
                let namelist = listed.length;
                let m = Math.floor(Math.random() * namelist);
                let names = listed[m].toUpperCase();
                let l = names.length;
                let final = l * 10;
                let n = parseInt(nplayer);
                pturn = 0; // Current Player Turn

                // Create Dashes
                for(i = 0; i < l; i++){
                    $("#namew").append('<div class="divs"></div>')
                };

                $("#playerwr").fadeOut(1000, function(){

                    //Create Players Name and Scores
                    let players = [name1, name2, name3, name4];
                    $("#turn").text(players[0]);
                    score1 = score2 = score3 = score4 = total = 0;
                    if(n === 1){
                        $("#player1").show();
                    }else if(n === 2){
                        $("#player1, #player2").show();
                    }else if(n === 3){
                        $("#player1, #player2, #player3").show();
                    }else if(n === 4){
                        $("#player1, #player2, #player3, #player4").show();
                    }
                    for(i = 0; i < n; i++){
                        $(".pname").eq(i).text(players[i]);
                    }

                    $(".special").fadeIn(3000, function(){
                        $("#check").on("click", function(){
                            let letterinput = $("#guess").val().toUpperCase();
                            $("#guess").attr("readonly", true);

                            //If input is empty
                            if(letterinput == ''){
                                $("#empty").show();
                                $("#right, #wrong, #exist").hide();
                                $("#guess").attr("readonly", false);
                            }else{
                                //Check if input has been picked before
                                if(inputs[letterinput] == undefined){
                                    let test = checkinput(letterinput, names);
                                    inputs[letterinput] = test[0];
                                    if(test[0] == 0){
                                        $("#wrong, #continue").show();
                                        $("#form, #right, #empty, #exist").hide();
                                    }else{
                                        //Insert inputs in divs
                                        for(p = 1; p < test.length; p++){
                                            $(".divs").eq(test[p]).text(letterinput);
                                        }
                                        $("#right, #continue").show();
                                        $("#form, #wrong, #empty, #exist").hide();
                                        
                                        //Display and Calculation of Scores
                                        score = 10 * test[0];
                                        if(pturn == 0){
                                            score1 += score;
                                            $("#score1").text(score1);
                                        }else if(pturn == 1){
                                            score2 += score;
                                            $("#score2").text(score2);
                                        }else if(pturn == 2){
                                            score3 += score;
                                            $("#score3").text(score3);
                                        }else if(pturn == 3){
                                            score4 += score;
                                            $("#score4").text(score4);
                                        }

                                        total = score1 + score2 + score3 + score4;
                                        if(total === final){
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
                                                setTimeout(function(){
                                                    stopConfetti();
                                                    $("#winner").fadeOut(2000, function(){
                                                        $("#gover").show(function(){
                                                            $(".pagew").css("zIndex", 1);
                                                            $("#gover").animate({opacity: '1'}, 5000);
                                                            $("#over>center>button").show(function(){
                                                                $("#over>center>button").animate({opacity: '1'}, 5000);
                                                                $("#again").prop("disabled", false);
                                                            });
                                                        }) 
                                                    })
                                                }, 3000)
                                            })
                                            startConfetti();
                                            $(".pagew").css("zIndex", -1);
                                            $(".special").fadeOut(2000);
                                        }
                                    }
                                }else{
                                    $("#empty, #right, #wrong").hide();
                                    $("#exist").show();
                                    $("#guess").attr("readonly", false);
                                }
                            }
                        });

                        $("#continue").on("click", function(){
                            $("#right, #wrong, #continue").hide();
                            $("#form").show();
                            $("#guess").attr("readonly", false);
                            $("#guess").val('');
                            pturn++;
                            if(pturn == n){
                                pturn = 0;
                            }
                            $("#turn").text(players[pturn]);
                        });

                        $("#pass").on("click", function(){
                            $("#empty, #right, #wrong, #exist").hide();
                            $("#guess").val('');
                            pturn++;
                            if(pturn == n){
                                pturn = 0;
                            }
                            $("#turn").text(players[pturn]);
                        });

                    });
                });
            }
            game();
            $("#again").on("click", function(){
                $("#score1, #score2, #score3, #score4").text(0);
                $("#over>center>button, #gover").css("opacity", 0);
                $("#guess").attr("readonly", false);
                $("#over>center>button, #gover, #empty, #right, #wrong, #exist, #continue").hide();
                $("#form").show();
                $("#guess").val('');
                $(".divs").remove();
                game();
            });
        }
    });
})