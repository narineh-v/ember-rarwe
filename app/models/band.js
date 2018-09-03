import DS from 'ember-data';

const { Model, attr, hasMany } = DS;

export default Model.extend({
	name: attr('string'),
	description: attr('string'),
	songs: hasMany(),
	// init() {
	// this._super(...arguments);
	// 	if (!this.songs) {
	// 		this.set('songs', []);
	// 	}
	// },

	// slug: computed('name', function() {
	// 	return dasherize(this.name);
	// })
});