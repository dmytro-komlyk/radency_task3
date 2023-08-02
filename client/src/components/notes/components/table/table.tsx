import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { categories } from '../../constants/category';
import { getParseDate, getLocaleDateFormat } from '../../../../helpers/date-format-helper';
import { faTrash, faBoxArchive, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { INote, IStat } from '../../../../store/note/noteSlice';

interface IActions {
  onNotePreviewToogle(status: boolean, id: any): void;
  onNoteArchive(id: any): void;
  onNoteRemove(id: any): void;
  onNoteListToogle?(status: boolean, category?: null): void,
}

interface IHeadTable {  
  headers: string[],
  isAction: boolean
}

interface IBodyTable extends IActions {
  body: INote[] | IStat[],
  isAction: boolean,
}

interface ITable extends IActions {
  headers: string[],
  items: INote[] | IStat[],
  className: string,
  isAction: boolean,
}

const HeadTable = (props: IHeadTable) => (
  <thead className='bg-slate-600 text-white'>
    <tr className='p-4 border-b-[5px] border-solid border-white'>
      {props.headers.map((header: string, idx: number) => (<th key={idx} className='p-4 border-b-[5px] border-solid border-white capitalize'>{ header }</th>))}
      {props.isAction &&
        <th className='p-4 border-b-[5px] border-solid border-white'>
          <div className='flex justify-end gap-2'>
            <FontAwesomeIcon icon={faBoxArchive as IconProp} />
            <FontAwesomeIcon icon={faTrash as IconProp} />
          </div>
        </th>}
    </tr>
  </thead>
);

const BodyTable = (props: IBodyTable) => (
  <tbody>
    {props.body.map((note: any) => {
      const categoryIcon = categories.find((item) => item.value === note.category);
      const convertedCreatedDate = props.isAction && getLocaleDateFormat(note.created, { month: 'long', day: 'numeric', year: 'numeric' });
      const dates = props.isAction && getParseDate(note.content);
  
      return (
      <tr key={note.id} className='p-4 border-b-[5px] border-solid border-white [&>td]:hover:bg-slate-300 cursor-pointer' onClick={() => (!props.isAction && props.onNoteListToogle) && props.onNoteListToogle(true, note.category)}>
        <td className='p-2 bg-slate-200'>
          <div className='flex items-center gap-3 '>
            <FontAwesomeIcon className='w-4 h-4' icon={categoryIcon?.icon as IconProp} />
            <span className='truncate'>{ props.isAction ? note.name: note.category }</span>
          </div>
        </td>
        { props.isAction ? (
          <>
            <td className='p-2 bg-slate-200 truncate text-center'>{ convertedCreatedDate }</td>
            <td className='p-2 bg-slate-200 truncate text-center'>{ note.category }</td>
            <td className='p-2 bg-slate-200 truncate text-center'>{ note.content }</td>
            <td className='p-2 bg-slate-200 truncate text-center'>
              { dates && (
                <div className='flex flex-col gap-1'>{dates.map((date: string, idx: number) => <span key={idx} className='bg-slate-300 rounded'>{date}</span>)}</div>
              )}
            </td>
            <td className='p-4 bg-slate-200 truncate'>
              <div className='flex justify-end gap-2'>
                <button onClick={() => props.onNotePreviewToogle(true, note.id)}><FontAwesomeIcon icon={faPenToSquare as IconProp} /></button>
                <button onClick={() => props.onNoteArchive(note.id)}><FontAwesomeIcon icon={faBoxArchive as IconProp} /></button>
                <button onClick={() => props.onNoteRemove(note.id)}><FontAwesomeIcon icon={faTrash as IconProp} /></button>
              </div>
            </td>
          </>
        ) : (
          <>
            <td className='p-2 bg-slate-200 truncate text-center'>{ note.active }</td>
            <td className='p-2 bg-slate-200 truncate text-center'>{ note.archived }</td>
          </>
        )
        }
      </tr>
      )})}
  </tbody>
)

const Table = ({ headers, items, className, isAction, onNotePreviewToogle, onNoteListToogle, onNoteRemove, onNoteArchive }: ITable) => {
  return (
    <table className={`table-fixed w-full border-collapse rounded-xl overflow-hidden ${className}`}>
      <HeadTable headers={headers} isAction={isAction} />
      <BodyTable
        body={items}
        isAction={isAction}
        onNotePreviewToogle={onNotePreviewToogle}
        onNoteRemove={onNoteRemove}
        onNoteArchive={onNoteArchive}
        onNoteListToogle={onNoteListToogle}
      />
    </table>
  )
}

export { Table }