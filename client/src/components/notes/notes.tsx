import { Table } from './components/table/table';
import { categories } from './constants/category';
import { noteActionCreator } from '../../store/actions';
import { useDispatch, useSelector } from '../../store/store';
import { selectNotesState } from '../../store/note/noteSlice';
import { NotePreview, NoteList } from './components/components';
import { useEffect, useState, useCallback } from 'react';

const Notes = () => {
  const dispatch = useDispatch();
  const { notes, stats } = useSelector(selectNotesState);

  const activedNotes = notes.filter((note) => !note.archived);

  const [isShowNotePreview, setShowNotePreview] = useState({ id: null , isShow: false });
  const [isShowNoteListArchived, setShowNoteListArchived] = useState({ category: null, isShow: false });

  const handleNotePreviewToggle = (isShow: boolean, id = null) => setShowNotePreview({ id, isShow });
  const handleNoteListToggle = (isShow: boolean, category = null) => setShowNoteListArchived({ category, isShow });

  const onNotesLoad = useCallback((filter: {}) =>
    dispatch(
      noteActionCreator.loadNotes(filter)
    ),
    [dispatch]
  );

  const onNotesStatsLoad = useCallback(() =>
    dispatch(noteActionCreator.loadNotesStats()), [dispatch]
  );

  const handleNoteAdd = useCallback((data: object) => 
    dispatch(noteActionCreator.createNote(data)), [dispatch]
  );

  const handleNoteEdit = useCallback((id: string, data: object) => 
    dispatch(noteActionCreator.updateNote({ id, data })), [dispatch]
  );
  
  const handleNoteRemove = useCallback((id: string) => 
    dispatch(noteActionCreator.deleteNote(id)), [dispatch]   
  );

  const handleNoteArchive = useCallback((id: string) => 
    dispatch(noteActionCreator.updateNote({ id, data: { archived: true} })), [dispatch]
  );

  const handleNoteUnarchive = useCallback((id: string) =>
    dispatch(noteActionCreator.updateNote({ id, data: { archived: false} })), [dispatch]
  );
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        onNotesLoad({
          archived: false,
        })
        onNotesStatsLoad()
      } catch(error) {
        console.log(error);
      }
    }
    fetchData()
  }, [onNotesLoad, onNotesStatsLoad])

  return (
    <main className="flex flex-col gap-4 px-10 mt-5">
      <Table
        headers={['name', 'created', 'category', 'content', 'dates']}
        items={activedNotes}
        isAction={true}
        onNoteRemove={handleNoteRemove}
        onNoteArchive={handleNoteArchive}
        onNotePreviewToogle={handleNotePreviewToggle}
        className=''
      />
      <button
        type="button"
        className='ml-auto p-2 rounded bg-slate-600 text-white hover:bg-slate-200 hover:text-slate-900' 
        onClick={() => handleNotePreviewToggle(true)}
      >
        Create Note
      </button>
      <Table
        className='mt-[50px]'
        headers={['category', 'active', 'archived']}
        items={stats}
        isAction={false}
        onNoteRemove={handleNoteRemove}
        onNoteArchive={handleNoteArchive}
        onNotePreviewToogle={handleNotePreviewToggle}
        onNoteListToogle={handleNoteListToggle}
      />
      {isShowNotePreview.isShow && (
        <NotePreview
          noteId={isShowNotePreview.id}
          onNoteAdd={handleNoteAdd}
          onNoteEdit={handleNoteEdit}
          onNotePreviewToggle={handleNotePreviewToggle}
        />
      )}
      {isShowNoteListArchived.isShow && (
        <NoteList
          category={isShowNoteListArchived.category}
          onNoteListToogle={handleNoteListToggle}
          onNoteUnarchive={handleNoteUnarchive}
        />
      )}
    </main>
  )
};

export { Notes };