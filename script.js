var wheel;
var spinBtn;
var value;
var oldVal;
var randNum;
var no = false;
var oldName;
var pickedNames = [];
const speed = 500;
const time = 1000 * 1;

const names = [
    "Debra",//1
    "Jessica",  //2
    "Miranda",  //3
    "Lauren", //4
    "Heather", //5
    "Sandi", //6
    "Amy", //7
    "Kristen",  //8
    // "Jammie",  //9
    // "April",  //10
    // "Michelle",  //11
    // "Misti",  //12
    // "Gigi",  //13
    // "Deanna",  //14
    // "Julie",  //15
    // "Jenny",  //16
    // "Christin",  //17
    // "SuAnn",  //18
    // "Britney",  //19
    // "Erin",  //20
    // "Mia",  //21
    // "Virginia",  //22
    // "Misti",  //23
    // "Lynda",  //24
    // "Melissa",  //25
    // "",  //26
    // "",  //27
    // "",  //28
    // "",  //29
    // "",  //30
];

var angle = (360 / names.length);

const bounds = [
    [68, 68 + (angle - 3)],//1
    [23, 23 + (angle - 3)],//2
    [338, 22],//3
    [293, 293 + (angle - 3)],//4
    [248, 248 + (angle - 3)],//5
    [203, 203 + (angle - 3)],//6
    [158, 158 + (angle - 3)],//7
    [113, 113 + (angle - 3)] //8
];

function startJS() {
    document.documentElement.style.setProperty('--angle', angle + "%");
    document.documentElement.style.setProperty('--deg', angle + "deg");
    createVals();
    for(let i = 0; i < $("#spinWheel").children().length; i++) {
        console.log($("#spinWheel").children().eq(i).attr('class'));
        $("#spinWheel").children().eq(i).css('clip-path', "polygon(0 0, " + (angle + 15) + "% 0, 100% 100%, 0 " + (angle + 15) + "%)");
        // if(Math.ceil(Math.random() * 2) == 1) {
        //     $("#spinWheel").children().eq(i).css('background-color', "red");
        // } else {
        //     $("#spinWheel").children().eq(i).css('background-color', "green");
        // }
    }

	wheel = document.getElementById('spinWheel');
    spinBtn = document.getElementById("spinBtn");
    value = Math.ceil(Math.random() * speed);

    // deleteVals();
};

function createVals() {
    deleteVals();
    for(let i = 0; i < names.length; i++) {
        var val = document.createElement("div");
        val.style = "--i: " + (i + 1) + ";";
        val.className = "value";
        var span = document.createElement("span");
        span.innerHTML = names[i];
        val.appendChild(span);
        $("#spinWheel").append(val);
    }
}

function deleteVals() {
    $("#spinWheel").html("");
}

function setWheel() {
    wheel = document.getElementById('spinWheel');
    spinBtn = document.getElementById("spinBtn");
    value = Math.ceil(Math.random() * speed);
}

function rotateWheel() {
    try {
        if(clicked == false) {
            randNum = Math.ceil(Math.random() * speed);
            if(value == 0) {
                value = randNum;
            }

            if (value + randNum > 360) {
                value = (value + randNum) - 360;
                if(value > 360) {
                    rotateWheel();
                }
            } else {
                randNum = Math.ceil(Math.random() * speed);
                value = (randNum);
                if(value > 360) {
                    rotateWheel();
                }
            }
            

            console.log("VALUE: " + value);
            console.log("OLD VAL: " + oldVal);
            console.log("RAND: " + randNum);
            console.log("GETROTATE: " + getRotation());
            console.log("---------");
            if(((oldVal != value) && (randNum != value)) || ((no == false)) && (getRotation() != oldVal)) {
                for(let i = 0; i < names.length; i++) {
                    if(bounds[i][0] < bounds[i][1]) {
                        if(value >= bounds[i][0] && value <= bounds[i][1]) {
                            if($("#spinWheel").children().eq(i).children().eq(0).val() != "selected") {
                                console.log("YES!^^^");
                                // value += randNum;
                                document.getElementById('spinWheel').style.transform = "rotate(" + value + "deg)";
                                setTimeout(function() {
                                    finishRotate();
                                }, time);
                                clicked = true;
                                oldVal = value;
                                no = false;
                                // rotateWheel();
                            } else {
                                // value = 0;
                                console.log("NO!^^^");
                                no = true;
                                oldVal = value;
                                rotateWheel();
                            }
                        } else {}
                    } else {
                        if((value >= bounds[i][0] && value < 0) || (value > 0 && value <= bounds[i][1])) {
                            if($("#spinWheel").children().eq(i).children().eq(0).val() != "selected") {
                                console.log("YES!2^^^");
                                // value += randNum;
                                document.getElementById('spinWheel').style.transform = "rotate(" + value + "deg)";
                                setTimeout(function() {
                                    finishRotate();
                                }, time);
                                clicked = true;
                                oldVal = value;
                                no = false;
                                // rotateWheel();
                            } else {
                                // value = 0;
                                console.log("NO!2^^^");
                                no = true;
                                oldVal = value;
                                rotateWheel();
                            }
                        }
                    }
                }
            } else {
                rotateWheel();
            }
        }
    } catch (error) {
        rotateWheel();
    }
}

function checkJoe() {
    console.log((getRotation() >= bounds[2][0]) + " && " + (getRotation() < 0));
    console.log((getRotation() > 0) + " && " + (getRotation() <= bounds[2][1]));
}

function finishRotate() {
    try {
        // console.log("ROTATION: " + getRotation());
        // checkJoe();
        for(let i = 0; i < names.length; i++) {
            if(bounds[i][0] < bounds[i][1]) {
                if(getRotation() >= bounds[i][0] && getRotation() <= bounds[i][1]) {
                    if($("#spinWheel").children().eq(i).children().eq(0).val() != "selected") {
                        console.log(names[i]);
                        setName(names[i]);
                        $("#spinWheel").children().eq(i).children().eq(0).css("text-decoration", "line-through");
                        $("#spinWheel").children().eq(i).children().eq(0).css("opacity", "25%");
                        $("#spinWheel").children().eq(i).children().eq(0).val("selected");
                        // names[i] = "";
                    } else {
                        rotateWheel();
                        console.log(names[i]);
                        setName(names[i]);
                    }
                }
            } else {
                if((getRotation() >= bounds[i][0] && getRotation() < 0) || (getRotation() > 0 && getRotation() <= bounds[i][1])) {
                    if($("#spinWheel").children().eq(i).children().eq(0).val() != "selected") {
                        console.log(names[i]);
                        setName(names[i]);
                        $("#spinWheel").children().eq(i).children().eq(0).css("text-decoration", "line-through");
                        $("#spinWheel").children().eq(i).children().eq(0).css("opacity", "25%");
                        $("#spinWheel").children().eq(i).children().eq(0).val("selected");
                        // names[i] = "";
                    } else {
                        rotateWheel();
                        console.log(names[i]);
                        setName(names[i]);
                    }
                }
            }
        }
    } catch (error) {
        rotateWheel();
    }
}

function setName(name) {
    if(oldName != name) {
        $("#nameList").append("<h3><li>" + name + "</li></h3>");
        pickedNames.push(name);
    }
    oldName = name;
}

function getRotation(){
    var el = document.getElementById('spinWheel');
    var st = window.getComputedStyle(el, null);
    var tm = st.getPropertyValue("-webkit-transform") ||
             st.getPropertyValue("-moz-transform") ||
             st.getPropertyValue("-ms-transform") ||
             st.getPropertyValue("-o-transform") ||
             st.getPropertyValue("transform") ||
             "none";
    if (tm != "none") {
      var values = tm.split('(')[1].split(')')[0].split(',');
      /*
      a = values[0];
      b = values[1];
      angle = Math.round(Math.atan2(b,a) * (180/Math.PI));
      */
      //return Math.round(Math.atan2(values[1],values[0]) * (180/Math.PI)); //this would return negative values the OP doesn't wants so it got commented and the next lines of code added
      var angle = Math.round(Math.atan2(values[1],values[0]) * (180/Math.PI));
      return (angle < 0 ? angle + 360 : angle); //adding 360 degrees here when angle < 0 is equivalent to adding (2 * Math.PI) radians before
    }
    return 0;
  }