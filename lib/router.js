Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	//waitOn: function() {
	//	return [Meteor.subscribe("allUsers")];
	//}
});

Router.route('/', {name: 'tickets'});