import '../css/main.css';
import $ from 'jquery';
import debounce from 'lodash/debounce';

let count = 0;
function updateCounter() {
	count += 1;
	return count;
}

$(function() {
    $('body').append("<div id='logo'></div>");
	$('body').append('<p>Holberton Dashboard</p>');
	$('body').append('<p>Dashboard data for the students</p>');
	$('body').append('<button>Click here to get started</button>');
	$('body').append("<p id='count'></p>");
	$('body').append('<p>Copyright - Holberton School</p>');

    let debouncing = debounce(() => {
		let count = updateCounter();
		$('#count').text(`${count} clicks on the button`);
	});
	$('button').on('click', debouncing);
});
