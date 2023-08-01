import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { getLocaleDateFormat } from '../../../../helpers/date-format-helper';
import { useSelector } from '../../../../store/store';
import { selectTasksState } from '../../../../store/taskSlice';
import { Modal } from '../../../common/modal/modal';
import { categories } from '../../constants/category';

interface ITaskList {
  category: string | null,
  onTaskListToogle(status: boolean, category?: null): void,
  onTaskUnarchive(id: string): void
}

const TaskList = (props: ITaskList) => {
  const tasks = useSelector(selectTasksState);
  const archivedTasks = tasks.filter((task) => task.archived && task.category === props.category);
  const iconModalCategory = categories.find((item) => item.value === props.category);
  return (
    <Modal icon={iconModalCategory?.icon} title={iconModalCategory?.value} onShow={props.onTaskListToogle}>
      <div className='flex flex-col overflow-y-auto gap-3 h-52'>
        {archivedTasks.length ? archivedTasks.map((task) => {

          return (
            <div key={task.id} className='flex gap-5 p-2 items-center text-center rounded bg-slate-300'>
              <div>{task.name}</div>
              <div>{getLocaleDateFormat(task.created, { month: 'long', day: 'numeric', year: 'numeric' })}</div>
              <div className='truncate'>{task.content}</div>
              <button className="ml-auto" onClick={() => props.onTaskUnarchive(task.id)}><FontAwesomeIcon icon={faXmark as IconProp} /></button>
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

export { TaskList }