import { Table } from './components/table/table';
import { categories } from './constants/category';
import { addTask, editTask, removeTask, archiveTask, unarchiveTask } from '../../store/taskSlice';
import { useDispatch, useSelector } from '../../store/store';
import { selectTasksState } from '../../store/taskSlice';
import { TaskPreview, TaskList } from './components/components';
import uniqueId from 'lodash/uniqueId';
import { useState } from 'react';

const Tasks = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasksState);

  const [isShowTaskPreview, setShowTaskPreview] = useState({ id: null , isShow: false });
  const [isShowTaskListArchived, setShowTaskListArchived] = useState({ category: null, isShow: false });

  const handleTaskPreviewToggle = (isShow: boolean, id = null) => setShowTaskPreview({ id, isShow });
  const handleTaskListToggle = (isShow: boolean, category = null) => setShowTaskListArchived({ category, isShow });

  const handleTasktAdd = (data: {}) => dispatch(addTask(data));
  const handleTasktEdit = (id: string, data: {}) => dispatch(editTask({ id, data }));
  const handleTaskRemove = (id: string) => dispatch(removeTask({ id }));
  const handleTaskArchive = (id: string) => dispatch(archiveTask({ id }));
  const handleTaskUnarchive = (id: string) => dispatch(unarchiveTask({ id }))

  const tasksActive = tasks.filter((task) => !task.archived);
  const tasksInfo = categories.reduce((acc: { category: string, active: number, archived: number }[], category) => {
    const activeTasks = tasks.filter((task) => !task.archived && task.category === category.value) ;
    const archivedTasks = tasks.filter((task) => task.archived && task.category === category.value);
    const newTest: { id: string, category: string, active: number, archived: number } = { id: uniqueId(), category: category.value, active: activeTasks.length, archived: archivedTasks.length }
    acc.push(newTest)
    return acc;
  }, []);

  return (
    <main className="flex flex-col gap-4 px-10 mt-5">
      <Table
        headers={['name', 'created', 'category', 'content', 'dates']}
        tasks={tasksActive}
        isAction={true}
        onTaskRemove={handleTaskRemove}
        onTaskArchive={handleTaskArchive}
        onTaskPreviewToogle={handleTaskPreviewToggle}
        className=''
      />
      <button
        type="button"
        className='ml-auto p-2 rounded bg-slate-600 text-white hover:bg-slate-200 hover:text-slate-900' 
        onClick={() => handleTaskPreviewToggle(true)}
      >
        Create Note
      </button>
      <Table
        className='mt-[50px]'
        headers={['category', 'active', 'archived']}
        tasks={tasksInfo}
        isAction={false}
        onTaskRemove={handleTaskRemove}
        onTaskArchive={handleTaskArchive}
        onTaskPreviewToogle={handleTaskPreviewToggle}
        onTaskListToogle={handleTaskListToggle}
      />
      {isShowTaskPreview.isShow && (
        <TaskPreview
          taskId={isShowTaskPreview.id}
          onTasktAdd={handleTasktAdd}
          onTaskEdit={handleTasktEdit}
          onTaskPreviewToggle={handleTaskPreviewToggle}
        />
      )}
      {isShowTaskListArchived.isShow && (
        <TaskList
          category={isShowTaskListArchived.category}
          onTaskListToogle={handleTaskListToggle}
          onTaskUnarchive={handleTaskUnarchive}
        />
      )}
    </main>
  )
};

export { Tasks };