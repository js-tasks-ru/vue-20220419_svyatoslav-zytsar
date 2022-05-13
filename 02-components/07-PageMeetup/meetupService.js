import meetups from './api/meetups.js';

/**
 * Получение данных митапа по Meetup ID с API
 * @param {Number} meetupId
 * @return {Promise<Object>} - Данные митапа
 * @throws {Error} - Ошибка получения данных митапа
 */
export async function fetchMeetupById(meetupId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const meetup = meetups.find((meetup) => meetup.id === meetupId);
      if (!meetup) {
        reject(new Error('Not found'));
      }
      resolve(meetup);
    }, 500);
  });
}

export const agendaTypes = {
  REGISTRATION: 'registration',
  OPENING: 'opening',
  BREAK: 'break',
  COFFEE: 'coffee',
  CLOSING: 'closing',
  AFTERPARTY: 'afterparty',
  TALK: 'talk',
  OTHER: 'other',
};

/**
 * Словарь заголовков по умолчанию для всех типов пунктов программы
 */
export const agendaItemDefaultTitles = {
  [agendaTypes.REGISTRATION]: 'Регистрация',
  [agendaTypes.OPENING]: 'Открытие',
  [agendaTypes.BREAK]: 'Перерыв',
  [agendaTypes.COFFEE]: 'Coffee Break',
  [agendaTypes.CLOSING]: 'Закрытие',
  [agendaTypes.AFTERPARTY]: 'Afterparty',
  [agendaTypes.TALK]: 'Доклад',
  [agendaTypes.OTHER]: 'Другое',
};

/**
 * Словарь иконок для для всех типов пунктов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
export const agendaItemIcons = {
  [agendaTypes.REGISTRATION]: 'key',
  [agendaTypes.OPENING]: 'cal-sm',
  [agendaTypes.TALK]: 'tv',
  [agendaTypes.BREAK]: 'clock',
  [agendaTypes.COFFEE]: 'coffee',
  [agendaTypes.CLOSING]: 'key',
  [agendaTypes.AFTERPARTY]: 'cal-sm',
  [agendaTypes.OTHER]: 'cal-sm',
};
