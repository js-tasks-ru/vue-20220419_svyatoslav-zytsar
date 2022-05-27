const MeetupForm = require(global.getSolutionPath('components/MeetupForm')).default;
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import MeetupAgendaItemForm from '../components/MeetupAgendaItemForm';

const getInputByName = (wrapper, name) => wrapper.get(`[name=${name}]`);

describe('forms/MeetupForm', () => {
  describe('MeetupForm', () => {
    let wrapper;
    let meetup;
    const submitText = 'Submit-Test-Text';

    beforeEach(() => {
      meetup = {
        id: 0,
        title: 'TheTitle',
        description: 'Short Description',
        image: 'image42.jpeg',
        date: Date.UTC(2020, 3 - 1, 1),
        place: 'Test Place',
        agenda: [
          {
            id: 0,
            startsAt: '05:00',
            endsAt: '10:00',
            type: 'registration',
            title: null,
            description: null,
            speaker: null,
            language: null,
          },
          {
            id: 1,
            startsAt: '10:00',
            endsAt: '11:00',
            type: 'opening',
            title: null,
            description: null,
            speaker: null,
            language: null,
          },
          {
            id: 2,
            startsAt: '11:00',
            endsAt: '12:00',
            type: 'other',
            title: 'Title',
            description: 'Description',
            speaker: null,
            language: null,
          },
        ],
      };

      wrapper = mount(MeetupForm, {
        props: {
          meetup,
          submitText,
        },
      });
    });

    it('MeetupForm должен выводить кнопку сабмита с текстом из параметра submitText', () => {
      expect(wrapper.get('[data-test=submit]').text()).toBe(submitText);
    });

    it('MeetupForm должен выводить поля со значениями из митапа параметра meetup', () => {
      expect(getInputByName(wrapper, 'title').element.value).toBe(meetup.title);
      expect(getInputByName(wrapper, 'date').element.value).toBe(new Date(meetup.date).toISOString().substr(0, 10));
      expect(getInputByName(wrapper, 'place').element.value).toBe(meetup.place);
      expect(getInputByName(wrapper, 'description').element.value).toBe(meetup.description);
    });

    // Тест убран, чтобы не зависеть от работы с изображением в разных варианта реализации загрузки
    // it('MeetupForm должен выводить текущее изображение митапа в meetup.image через preview в UiImageUploader', () => {
    //   expect(wrapper.getComponent(UiImageUploader).props('preview')).toBe(meetup.image);
    // });

    it('MeetupForm должен порождать событие cancel при клике на кнопку отмены', async () => {
      await wrapper.get('[data-test=cancel]').trigger('click');
      expect(wrapper.emitted('cancel')).toBeDefined();
    });

    it('MeetupForm должен выводить формы редактирования пунктов программы митапа компонентом MeetupAgendaItemForm', async () => {
      const agendaItemForms = wrapper.findAllComponents(MeetupAgendaItemForm);
      expect(agendaItemForms).toHaveLength(meetup.agenda.length);
      for (let i = 0; i < meetup.agenda.length; i++) {
        expect(agendaItemForms[i].props('agendaItem')).toEqual(meetup.agenda[i]);
      }
    });

    it('MeetupForm должен добавлять этап программы в конец программы по клику на кнопку "Добавить этап программы"', async () => {
      await wrapper.get('[data-test="addAgendaItem"').trigger('click');
      const agendaItemForms = wrapper.findAllComponents(MeetupAgendaItemForm);
      expect(agendaItemForms).toHaveLength(meetup.agenda.length + 1);
    });

    it('MeetupForm должен добавлять новый этап программы с временем начала, равным времени окончания последнего этапа', async () => {
      await wrapper.get('[data-test="addAgendaItem"').trigger('click');
      const agendaItemForms = wrapper.findAllComponents(MeetupAgendaItemForm);
      expect(agendaItemForms[agendaItemForms.length - 1].props('agendaItem').startsAt).toBe(
        meetup.agenda[meetup.agenda.length - 1].endsAt,
      );
    });

    it('MeetupForm должен удалять этап программы по событию "remove" из MeetupAgendaItemForm', async () => {
      let agendaItemForms = wrapper.findAllComponents(MeetupAgendaItemForm);
      agendaItemForms[1].vm.$emit('remove');
      await nextTick();
      agendaItemForms = wrapper.findAllComponents(MeetupAgendaItemForm);
      expect(agendaItemForms).toHaveLength(meetup.agenda.length - 1);
      expect(agendaItemForms[0].props('agendaItem')).toEqual(meetup.agenda[0]);
      expect(agendaItemForms[1].props('agendaItem')).toEqual(meetup.agenda[2]);
    });

    it('MeetupForm должен порождать событие submit по сабмиту формы с новыми данными митапа', async () => {
      const newMeetup = {
        ...meetup,
        title: 'NewTitle',
        description: 'New Short Description',
        image: meetup.image,
        date: Date.UTC(2021, 3 - 1, 2),
        place: 'New Testing Place',
      };
      getInputByName(wrapper, 'title').setValue(newMeetup.title);
      getInputByName(wrapper, 'date').setValue('2021-03-02');
      getInputByName(wrapper, 'place').setValue(newMeetup.place);
      getInputByName(wrapper, 'description').setValue(newMeetup.description);
      await wrapper.find('form').trigger('submit');
      expect(wrapper.emitted('submit')).toBeTruthy();
      expect(wrapper.emitted('submit')[0]).toEqual([newMeetup]);
    });

    it('MeetupForm должен порождать событие submit по сабмиту формы с новыми данными программы митапа', async () => {
      const newAgendaItem = {
        id: 5,
        startsAt: '14:00',
        endsAt: '15:00',
        type: 'talk',
        title: 'Title',
        description: 'Description',
        speaker: null,
        language: null,
      };

      let agendaItem = wrapper.findComponent(MeetupAgendaItemForm);
      while (agendaItem.exists()) {
        agendaItem.vm.$emit('remove');
        await nextTick();
        agendaItem = wrapper.findComponent(MeetupAgendaItemForm);
      }

      await wrapper.get('[data-test="addAgendaItem"').trigger('click');
      await wrapper.getComponent(MeetupAgendaItemForm).vm.$emit('update:agendaItem', { ...newAgendaItem });
      await nextTick();
      await wrapper.find('form').trigger('submit');
      expect(wrapper.emitted('submit')).toBeTruthy();
      expect(wrapper.emitted('submit')[0][0].agenda).toEqual([newAgendaItem]);
    });

    it('MeetupForm не должен мутировать объект meetup при редактировании формы митапа', async () => {
      const newTitle = 'NewTitle';
      getInputByName(wrapper, 'title').setValue(newTitle);
      expect(meetup.title).not.toBe('NewTitle');
    });

    it('MeetupForm не должен мутировать массив с программой митапа в meetup.agenda при добавлении пункта программы', async () => {
      const oldAgendaLength = meetup.agenda.length;
      await wrapper.get('[data-test="addAgendaItem"').trigger('click');
      expect(meetup.agenda).toHaveLength(oldAgendaLength);
    });

    it('MeetupForm не должен мутировать массив с программой митапа в meetup.agenda при удалении пункта программы', async () => {
      const oldAgendaLength = meetup.agenda.length;
      wrapper.getComponent(MeetupAgendaItemForm).vm.$emit('remove');
      await nextTick();
      expect(meetup.agenda).toHaveLength(oldAgendaLength);
    });

    it('MeetupForm не должен мутировать массив с программой митапа в meetup.agenda при обновлении компонентом MeetupAgendaItem', async () => {
      const newAgendaItem = {
        id: 5,
        startsAt: '14:00',
        endsAt: '15:00',
        type: 'talk',
        title: 'Title',
        description: 'Description',
        speaker: null,
        language: null,
      };

      await wrapper.getComponent(MeetupAgendaItemForm).vm.$emit('update:agendaItem', { ...newAgendaItem });
      await nextTick();
      expect(meetup.agenda[0]).not.toEqual(newAgendaItem);
    });

    it('MeetupForm должен порождать событие submit с новыми данными митапа, мутирование которых не должно приводить к обновлению формы', async () => {
      const newMeetup = {
        ...meetup,
        title: 'NewTitle',
        description: 'New Short Description',
        image: meetup.image,
        date: Date.UTC(2021, 3 - 1, 2),
        place: 'New Testing Place',
      };
      getInputByName(wrapper, 'title').setValue(newMeetup.title);
      getInputByName(wrapper, 'date').setValue('2021-03-02');
      getInputByName(wrapper, 'place').setValue(newMeetup.place);
      getInputByName(wrapper, 'description').setValue(newMeetup.description);
      await wrapper.find('form').trigger('submit');
      const emittedMeetup = wrapper.emitted('submit')[0][0];
      emittedMeetup.title = 'WrongTitle';
      emittedMeetup.agenda.pop();
      await nextTick();
      expect(getInputByName(wrapper, 'title').element.value).toBe(newMeetup.title);
      expect(wrapper.findAllComponents(MeetupAgendaItemForm)).toHaveLength(newMeetup.agenda.length);
    });
  });
});
