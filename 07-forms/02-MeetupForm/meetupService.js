/**
 * @typedef AgendaItem
 * @property id {number}
 * @property startsAt {string} time in HH:MM string
 * @property endsAt {string} time in HH:MM string
 * @property type {string} agenda item type
 * @property title? {string}
 * @property description? {string}
 * @property speaker? {string}
 * @property language? {string}
 */

/**
 * @typedef Meetup
 * @property id {number}
 * @property title {string}
 * @property description {string}
 * @property place {string}
 * @property date {number} - date timestamp at UTC midnight
 * @property image {string|null}
 * @property agenda {AgendaItem[]}
 */

let lastCreateMeetupId = -1;
/**
 * Creates new Meetup object with temp negative id
 * @return {Meetup}
 */
export function createMeetup() {
  return {
    id: lastCreateMeetupId--,
    title: '',
    description: '',
    place: '',
    date: new Date().setUTCHours(0, 0, 0, 0),
    image: null,
    agenda: [],
  };
}

let lastCreateAgendaItemId = -1;
/**
 * Creates new AgendaItem object with negative temp id
 * @return {AgendaItem}
 */
export function createAgendaItem() {
  return {
    id: lastCreateAgendaItemId--,
    startsAt: '00:00',
    endsAt: '00:00',
    type: 'other',
    title: null,
    description: null,
    speaker: null,
    language: null,
  };
}
