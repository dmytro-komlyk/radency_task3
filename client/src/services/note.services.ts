import {
  ApiPath,
  NotesApiPath,
  HttpMethod,
} from '../common/enums/enums';
  
class Note {
  _http: any;

  constructor({ http }: any) {
    this._http = http;
  }
  
  getAllNotes(filter: {}) {
    return this._http.load(
      `${ApiPath.NOTES}`, 
      {
        method: HttpMethod.GET,
        query: filter
      }
    );
  }
  
  getNotesStats() {
    return this._http.load(
      `${ApiPath.NOTES}${NotesApiPath.STATS}`, 
      {
        method: HttpMethod.GET,
      }
    );
  }

  getNote(id: string) {
    return this._http.load(
      `${ApiPath.NOTES}${NotesApiPath.ROOT}${id}`,
      {
        method: HttpMethod.GET,
      }
    );
  }
  
  addNote(payload: object) {
    return this._http.load(
      `${ApiPath.NOTES}${NotesApiPath.ROOT}`,
      {
        method: HttpMethod.POST,
        payload: JSON.stringify(payload)
      }
    );
  }
  
  updateNote({ id, data }: { id: string, data: object }) {
    return this._http.load(
      `${ApiPath.NOTES}${NotesApiPath.ROOT}${id}`,
      {
        method: HttpMethod.PUT,
        payload: JSON.stringify(data)
      }
    );
  }
  
  removeNote(id: string) {
    return this._http.load(
      `${ApiPath.NOTES}${NotesApiPath.ROOT}${id}`,
      {
        method: HttpMethod.DELETE,
      }
    );
  }
}
  
export { Note };