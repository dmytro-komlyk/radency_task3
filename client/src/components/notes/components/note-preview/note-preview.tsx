import { useState } from 'react';
import { Modal } from '../../../common/modal/modal';
import { useSelector } from '../../../../store/store';
import { selectNotesState } from '../../../../store/note/noteSlice';
import { getValidateForm } from '../../../../helpers/validate-helper';

interface INotePreviewProps {
  noteId: string | null,
  onNoteAdd: (values: {}) => void,
  onNoteEdit: (id: string, values: {}) => void,
  onNotePreviewToggle: (isShow: boolean) => void
}

const NotePreview = ({ noteId = null, onNoteAdd, onNoteEdit, onNotePreviewToggle }: INotePreviewProps) => {
  const { notes } = useSelector(selectNotesState);
  const previewNote = noteId ? notes.find((note) => note.id === noteId) : { name: '', content: '', category: '' };
  const initNoteState = {
    name: previewNote!.name,
    content: previewNote!.content,
    category: previewNote!.category,
  }

  const [noteValues, setNoteValues] = useState(initNoteState);
  const [errorsValues, setErrorsValues] = useState({ name: null, content: null, category: null });
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;

    setNoteValues({
      ...noteValues,
      [name]: value,
    });
    setErrorsValues((state) => ({ ...state, [name]: null }))
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsSubmit(true);
    const { isErrors, errors } = getValidateForm(noteValues);
    if (!isErrors) {
      if (Boolean(noteId)) {
        onNoteEdit(noteId as string, noteValues);
      } else {
        onNoteAdd(noteValues)
      }
      onNotePreviewToggle(false);
    }
    setErrorsValues((state) => ({ ...state, ...errors }));
    setIsSubmit(false);
  }

  return (
    <Modal title={noteId ? 'Edit Note' : 'Create Note'} onShow={onNotePreviewToggle}>
      <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
        <div className='relative z-0 w-full mb-6 group'>
          <input
            type='text'
            name='name'
            id='name'
            className={`${Boolean(errorsValues.name) ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-slate-900'} block py-2.5 px-0 w-full text-sm text-gray-700 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer`}
            placeholder=' '
            value={noteValues.name}
            onChange={handleChange}
            required
          />
          <label htmlFor='name' className={`${Boolean(errorsValues.name) ? 'text-red-500 peer-focus:text-red-500' : 'text-gray-500 peer-focus:text-slate-900'} peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>Name</label>
          {Boolean(errorsValues.name) && <span className="text-xs text-red-500">{errorsValues.name}</span>}
        </div>
        <div className='relative z-0 w-full mb-6 group'>
          <input
            type='text'
            name='content'
            id='content'
            className={`${Boolean(errorsValues.content) ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-slate-900'} block py-2.5 px-0 w-full text-sm text-gray-700 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer`}
            placeholder=' '
            value={noteValues.content}
            onChange={handleChange}
            required
          />
          <label htmlFor='content' className={`${Boolean(errorsValues.content) ? 'text-red-500 peer-focus:text-red-600' : 'text-gray-500 peer-focus:text-slate-900'} peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>Content</label>
          {Boolean(errorsValues.content) && <span className="text-xs text-red-500">{ errorsValues.content }</span>}
        </div>
        <div className='relative z-0 w-full mb-6 group'>
          <fieldset className={`${Boolean(errorsValues.category) ? 'border-red-500' : 'border-slate-200'} flex flex-col p-4 rounded border-2`}>
            <legend className={`${Boolean(errorsValues.category) ? 'bg-red-500' : 'bg-slate-200'} p-1 my-0 mx-auto rounded text-white`}>Select a task category</legend>
            <div className='flex gap-2'>
              <input
                type='radio'
                id='category1'
                name='category'
                value='Task'
                checked={noteValues.category === 'Task'}
                onChange={handleChange}
                required
              />
              <label htmlFor='category1'>Task</label>
            </div>
            <div className='flex gap-2'>
              <input
                type='radio'
                id='category2'
                name='category'
                value='Random Thought'
                checked={noteValues.category === 'Random Thought'}
                onChange={handleChange} />
              <label htmlFor='category2'>Random Thought</label>
            </div>
            <div className='flex gap-2'>
              <input
                type='radio'
                id='category3'
                name='category'
                value='Idea'
                checked={noteValues.category === 'Idea'}
                onChange={handleChange}
              />
              <label htmlFor='category3'>Idea</label>
            </div>
            <div className='flex gap-2'>
              <input
                type='radio'
                id='category4'
                name='category'
                value='Quote'
                checked={noteValues.category === 'Quote'}
                onChange={handleChange}
              />
              <label htmlFor='category4'>Quote</label>
            </div>
          </fieldset>
        </div>
        <button
          type='submit'
          className='w-[50%] ml-auto text-white bg-slate-500 hover:bg-slate-300 hover:text-slate-950 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center'
          disabled={isSubmit}
        >
          {noteId ? 'Save' : 'Submit'}
        </button>
      </form>
    </Modal>
  )
}

export { NotePreview };