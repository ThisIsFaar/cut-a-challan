const doors = document.querySelectorAll('.person');
const scoreBoard = document.querySelector('.score');
const persons = document.querySelectorAll('.person');

var person_is_present;

let lastDoor;
let lastPerson;
let timeUp = false;
let score = 0;
let star = 3;
var maskStatus;
var gameControl;
var typeFunction;
function randomTime(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

function randomDoor(doors) {
	const idx = Math.floor(Math.random() * doors.length);

	const door = doors[idx];
	if (door === lastDoor) {
		console.log('Ah nah thats the same one bud');
		return randomDoor(doors);
	}
	lastDoor = door;
	var doorObj = {
		doorNumber: idx,
		door: door
	}
	return doorObj;
}

function randomPerson() {
	var person = Math.round(Math.random() * (3 - 1) + 1);
	if (person === lastPerson) {
		console.log('Ah nah thats the same one bud');
		return randomPerson();
	}
	lastPerson = person;
	return person;
}

function maskCheck() {
	return Math.round(Math.random() * (1 - 0) + 0);
}

function peep() {
	const time = randomTime(1000, 2000);
	const door = randomDoor(doors);
	var doorNumber = door.doorNumber;
	var personImageNumber = randomPerson()
	maskStatus = maskCheck()
	document.getElementsByClassName("person")[doorNumber].style.background = `url(img/person${personImageNumber}${maskStatus}.png) bottom center no-repeat`;

	door.door.classList.add('opacity_changer');
	person_is_present = document.querySelectorAll('.opacity_changer')
	person_is_present.forEach(person => person.addEventListener('click', challan));
	gameControl = setTimeout(() => {
		door.door.classList.remove('opacity_changer');
		if (!timeUp) peep();
	}, time);
}

function startGame() {
	timeUp = false;
	score = 0;
	peep();
	setTimeout(() => timeUp = true, 160000)
}


function howToPlay() {
	document.getElementById("welcome_m").style.display = "none";
	document.getElementById("tutorial_1").style.display = "block";
	typeFunction = setTimeout(() => {
		if (i < txt.length) {
			document.getElementById("demo").innerHTML += txt.charAt(i);
			i++;
			setTimeout(typeWriter, speed);
		}
	}, 2000);
}

function challan(e) {
	if (!e.isTrusted) return; // For Checking Trusted Click's
	if (maskStatus === 0) {
		document.getElementById("cash_sound").play()
		score++;
		document.getElementById("target_bar_fill").style.height = `${21.3*score}px`;
		document.getElementById("target_bar_fill").innerText = `₹${2*score}000`;
		if (score === 20) {
			document.getElementById("won_sound").play()
			clearTimeout(gameControl);
			setTimeout(() => {
				gameWon()
			}, 3000);
		}
	} else {
		star--;
    if (star === 2) {
			document.getElementById("star_remove_sound").play()
			document.getElementById("star3").style.display = "none";
		} else if (star === 1) {
			document.getElementById("star_remove_sound").play()
			document.getElementById("star2").style.display = "none";
		} else if (star === 0) {
			document.getElementById("star1").style.display = "none";
			document.getElementById("bg_music").pause()
			document.getElementById("star_remove_sound").play()
			document.getElementById("loss_sound").play()
			gameOver()

		}
	}
	this.classList.remove('opacity_changer');
	person_is_present.forEach(person => person.removeEventListener('click', challan));
}

function gameOver() {
	clearTimeout(gameControl);
	document.getElementById("game_over_modal").style.display = "block";
}

function gameWon() {

	document.getElementById("game_won_modal").style.display = "block";
}

function restartGame() {
    clearTimeout(gameControl);
    let loopingPersons = document.querySelectorAll(".person")
    for (let index = 0; index < loopingPersons.length; index++) {
        loopingPersons[index].style.background = "";
    }
    star = 3;
    document.getElementById("star1").style.display = "block";
    document.getElementById("star2").style.display = "block";
    document.getElementById("star3").style.display = "block";
    document.getElementById("target_bar_fill").style.height = "0px";
	document.getElementById("welcome_m").style.display = "none";
	document.getElementById("tutorial_1").style.display = "none";
	document.getElementById("controls_modal").style.display = "none";
	document.getElementById("cut_challan_modal").style.display = "none";
	document.getElementById("insignia_modal").style.display = "none";
	document.getElementById("game_won_modal").style.display = "none";
	document.getElementById("game_over_modal").style.display = "none";
	document.getElementById("countdown_sound").play()

	document.getElementById("countdown_modal").style.display = "block";
	setTimeout(() => {
		document.getElementById("countdown_modal").style.display = "none";
		startGame()
	}, 5500);
}

function BgMusicControl() {
	var musicBtn = document.getElementById("music_bg");
    musicBtn.innerHTML == "";
	if (musicBtn.dataset.status === "muted") {
        console.log(musicBtn.innerHTML);
		musicBtn.innerHTML = "<i class='fas fa-music'></i>";
		document.getElementById("bg_music").play();
		document.getElementById("music_bg").setAttribute("data-status", "unmuted")
	} else {
        console.log(musicBtn.innerHTML);
		musicBtn.innerHTML = "<i class='fas fa-volume-mute'></i>";
		musicBtn.dataset.status = "muted";
		document.getElementById("bg_music").pause();
	}
}

var i = 0;
var txt = "You are playing a role of a Police Officer in a City where a contagious virus is spreading so fast. your duty is assigned to a city to stop spreading this virus as far as we can by taking precautions and your task is to cut a challan on those people who don't wear the mask";
var speed = 30;

function typeWriter() {
    let temp = getComputedStyle(document.getElementById("tutorial_1"));
	if (temp.display === "block") {
        if (i < txt.length) {
            document.getElementById("typing_sound").play()
            document.getElementById("demo").innerHTML += txt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            document.getElementById("typing_sound").pause()
        }
    }

}

function nextTutorial() {
	document.getElementById("typing_sound").pause();
	document.getElementById("welcome_m").style.display = "none";
	document.getElementById("tutorial_1").style.display = "none";
	document.getElementById("controls_modal").style.display = "block";
}

function CutChallanTutorial() {
	document.getElementById("welcome_m").style.display = "none";
	document.getElementById("tutorial_1").style.display = "none";
	document.getElementById("controls_modal").style.display = "none";
	document.getElementById("cut_challan_modal").style.display = "block";
}

function InsigniaTutorial() {
	document.getElementById("welcome_m").style.display = "none";
	document.getElementById("tutorial_1").style.display = "none";
	document.getElementById("tutorial_1").style.display = "none";
	document.getElementById("cut_challan_modal").style.display = "none";
	document.getElementById("insignia_modal").style.display = "block";
}
var virusSoundIn = document.querySelectorAll(".virus_sound_hover")

for (let index = 0; index < virusSoundIn.length; index++) {
	virusSoundIn[index].addEventListener("mouseover", mouseOver);
}

function mouseOver() {
	document.getElementById("virus_sound").play();
}