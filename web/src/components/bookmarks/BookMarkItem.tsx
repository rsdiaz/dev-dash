import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function BookMarkItem (props: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className='border shadow-sm break-inside flex justify-between flex-col p-2 text-sm gap-4 rounded-lg dark:border-white/5 bg-white/10 backdrop-blur-md'
    >
      <div className='flex justify-start items-center gap-3'>
        <figure className='relative w-4 h-4 flex-none'>
          <img src={props.data.imageUrl} />
          <figcaption className='sr-only'>Avatar</figcaption>
        </figure>
        <h2 className='font-medium text-sm'>
          <a href={props.data.url} rel='nofollow noreferrer' target='_blank'>
            {props.data.title}
          </a>
          <br />
          <span className='text-gray-500 text-xs' />
        </h2>
        <span className='inline-block text-sm px-1 py-0.5 rounded bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-400'>
          {props.data.category}
        </span>
      </div>
    </div>
  )
}

export default BookMarkItem
