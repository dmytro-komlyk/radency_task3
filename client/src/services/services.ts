import { ENV } from '../common/enums/enums';
import { Http } from './http.services';
import { Note } from './note.services';

const http = new Http({
  siteUrl: ENV.SITE_URL as string
});

const note = new Note({
  http
});

export { http, note }