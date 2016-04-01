Template.admin.events({
	'click #submit': function (event) {
		event.preventDefault();
		var show = $('#show-date').val();
		Router.go('whoscoming', {show: show});
	}
});