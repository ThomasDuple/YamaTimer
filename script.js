var ms = 0;
var s = 0;
var all = [];
var hold = false;
var holdtime = 0;
var holdgood = false;
var go = false;
var reltime = "";
var header = "<tr><td colspan=2 id='title'>Derniers temps</td></tr><tr><th id='um'>N°</th><th id='tps'>Temps</th></tr>";
var alltimes = "";

var moves = ["U", "D", "L", "R", "F", "B"];
var move = "";
var scramble = "";
var newscramble = true;

var white  = ["w", "w", "w", "w", "w", "w", "w", "w", "w"];
var orange = ["o", "o", "o", "o", "o", "o", "o", "o", "o"];
var green  = ["g", "g", "g", "g", "g", "g", "g", "g", "g"];
var red    = ["r", "r", "r", "r", "r", "r", "r", "r", "r"];
var blue   = ["b", "b", "b", "b", "b", "b", "b", "b", "b"];
var yellow = ["y", "y", "y", "y", "y", "y", "y", "y", "y"];

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key == " ") {
        hold = true;
    }

    if (e.key == " " && go) {
        go = false;
        hold = false;
        holdtime = 0;
        holdgood = 0;
        newscramble = true;
        if (ms < 10) {
            all.push(s + ".0" + ms);
        } else {
            all.push(s + "." + ms);
        }
        document.getElementById("ancient").style.display = "block";
        document.getElementById("melange").style.display = "block";
        document.getElementById("cubedisplay").style.display = "block";
        
        var timer = document.getElementById("actual");
        timer.classList.remove("bigdisplay");
    }

    if (e.key == "Escape") {
        ms = 0;
        s = 0;
        go = false;
        hold = false;
        holdtime = 0;
        holdgood = 0;
        document.getElementById('actual').style.color = '#fff';
        document.getElementById("ancient").style.display = "block";
        document.getElementById("melange").style.display = "block";
        document.getElementById("cubedisplay").style.display = "block";
        
        var timer = document.getElementById("actual");
        timer.classList.remove("bigdisplay");
    }

}

function keyUpHandler(e) {
    if (e.key == " ") {
        hold = false;
        if (holdgood) {
            go = true;
        } else {
            hold = 0;
            document.getElementById('actual').style.color = '#fff';
            holdtime = 0;
        }
    }
}

function inspection() {
    
}

function time() {
    if (go) {
        ms++;
        if (ms == 100) {
            ms = 0;
            s++;
        }
        
        document.getElementById("ancient").style.display = "none";
        document.getElementById("melange").style.display = "none";
        document.getElementById("cubedisplay").style.display = "none";

        var timer = document.getElementById("actual");
        timer.classList.add("bigdisplay");
    }

    if (ms < 10) {
        document.getElementById("actual").innerHTML = s + ".0" + ms;
    } else {
        document.getElementById("actual").innerHTML = s + "." + ms;
    }
}

function ancient() {
    alltimes = "";

    for (var i=0; i<all.length; i++) {
        reltime = all[i];

        alltimes = "<tr><td>" + (i+1) + "</td><td>" + reltime + "</td></tr>" + alltimes;

        document.getElementById("ancient").innerHTML = header + alltimes;
    }
}

function setScramble() {
    if (newscramble) {
        scramble = "";
        lm = 0;
        for (i=0; i<15; i++) {
            var m = Math.floor(Math.random() * moves.length);
    

            while (lm == m) {
                m = Math.floor(Math.random() * moves.length);
            }
            
            move = moves[m];

            md = Math.floor(Math.random() * 3);

            switch (md) {
                case 0:
                    movedir = "";
                    break
                case 1:
                    movedir = "'";
                    break
                case 2:
                    movedir = "2";
                    break
            }

            console.log("");
            console.log(move + movedir);
    
            scramble = scramble + " " + move + movedir;

            lm = m;

            cubeScramble(move, md);
        }
    
        console.log(scramble);
        document.getElementById("melange").innerHTML = scramble;

        row1 = "<tr><td></td><td></td><td></td><td class='" + white[0] + "'></td><td class='" + white[1] + "'></td><td class='" + white[2] + "'></tr>";
        row2 = "<tr><td></td><td></td><td></td><td class='" + white[3] + "'></td><td class='" + white[4] + "'></td><td class='" + white[5] + "'></tr>";
        row3 = "<tr><td></td><td></td><td></td><td class='" + white[6] + "'></td><td class='" + white[7] + "'></td><td class='" + white[8] + "'></tr>";
        row4 = "<tr><td class='" + orange[0] + "'></td><td class='" + orange[1] + "'></td><td class='" + orange[2] + "'><td class='" + green[0] + "'></td><td class='" + green[1] + "'></td><td class='" + green[2] + "'><td class='" + red[0] + "'></td><td class='" + red[1] + "'></td><td class='" + red[2] + "'><td class='" + blue[0] + "'></td><td class='" + blue[1] + "'></td><td class='" + blue[2] + "'></td></tr>";
        row5 = "<tr><td class='" + orange[3] + "'></td><td class='" + orange[4] + "'></td><td class='" + orange[5] + "'><td class='" + green[3] + "'></td><td class='" + green[4] + "'></td><td class='" + green[5] + "'><td class='" + red[3] + "'></td><td class='" + red[4] + "'></td><td class='" + red[5] + "'><td class='" + blue[3] + "'></td><td class='" + blue[4] + "'></td><td class='" + blue[5] + "'></td></tr>";
        row6 = "<tr><td class='" + orange[6] + "'></td><td class='" + orange[7] + "'></td><td class='" + orange[8] + "'><td class='" + green[6] + "'></td><td class='" + green[7] + "'></td><td class='" + green[8] + "'><td class='" + red[6] + "'></td><td class='" + red[7] + "'></td><td class='" + red[8] + "'><td class='" + blue[6] + "'></td><td class='" + blue[7] + "'></td><td class='" + blue[8] + "'></td></tr>";
        row7 = "<tr><td></td><td></td><td></td><td class='" + yellow[0] + "'></td><td class='" + yellow[1] + "'></td><td class='" + yellow[2] + "'></tr>";
        row8 = "<tr><td></td><td></td><td></td><td class='" + yellow[3] + "'></td><td class='" + yellow[4] + "'></td><td class='" + yellow[5] + "'></tr>";
        row9 = "<tr><td></td><td></td><td></td><td class='" + yellow[6] + "'></td><td class='" + yellow[7] + "'></td><td class='" + yellow[8] + "'></tr>";
    
        document.getElementById("cubedisplay").innerHTML = row1 + row2 + row3 + row4 + row5 + row6 + row7 + row8 + row9;

        
        newscramble = false;
    }
}

function cubeScramble(movement, direction) {
    switch (direction) {
        case 0:
            turn = 1;
            break;
        case 1:
            turn = 3;
            break;
        case 2:
            turn = 2;
            break;
    }

    if (movement == "U") {
        for (y=0; y<turn; y++) {
            stock = green[0];
            green[0] = red[0];
            red[0] = blue[0];
            blue[0] = orange[0];
            orange[0] = stock;

            stock = green[1];
            green[1] = red[1];
            red[1] = blue[1];
            blue[1] = orange[1];
            orange[1] = stock;
            
            stock = green[2];
            green[2] = red[2];
            red[2] = blue[2];
            blue[2] = orange[2];
            orange[2] = stock;

            stock = white[0];
            white[0] = white[6];
            white[6] = white[8];
            white[8] = white[2];
            white[2] = stock;

            stock = white[1];
            white[1] = white[3];
            white[3] = white[7];
            white[7] = white[5];
            white[5] = stock;
        }
        console.log(green[0] + " " + green[1] + " " + green[2]);
        console.log(green[3] + " " + green[4] + " " + green[5]);
        console.log(green[6] + " " + green[7] + " " + green[8]);
        
    }
    if (movement == "D") {
        for (y=0; y<turn; y++) {
            stock = green[6];
            green[6] = orange[6];
            orange[6] = blue[6];
            blue[6] = red[6];
            red[6] = stock;

            stock = green[7];
            green[7] = orange[7];
            orange[7] = blue[7];
            blue[7] = red[7];
            red[7] = stock;
            
            stock = green[8];
            green[8] = orange[8];
            orange[8] = blue[8];
            blue[8] = red[8];
            red[8] = stock;

            stock = yellow[0];
            yellow[0] = yellow[6];
            yellow[6] = yellow[8];
            yellow[8] = yellow[2];
            yellow[2] = stock;

            stock = yellow[1];
            yellow[1] = yellow[3];
            yellow[3] = yellow[7];
            yellow[7] = yellow[5];
            yellow[5] = stock;
        }
        console.log(green[0] + " " + green[1] + " " + green[2]);
        console.log(green[3] + " " + green[4] + " " + green[5]);
        console.log(green[6] + " " + green[7] + " " + green[8]);
    }
    if (movement == "L") {
        for (y=0; y<turn; y++) { 
            stock = green[0];
            green[0] = white[0];
            white[0] = blue[8];
            blue[8] = yellow[0];
            yellow[0] = stock;

            stock = green[3];
            green[3] = white[3];
            white[3] = blue[5];
            blue[5] = yellow[3];
            yellow[3] = stock;
            
            stock = green[6];
            green[6] = white[6];
            white[6] = blue[2];
            blue[2] = yellow[6];
            yellow[6] = stock;

            stock = orange[0];
            orange[0] = orange[6];
            orange[6] = orange[8];
            orange[8] = orange[2];
            orange[2] = stock;

            stock = orange[1];
            orange[1] = orange[3];
            orange[3] = orange[7];
            orange[7] = orange[5];
            orange[5] = stock;
        }
        console.log(green[0] + " " + green[1] + " " + green[2]);
        console.log(green[3] + " " + green[4] + " " + green[5]);
        console.log(green[6] + " " + green[7] + " " + green[8]);
    }
    if (movement == "R") {
        for (y=0; y<turn; y++) { 
            stock = green[2];
            green[2] = yellow[2];
            yellow[2] = blue[6];
            blue[6] = white[2];
            white[2] = stock;

            stock = green[5];
            green[5] = yellow[5];
            yellow[5] = blue[3];
            blue[3] = white[5];
            white[5] = stock;
            
            stock = green[8];
            green[8] = yellow[8];
            yellow[8] = blue[0];
            blue[0] = white[8];
            white[8] = stock;

            stock = red[0];
            red[0] = red[6];
            red[6] = red[8];
            red[8] = red[2];
            red[2] = stock;

            stock = red[1];
            red[1] = red[3];
            red[3] = red[7];
            red[7] = red[5];
            red[5] = stock;
        }
        console.log(green[0] + " " + green[1] + " " + green[2]);
        console.log(green[3] + " " + green[4] + " " + green[5]);
        console.log(green[6] + " " + green[7] + " " + green[8]);
    }
    if (movement == "F") {
        for (y=0; y<turn; y++) { 
            stock = white[6];
            white[6] = orange[8];
            orange[8] = yellow[2];
            yellow[2] = red[0];
            red[0] = stock;

            stock = white[7];
            white[7] = orange[5];
            orange[5] = yellow[1];
            yellow[1] = red[3];
            red[3] = stock;
            
            stock = white[8];
            white[8] = orange[2];
            orange[2] = yellow[0];
            yellow[0] = red[6];
            red[6] = stock;

            stock = green[0];
            green[0] = green[6];
            green[6] = green[8];
            green[8] = green[2];
            green[2] = stock;

            stock = green[1];
            green[1] = green[3];
            green[3] = green[7];
            green[7] = green[5];
            green[5] = stock;
        }
        console.log(green[0] + " " + green[1] + " " + green[2]);
        console.log(green[3] + " " + green[4] + " " + green[5]);
        console.log(green[6] + " " + green[7] + " " + green[8]);
    }
    if (movement == "B") {
        for (y=0; y<turn; y++) { 
            stock = white[0];
            white[0] = red[2];
            red[2] = yellow[8];
            yellow[8] = orange[6];
            orange[6] = stock;

            stock = white[1];
            white[1] = red[5];
            red[5] = yellow[7];
            yellow[7] = orange[3];
            orange[3] = stock;
            
            stock = white[2];
            white[2] = red[8];
            red[8] = yellow[6];
            yellow[6] = orange[0];
            orange[0] = stock;

            stock = blue[0];
            blue[0] = blue[6];
            blue[6] = blue[8];
            blue[8] = blue[2];
            blue[2] = stock;

            stock = blue[1];
            blue[1] = blue[3];
            blue[3] = blue[7];
            blue[7] = blue[5];
            blue[5] = stock;
        }
        console.log(green[0] + " " + green[1] + " " + green[2]);
        console.log(green[3] + " " + green[4] + " " + green[5]);
        console.log(green[6] + " " + green[7] + " " + green[8]);
    }
}

function display() {
    time();
    ancient();

    setScramble();

    if (hold) {
        holdtime++;
        ms = 0;
        s = 0;
    }
    if (holdtime >= 30) {
        holdgood = true;
        document.getElementById('actual').style.color = '#2d2';
    } else if (hold) {
        holdgood = false;
        document.getElementById('actual').style.color = '#ee0';
    }

}
setInterval(display, 10);