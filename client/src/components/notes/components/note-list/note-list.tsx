import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { getLocaleDateFormat } from '../../../../helpers/date-format-helper';
import { useSelector } from '../../../../store/store';
import { selectNotesState } from '../../../../store/note/noteSlice';
import { Modal } from '../../../common/modal/modal';
import { categories } from '../../constants/category';

interface INoteList {
  category: string | null,
  onNoteListToogle(status: boolean, category?: null): void,
  onNoteUnarchive(id: string): void
}

const NoteList = (props: INoteList) => {
  const { notes } = useSelector(selectNotesState);
  const archivedTasks = notes.filter((note) => note.archived && note.category === props.category);
  const iconModalCategory = categories.find((item) => item.value === props.category);
  return (
    <Modal icon={iconModalCategory?.icon} title={iconModalCategory?.value} onShow={props.onNoteListToogle}>
      <div className='flex flex-col overflow-y-auto gap-3 h-52'>
        {archivedTasks.length ? archivedTasks.map((note) => {

          return (
            <div key={note.id} className='flex gap-5 p-2 items-center text-center rounded bg-slate-300'>
              <div>{note.name}</div>
              <div>{getLocaleDateFormat(note.created, { month: 'long', day: 'numeric', year: 'numeric' })}</div>
              <div className='truncate'>{note.content}</div>
              <button className="ml-auto" onClick={() => props.onNoteUnarchive(note.id)}><FontAwesomeIcon icon={faXmark as IconProp} /></button>
            </div>
          )
        }) : (
          <div className='text-center'>There are no tasks</div>
        )
        }
      </div>
    </Modal>
  )
}

export { NoteList }