App = Ember.Application.create();

App.Router.map(function(){
	this.resource('about');
	this.resource('posts',function(){
		this.resource('post',{'path':':id'});
	});
	
})
App.PostsRoute =Ember.Route.extend({
	model:function(){
	return posts;
	/*	return $.getJSON('http://tomedale.net/api/get_recent_posts/?callback=?').then(function(data){
			return data.posts.map(function(post){
				post.body=post.content;
				return post;
			})
		})*/
	}
});
App.PostRoute =Ember.Route.extend({
	model:function(params){
		return posts.findBy('id',params.id);
		/*return $.getJSON('http://tomedate.net/api/get_recent_posts/?id='+params.id+'&callback=?').then(function(data){
			data.post.body=data.post.content;
			return data.post;
		});*/
	}
});

App.PostController = Ember.ObjectController.extend({
isEditing:false,
actions:{
	edit:function(){this.set('isEditing',true);},
	doneEditing:function(){this.set('isEditing',false);}
}
});
Ember.Handlebars.helper('format-date',function(date){
	return moment(date).fromNow();
});
var showdown=new Showdown.converter();
Ember.Handlebars.helper('format-markdown',function(data){
return new Handlebars.SafeString(showdown.makeHtml(data));
});
var posts=[{
	id:'1',
	title:'Blog Title 1',
	author:{name:'Aitrich User 1'},
	date:new Date('12-27-2012'),
	excerpt: 'Write dramatically less code with Ember\'s Handlebars integrated templates that update automatically when the underlying data changes.',
	body:'Welcome to Ember.js! This guide will take you through creating a simple application using Ember.js and briefly explain the core concepts behind the framework. This guide assumes you are already familiar with basic web technologies like JavaScript, HTML, and CSS and development technologies like your browser\'s web inspector.'
},
{
	id:'2',
	title:'Blog Title 2',
	author:{name:'Aitrich User 2'},
	date:new Date('12-10-2012'),
	excerpt: 'Write dramatically less code with Ember\'s Handlebars integrated templates that update automatically when the underlying data changes.',
	body:'Welcome to Ember.js! This guide will take you through creating a simple application using Ember.js and briefly explain the core concepts behind the framework. This guide assumes you are already familiar with basic web technologies like JavaScript, HTML, and CSS and development technologies like your browser\'s web inspector.'
}]