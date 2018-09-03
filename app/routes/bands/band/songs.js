import Route from '@ember/routing/route';
import wait from 'rarwe/utils/wait';

	export default Route.extend({
		// async model() {
		// 	await wait(3000);
		// 	return this.modelFor('bands.band');
		// },
		model: function() {
			return this.modelFor('bands.band');
		},
		resetController(controller) {
			controller.setProperties({
				isAddingSong: false,
				newSongTitle: ''
			});
		},
		actions: {
			didTransition() {
			let band = this.modelFor('bands.band');
			document.title = `${band.name} songs - Rock & Roll`;
			},
		}
});