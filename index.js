
// 0->one 1->two 2->three 3->four

// wireTerminalCheck = [
//     { one: false, resistor: false },
//     { resistor: false, seven: false },
//     { eight: false, four: false },
//     { six:false, four: false},
//     { seven: false, five: false },
//     { eight: false, resistor: false },
//     { resistor: false, six: false },
//     { two: false, six: false },
//   ];
  
  terminalMap = {
    0: "one",
    1: "two",
    2: "three",
    3: "four",
    resistor: "resistor",
    4: "five",
    5: "six",
    6: "seven",
    7: "eight",
    8: "nine",
    9: "ten",
  };
  
  var xValues = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360];
  
  sequenceNum = 0;
  
  var rowData = { sno: 0, curr: 0, volts: 0 };
  localStorage.setItem("rowData", JSON.stringify(rowData));
  localStorage.setItem("fullScreen", false);
  
  
  var btnPressed = [false, false];
  
  setTimeout(() => {
  
    if(true){
      wireTerminalCheck = [
        { one: false, resistor: false },
        { resistor: false, seven: false },
        { eight: false, four: false },
        { four:false, five: false},
        { seven: false, five: false },
        { eight: false, resistor: false },
        { resistor: false, six: false },
        { two: false, six: false },
      ];
    }
    enablingSequence(sequenceNum);
  }, 2000);
  
  function enablingSequence(sequenceNum) {
    sessionStorage.setItem("circuitComplete",false)
    if(document.querySelector(".forward")){
      localStorage.setItem("type",false);
    }else{
      localStorage.setItem("type",true);
    }
  
    if (sequenceNum <= wireTerminalCheck.length) {
      for (var key in wireTerminalCheck[sequenceNum]) {
        elem = document.getElementsByClassName(key)[0];
        elem.style.stroke = "#FFFF00";
        elem.style.animationName = "pulse";
        elem.style.opacity = "1";
      }
    }
  }
  
  function trial(componentSom) {
    componentSomMap = terminalMap[componentSom];
    console.log(componentSomMap, 'componentSomMap');
    
    for (var key in wireTerminalCheck[sequenceNum])
      if (key == componentSomMap) wireTerminalCheck[sequenceNum][key] = true;
  
    elem = document.getElementsByClassName(componentSomMap)[0];
    elem.style.animationName = "none";
    elem.style.stroke = "none";

    dum = checkPair(sequenceNum);
    // console.log(dum)
    if (dum) {
      wireName = "wire" + (sequenceNum + 1);
      document.getElementById(wireName).style.transition = "display 10s";
      document.getElementById(wireName).style.display = "block";
      ++sequenceNum;
      if (sequenceNum < wireTerminalCheck.length) {
        enablingSequence(sequenceNum);
        // console.log('here')
      } else {
        // console.log('here')
        replacement();
      }
    }
  }
  
  function checkPair(sequenceNum) {
    count = 0;
    for (var key in wireTerminalCheck[sequenceNum])
      if (wireTerminalCheck[sequenceNum][key] == true) count++;
    // console.log(count, 'count')
    if (count == 2) return true;
    return false;
  }
  
  function keyPut() {
    document.getElementById("key1").style.animation = "none";
    document.getElementById("key1").onclick = function () {};
    document.getElementById("keyBase1").onclick = function () {};
  }
  
  function replacement() {
    document.getElementById("black-board").classList.add("hidden");
    document.getElementById("table-board").classList.add("replacement");
  
    document.getElementById("power-btn").style.stroke = "yellow";
    document.getElementById("power-btn").style.strokeWidth = "0.25%";
    document.getElementById("power-btn").onclick = function () {
      checkbtnPressed(0);
    };
  
    document.getElementById("key1").style.display = "block";
    document.getElementById("key1").classList.add("key-up-down");
    document.getElementById("key1").onclick = function () {
      checkbtnPressed(1);
      keyPut();
    };
    document.getElementById("keyBase1").onclick = function () {
      checkbtnPressed(1);
      keyPut();
    };
    localStorage.setItem("fullScreen", true);
  }
  
  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function checkbtnPressed(btnNum) {
    btnPressed[btnNum] = true;
    if (btnNum == 0) {
      document.getElementById("power").textContent = "05.00";
      document.getElementById("volt").textContent = "00.00";
      document.getElementById("power-btn").style.strokeWidth = "0%";
    }
    if (btnPressed[0] && btnPressed[1]) {
      
      sessionStorage.setItem("circuitComplete",true)
    }
  }

  

  
  
