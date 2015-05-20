import Ember from 'ember';
import Folks from 'dummy/mixins/folks';

export default Ember.Route.extend(Folks, {
  model() {
    return this.get('bastion');
  },
  setupController(controller, model) {
    this._super(...arguments);
    controller.set('it', model);
  }
});
