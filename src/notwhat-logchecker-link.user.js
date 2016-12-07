// ==UserScript==

// @name           NotWhat Logchecker Link
// @author         SavageCore
// @namespace      https://savagecore.eu
// @description    Inserts a logchecker.php link in main menu.
// @include        http*://*notwhat.cd/*
// @version        0.1.0
// @grant          GM_getValue
// @grant          GM_setValue
// @downloadURL    https://github.com/SavageCore/notwhat-logchecker-link/raw/master/src/notwhat-logchecker-link.user.js

/*	global document GM_getValue	GM_setValue window */

/* eslint new-cap: "off", no-redeclare: "off" */

// ==/UserScript==

var position = GM_getValue('position', 'userinfo_major');
if (window.location.href.match('user.php\\?action=edit&userid=')) {
	var lastRow = document.getElementById('site_tooltips_tr');
	var selectHTML = '<tr id="notwhat_logchecker_tr">\n\t<td class="label tooltip"><strong>Logchecker link location</strong></td>\n<td>\n\t<select name="notwhat_logchecker" id="notwhat_logchecker">\n\t<option value="mainMenu">Main Menu</option>\n<option value="userinfo">User Info</option>\n<option value="userinfo_major">User Info Major</option>\n</select>\n</td>\n</tr>';
	lastRow.insertAdjacentHTML('afterend', selectHTML);

	var select = document.getElementById('notwhat_logchecker');
	for (var i = 0; i < select.options.length; i++) {
		if (select.options[i].value === position) {
			select.options[i].selected = 'selected';
		}
	}
	select.onchange = function (e) {
		switch (e.target.value) {
			case 'mainMenu':
				GM_setValue('position', 'mainMenu');
				var element = document.getElementById('menu').children[1];
				updateLink(element);
				break;
			case 'userinfo':
				GM_setValue('position', 'userinfo');
				var element = document.getElementById('userinfo_minor');
				updateLink(element);
				break;
			case 'userinfo_major':
				GM_setValue('position', 'userinfo_major');
				var element = document.getElementById('userinfo_major');
				updateLink(element);
				break;
			default:
				GM_setValue('position', 'mainMenu');
				var element = document.getElementById('menu').children[1];
				updateLink(element);
		}
	};
}

switch (position) {
	case 'mainMenu':
		var menu = document.getElementById('menu').children[1];
		appendLink(menu);
		break;
	case 'userinfo':
		var menu = document.getElementById('userinfo_minor');
		appendLink(menu);
		break;
	case 'userinfo_major':
		var menu = document.getElementById('userinfo_major');
		appendLink(menu);
		break;
	default:
		var menu = document.getElementById('userinfo_minor');
		appendLink(menu);
}

function appendLink(menu) {
	var logcheckerA = createLink('Logchecker', 'logchecker.php');
	var logcheckerLi = createLi('logchecker', logcheckerA);
	menu.appendChild(logcheckerLi);
}

function createLi(x, y) {
	var li = document.createElement('li');
	li.id = 'nav_' + x;
	li.appendChild(y);
	return li;
}

function createLink(x, y) {
	var a = document.createElement('a');

	a.innerHTML = x;
	a.href = y;
	return a;
}

function removeLi() {
	var element = document.getElementById('nav_logchecker');
	element.parentNode.removeChild(element);
}

function updateLink(element) {
	removeLi();
	var logchecker = createLink('Logchecker', 'logchecker.php');
	var logcheckerLi = createLi('logchecker', logchecker);
	element.appendChild(logcheckerLi);
}
