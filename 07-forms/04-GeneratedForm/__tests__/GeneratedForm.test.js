import { mount } from '@vue/test-utils';
const MeetupAgendaItemForm = require(global.getSolutionPath('components/MeetupAgendaItemForm')).default;

describe('forms/GeneratedForm', () => {
  describe('MeetupAgendaItemForm', () => {
    let wrapper;
    let agendaItem;

    beforeEach(() => {
      agendaItem = {
        id: 0,
        startsAt: '05:00',
        endsAt: '10:00',
        type: 'other',
        title: 'TitleTest',
        description: 'DescriptionTest',
        speaker: 'SpeakerTest',
        language: 'RU',
      };
      wrapper = mount(MeetupAgendaItemForm, { props: { agendaItem } });
    });

    it('MeetupAgendaItemForm должен порождать событие remove при клике на кнопку удаления', async () => {
      await wrapper.get('.agenda-item-form__remove-button').trigger('click');
      expect(wrapper.emitted('remove')).toHaveLength(1);
    });

    it('MeetupAgendaItemForm должен выводить время начала и окончания в соответствии с параметром agendaItem', () => {
      const formGroups = wrapper.findAll('.form-group');
      expect(formGroups.length).toBeGreaterThanOrEqual(3);
      expect(formGroups[0].get('select[name="type"]').element.value).toBe(agendaItem.type);
      expect(formGroups[1].get('input[name="startsAt"]').element.value).toBe(agendaItem.startsAt);
      expect(formGroups[2].get('input[name="endsAt"]').element.value).toBe(agendaItem.endsAt);
    });

    it('MeetupAgendaItemForm должен выводить все поля в соответствии с параметром agendaItem после переключения на тип other через select[name=type]', async () => {
      await wrapper.find('select[name="type"]').setValue('other');
      const formGroups = wrapper.findAll('.form-group');

      expect(formGroups).toHaveLength(3 + 2);
      expect(formGroups[3].get('label').text()).toContain('Заголовок');
      expect(formGroups[3].get('input[name="title"]').element.value).toBe(agendaItem.title);

      expect(formGroups[4].get('label').text()).toContain('Описание');
      expect(formGroups[4].get('textarea[name="description"]').element.value).toBe(agendaItem.description);
    });

    it('MeetupAgendaItemForm должен выводить все поля в соответствии с параметром agendaItem после переключения на тип talk через select[name=type]', async () => {
      await wrapper.find('select[name="type"]').setValue('talk');
      const formGroups = wrapper.findAll('.form-group');
      expect(formGroups).toHaveLength(3 + 4);

      expect(formGroups[3].get('label').text()).toContain('Тема');
      expect(formGroups[3].get('input[name="title"]').element.value).toBe(agendaItem.title);

      expect(formGroups[4].get('label').text()).toContain('Докладчик');
      expect(formGroups[4].get('input[name="speaker"]').element.value).toBe(agendaItem.speaker);

      expect(formGroups[5].get('label').text()).toContain('Описание');
      expect(formGroups[5].get('textarea[name="description"]').element.value).toBe(agendaItem.description);

      expect(formGroups[6].get('label').text()).toContain('Язык');
      expect(formGroups[6].get('select[name="language"]').element.value).toBe(agendaItem.language);
    });

    it.each(['registration', 'opening', 'break', 'coffee', 'closing', 'afterparty'])(
      'MeetupAgendaItemForm должен выводить все поля в соответствии с параметром agendaItem после переключения на тип %s через select[name=type]',
      async (type) => {
        await wrapper.find('select[name="type"]').setValue(type);

        const formGroups = wrapper.findAll('.form-group');
        expect(formGroups).toHaveLength(3 + 1);

        expect(formGroups[3].get('label').text()).toContain('Нестандартный текст (необязательно)');
        expect(formGroups[3].get('input[name="title"]').element.value).toBe(agendaItem.title);
      },
    );

    it('MeetupAgendaItemForm должен порождать событие обновления параметра agendaItem после изменения значения в форме доклада', async () => {
      const newAgendaItem = {
        id: 0,
        startsAt: '04:00',
        endsAt: '06:00',
        type: 'talk',
        title: 'NewTitle',
        description: 'NewDescription',
        speaker: 'NewSpeaker',
        language: 'EN',
      };
      await wrapper.get('[name="type"]').setValue(newAgendaItem.type);
      await wrapper.get('[name="startsAt"]').setValue(newAgendaItem.startsAt);
      await wrapper.get('[name="endsAt"]').setValue(newAgendaItem.endsAt);
      await wrapper.get('[name="title"]').setValue(newAgendaItem.title);
      await wrapper.get('[name="speaker"]').setValue(newAgendaItem.speaker);
      await wrapper.get('[name="description"]').setValue(newAgendaItem.description);
      await wrapper.get('[name="language"]').setValue(newAgendaItem.language);
      expect(wrapper.emitted('update:agendaItem')).toBeDefined();
      expect(wrapper.emitted('update:agendaItem').length).toBeGreaterThan(0);
      const lastEmitted = wrapper.emitted('update:agendaItem')[wrapper.emitted('update:agendaItem').length - 1];
      expect(lastEmitted[0]).toEqual(newAgendaItem);
    });

    it('MeetupAgendaItemForm не должен мутировать переданный в параметр agendaItem объект при редактировании заголовка', async () => {
      const newTitle = 'New Title';
      await wrapper.get('[name="title"]').setValue(newTitle);
      expect(agendaItem.title).not.toEqual(newTitle);
    });

    it('MeetupAgendaItemForm должен увеличивать время окончания с 10:00 до 11:00 при увеличении времени начала с 05:00 до 06:00', async () => {
      const [startsAt, endsAt] = wrapper.findAll('input[name="startsAt"], input[name="endsAt"]');
      await startsAt.setValue('06:00');
      expect(endsAt.element.value).toBe('11:00');
    });

    it('MeetupAgendaItemForm должен уменьшать время окончания с 10:00 до 09:00 при уменьшении времени начала с 05:00 до 04:00', async () => {
      const [startsAt, endsAt] = wrapper.findAll('input[name="startsAt"], input[name="endsAt"]');
      await startsAt.setValue('04:00');
      expect(endsAt.element.value).toBe('09:00');
    });

    it('MeetupAgendaItemForm должен увеличивать время окончания с 10:00 до 03:00 при увеличении времени начала с 05:00 до 22:00 при переходе через полночь', async () => {
      const [startsAt, endsAt] = wrapper.findAll('input[name="startsAt"], input[name="endsAt"]');
      await startsAt.setValue('22:00');
      expect(endsAt.element.value).toBe('03:00');
    });

    it('MeetupAgendaItemForm должен увеличивать время окончания с 11:00 до 12:00 при увеличении времени начала с 05:00 до 06:00 после установки времени окончания в 11:00', async () => {
      const [startsAt, endsAt] = wrapper.findAll('input[name="startsAt"], input[name="endsAt"]');
      await endsAt.setValue('11:00');
      await startsAt.setValue('06:00');
      expect(endsAt.element.value).toBe('12:00');
    });

    it('MeetupAgendaItemForm должен увеличивать время окончания с 02:00 до 03:00 при увеличении времени начала с 05:00 до 06:00 после установки времени окончания в 02:00', async () => {
      const [startsAt, endsAt] = wrapper.findAll('input[name="startsAt"], input[name="endsAt"]');
      await endsAt.setValue('02:00');
      await startsAt.setValue('06:00');
      expect(endsAt.element.value).toBe('03:00');
    });
  });
});
