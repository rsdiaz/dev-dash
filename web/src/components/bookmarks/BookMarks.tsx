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
  horizontalListSortingStrategy
} from '@dnd-kit/sortable'
import { cx } from '../../utils/classNames'
import { type BookmarkInterface } from '../../types/BookmarkInterface'
import AddBookMark from './AddBookMark.'
import BookMarkItem from './BookMarkItem'

const fetcher = async () =>
  await fetch('http://localhost:4000/bookmarks', { method: 'GET' }).then(
    async (response) => await response.json()
  )

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
                'flex gap-4 flex-row flex-wrap py-4 rounded transition-colors',
                select ? 'bg-slate-900' : ''
              )
            }
          >
            {items.map((e: BookmarkInterface) => (
              <BookMarkItem key={e.id} id={e.id} data={e} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <AddBookMark />
    </React.Fragment>
  )
}

export default BookMarks
