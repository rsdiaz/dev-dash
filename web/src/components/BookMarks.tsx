/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { DndContext, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, arrayMove, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { useState } from 'react'
import useSWR from 'swr'

import { CSS } from '@dnd-kit/utilities'

const fetcher = async () => await fetch('http://localhost:4000/bookmarks', { method: 'GET' }).then(async (response) => await response.json())

function SortableItem (props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: props.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <h1>{props.data.title}</h1>
    </div>
  )
}

const BookMarks = () => {
  const [ items, setItems ] = useState([ 1, 2 ])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )
  const { data: bookmarks, error, isValidating } = useSWR('http://localhost:4000/bookmarks', fetcher)

  if (error !== undefined) return <div className='failed'>failed to load</div>
  if (isValidating) return <div className='Loading'>Loading...</div>

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={bookmarks}
        strategy={horizontalListSortingStrategy}
      >
        <div className='flex gap-4 flex-row'>
          {bookmarks?.map((e: any, index: number) => (
            <SortableItem key={index} id={index} data={e} />
          ))}
        </div>
      </SortableContext>

    </DndContext>
  )

  function handleDragEnd (event: any) {
    const { active, over } = event
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id)
        const newIndex = items.indexOf(over.id)

        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }
}

export default BookMarks
