import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { categories } from '../../constants/category';
import { getParseDate, getLocaleDateFormat } from '../../../../helpers/date-format-helper';
import { faTrash, faBoxArchive, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { ITask, ITaskInfo } from '../../../../store/taskSlice';

interface IActions {
  onTaskPreviewToogle(status: boolean, id: any): void;
  onTaskArchive(id: any): void;
  onTaskRemove(id: any): void;
  onTaskListToogle?(status: boolean, category?: null): void,
}

interface IHeadTable {  
  headers: string[],
  isAction: boolean
}

interface IBodyTable extends IActions {
  body: ITask[] | ITaskInfo[],
  isAction: boolean,
}

interface ITable extends IActions {
  headers: string[],
  tasks: ITask[] | ITaskInfo[],
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
    {props.body.map((task: any) => {
      const categoryIcon = categories.find((item) => item.value === task.category);
      const convertedCreatedDate = props.isAction && getLocaleDateFormat(task.created, { month: 'long', day: 'numeric', year: 'numeric' });
      const dates = props.isAction && getParseDate(task.content);
  
      return (
      <tr key={task.id} className='p-4 border-b-[5px] border-solid border-white [&>td]:hover:bg-slate-300 cursor-pointer' onClick={() => (!props.isAction && props.onTaskListToogle) && props.onTaskListToogle(true, task.category)}>
        <td className='p-2 bg-slate-200'>
          <div className='flex items-center gap-3 '>
            <FontAwesomeIcon className='w-4 h-4' icon={categoryIcon?.icon as IconProp} />
            <span className='truncate'>{ props.isAction ? task.name: task.category }</span>
          </div>
        </td>
        { props.isAction ? (
          <>
            <td className='p-2 bg-slate-200 truncate text-center'>{ convertedCreatedDate }</td>
            <td className='p-2 bg-slate-200 truncate text-center'>{ task.category }</td>
            <td className='p-2 bg-slate-200 truncate text-center'>{ task.content }</td>
            <td className='p-2 bg-slate-200 truncate text-center'>
              { dates && (
                <div className='flex flex-col gap-1'>{dates.map((date: string, idx: number) => <span key={idx} className='bg-slate-300 rounded'>{date}</span>)}</div>
              )}
            </td>
            <td className='p-4 bg-slate-200 truncate'>
              <div className='flex justify-end gap-2'>
                <button onClick={() => props.onTaskPreviewToogle(true, task.id)}><FontAwesomeIcon icon={faPenToSquare as IconProp} /></button>
                <button onClick={() => props.onTaskArchive(task.id)}><FontAwesomeIcon icon={faBoxArchive as IconProp} /></button>
                <button onClick={() => props.onTaskRemove(task.id)}><FontAwesomeIcon icon={faTrash as IconProp} /></button>
              </div>
            </td>
          </>
        ) : (
          <>
            <td className='p-2 bg-slate-200 truncate text-center'>{ task.active }</td>
            <td className='p-2 bg-slate-200 truncate text-center'>{ task.archived }</td>
          </>
        )
        }
      </tr>
      )})}
  </tbody>
)

const Table = ({ headers, tasks, className, isAction, onTaskPreviewToogle, onTaskListToogle, onTaskRemove, onTaskArchive }: ITable) => {
  return (
    <table className={`table-fixed w-full border-collapse rounded-xl overflow-hidden ${className}`}>
      <HeadTable headers={headers} isAction={isAction} />
      <BodyTable
        body={tasks}
        isAction={isAction}
        onTaskPreviewToogle={onTaskPreviewToogle}
        onTaskRemove={onTaskRemove}
        onTaskArchive={onTaskArchive}
        onTaskListToogle={onTaskListToogle}
      />
    </table>
  )
}

export { Table }