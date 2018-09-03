import Controller from '@ember/controller';
import { empty, sort } from '@ember/object/computed';
import { computed } from '@ember/object';

export default Controller.extend({
	isAddingSong: false,
	newSongName: '',
	isAddButtonDisabled: empty('newSongName'),
	sortBy: 'ratingDesc',
	searchTerm: '',
	queryParams: {
		sortBy: 'sort',
		searchTerm: 's',
	},
	sortProperties: computed('sortBy', function() {
		let options = {
			ratingDesc: ['rating:desc', 'title:asc'],
			ratingAsc: ['rating:asc', 'title:asc'],
			titleDesc: ['title:desc'],
			titleAsc: ['title:asc']
		};
		return options[this.sortBy];
	}),
	matchingSongs: computed('model.songs.@each.title', 'searchTerm', function() {
		let searchTerm = this.searchTerm.toLowerCase();
		return this.model.get('songs').filter((song) => {
			return song.title.toLowerCase().includes(searchTerm);
		});
	}),
	sortedSongs: sort('matchingSongs', 'sortProperties'),
	actions: {
		addSong() {
			this.set('isAddingSong', true);
		},
		cancelAddSong() {
			this.set('isAddingSong', false);
		},
		async saveSong(event) {
			event.preventDefault();
			let newSong = this.get('store').createRecord('song', {
				title: this.get('this.newSongName'),
				band: this.model
			});
			await newSong.save();
			// let newSong = Song.create({title: this.newSongName});
			// this.model.songs.pushObject(newSong);
			this.set('newSongName', '');
		},
		updateRating(song, rating) {
			song.set('rating', song.rating === rating ? 0 : rating);
			return song.save();
		},
		// updateSortBy(sortBy) {
		// 	this.set('sortBy', sortBy);
		// }
	}
});
