import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface IModalProps {
    icon?: IconProp,
    title?: string | null,
    onShow(state: boolean): void,
    children: JSX.Element
}

const Modal = ({ icon, title, onShow, children }: IModalProps) => {
    return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full'>
        <div className='first-line:relative top-20 w-8/12 mt-10 mx-auto flex flex-col border-0 rounded-lg shadow-lg bg-white outline-none focus:outline-none'>
            <div className='flex p-3'>
                <button className="px-1.5 rounded-full ml-auto hover:bg-slate-400" onClick={() => onShow(false)}>
                    <FontAwesomeIcon icon={faXmark as IconProp} />
                </button>
            </div>
            <div className='flex items-center justify-center gap-2 text-2xl text-center'>
                {Boolean(icon) && <FontAwesomeIcon icon={icon as IconProp} />}
                <span>{ title }</span>
            </div>
            <div className='relative p-6 flex-auto'>
                { children }
            </div>
        </div>
    </div>
    )
}

export { Modal};