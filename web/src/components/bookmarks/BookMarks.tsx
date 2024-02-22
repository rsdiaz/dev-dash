/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragMoveEvent
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  horizontalListSortingStrategy
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { cx } from '../../utils/classNames'
import { type BookmarkInterface } from '../../types/BookmarkInterface'
import AddBookMark from './AddBookMark.'

const fetcher = async () =>
  await fetch('http://localhost:4000/bookmarks', { method: 'GET' }).then(
    async (response) => await response.json()
  )

function SortableItem (props: any) {
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
      className='border shadow-sm break-inside flex justify-between flex-col p-4 text-sm gap-4 rounded-lg dark:border-white/5 bg-white/10 backdrop-blur-md'
    >
      <div className='flex justify-start items-center gap-3'>
        <figure className='relative w-8 h-8 flex-none'>
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

function BookMarks () {
  const {
    data: bookmarks,
    error,
    isValidating
  } = useSWR('http://localhost:4000/bookmarks', fetcher)
  const [ items, setItems ] = useState<BookmarkInterface[]>([])
  const [ select, setSelected ] = useState<boolean>(false)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  useEffect(() => {
    if (bookmarks !== undefined) {
      const sortedItems = [ ...bookmarks ].sort((a, b) => a.position - b.position)
      setItems(sortedItems)
    }
  }, [ bookmarks ])

  if (error !== undefined) return <div className='failed'>failed to load</div>
  if (isValidating) return <div className='Loading'>Loading...</div>

  function handleDragEnd (event: any) {
    const { active, over } = event
    if (active.id !== over.id) {
      setItems((prevItems) => orderBookmarks(event, prevItems))
      updateBookmarks(items)
    }
    setSelected(false)
  }

  function handleDragMove (event: DragMoveEvent): void {
    console.log(event)
    setSelected(true)
  }

  function orderBookmarks (event: any, bookmarks: BookmarkInterface[]) {
    const { active, over } = event
    const orderBookmarks = [ ...bookmarks ]
    const oldIndex = orderBookmarks.findIndex((item) => item.id === active.id)
    const newIndex = orderBookmarks.findIndex((item) => item.id === over.id)
    const [ removed ] = orderBookmarks.splice(oldIndex, 1)

    orderBookmarks.splice(newIndex, 0, removed)
    orderBookmarks.forEach((item, index) => {
      item.position = index
    })

    return orderBookmarks
  }

  function updateBookmarks (bookmarks: BookmarkInterface[]): void {
    bookmarks.forEach(bookmark => {
      const requestOptions = {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ position: bookmark.position })
      }
      fetch(`http://localhost:4000/bookmarks/${bookmark.id}`, requestOptions).then()
    })
  }

  return (
    <React.Fragment>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragMove={handleDragMove}
      >
        <SortableContext items={items} strategy={horizontalListSortingStrategy}>
          <div
            className={
              cx(
                'flex gap-4 flex-row py-4 rounded transition-colors',
                select ? 'bg-slate-900' : ''
              )
            }
          >
            {items.map((e: BookmarkInterface) => (
              <SortableItem key={e.id} id={e.id} data={e} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <AddBookMark items={items} />
    </React.Fragment>
  )
}

export default BookMarks