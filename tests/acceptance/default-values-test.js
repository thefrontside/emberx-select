import xSelectInteractor from 'emberx-select/test-support/interactor';
import pageInteractor from 'dummy/tests/interactors/test-page';
import { expect } from 'chai';
import { visit } from '@ember/test-helpers';
import { describe, it, beforeEach } from 'mocha';
import { setupApplicationTest } from 'ember-mocha';

describe('XSelect: Default Values', function() {
  let page = new pageInteractor();
  let makeSelect = new xSelectInteractor('.spec-car-make');
  let modelSelect = new xSelectInteractor('.spec-car-model');
  let trimSelect = new xSelectInteractor('.spec-car-trim');
  let modelMakeSelect = new xSelectInteractor('.spec-autopopulated-make-field');
  let quantitySelect = new xSelectInteractor('.spec-autopopulated-quantity-field');

  setupApplicationTest();

  describe('Initializing with default values', function() {
    beforeEach(async function() {
      await visit('test-bed/default-value');
    });

    it('initializes with defaults if no explicit value is present', async () => {
      await page.when(() => expect(page.carMakeText).to.equal('Selected Make: Honda'));
    });

    it('sets the selected property on the correct default option', async () => {
      await makeSelect.when(() => expect(makeSelect.options(1).isSelected).to.equal(true));
    });

    it('can set a default to the first option in a dynamic list', async () => {
      await page.when(() => expect(page.carModelText).to.equal('Selected Model: Fit'));
    });

    it('sets the selected property on the correct default option', async () => {
      await modelSelect.when(() => expect(modelSelect.options(0).isSelected).to.equal(true));
    });

    it('initializes with the correct explicit value if one is present', async () => {
      await modelMakeSelect.when(() => expect(modelMakeSelect.options(2).isSelected).to.equal(true));
    });

    it('sets the selected property on the correct explicity value option', async () => {
      await modelMakeSelect.when(() => expect(modelMakeSelect.options(2).text).to.equal('Ford'));
    });

    it('does not set the selected property on the default option', async () => {
      await modelMakeSelect.when(() => expect(modelMakeSelect.options(0).isSelected).to.equal(false));
    });

    it('sets the selected property to the explicitly set value', async () => {
      await quantitySelect.when(() => {
        expect(quantitySelect.options(5).text).to.equal('0');
        expect(quantitySelect.options(5).isSelected).to.equal(true);
      });
    });

    it('initializes with the correct explicit value if one is present even if that value is falsy', async () => {
      await page.when(() => expect(page.selectedQuantityText).to.equal('Selected Quantity: 0'));
    });

    it('sets the selected property on the correct default option', async () => {
      await trimSelect.when(() => {
        expect(trimSelect.options(0).isSelected).to.equal(true);
        expect(trimSelect.options(0).text).to.equal('Sport');
      });
    });

    describe('Changing the value on fields with default values', function() {
      beforeEach(async () => {
        await makeSelect.select('Toyota');
      });

      it('updates the value', async () => {
        await makeSelect.when(() => {
          expect(makeSelect.options(2).isSelected).to.equal(true);
          expect(makeSelect.options(2).text).to.equal('Toyota');
        });
      });

      it('removes the selected property on the previously selected option', async () => {
        await makeSelect.when(() => {
          expect(makeSelect.options(1).isSelected).to.equal(false);
          expect(makeSelect.options(1).text).to.equal('Honda');
        });
      });

      it('reevalutates the dynamic default value', async () => {
        await makeSelect.when(() => {
          expect(modelSelect.options(0).isSelected).to.equal(true);
          expect(modelSelect.options(0).text).to.equal('Camry');
        });
      });
    });
  });
});
