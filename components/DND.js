import { useState, useRef } from 'react';
import styles from '../styles/DND.module.scss';

function DND({ data }) {
  const [list, setList] = useState(data)
  const [dragging, setDragging] = useState(false)

  const dragItem = useRef()
  const dragNode = useRef()

  const handleDragStart = (e, params) => {
    console.log('drag start', params);
    dragItem.current = params
    dragNode.current = e.target
    dragNode.current.addEventListener('dragend', handleDragEnd)
    // setTimeout(() => {
      setDragging(true)
    // }, 0)
  }

  const handleDragEnter = (e, params) => { // need a review
    console.log('drag entering', params);
    const currentItem = dragItem.current
    
    if (e.target !== dragNode.current) {
      setList(oldList => {
        console.log("🚀 ~ file: DND.js:26 ~ handleDragEnter ~ oldList", oldList)
        let newList = JSON.parse(JSON.stringify(oldList)) // test with spread [...list]
        newList[params.groupeIndex].items.splice(params.itemIndex, 0, newList[currentItem.groupeIndex].items.splice(currentItem.itemIndex, 1)[0])
        dragItem.current = params
        return newList
      })
    }
  }

  const handleDragEnd = () => {
    console.log('drag end')
    setDragging(false)
    // dragNode.current.removeEventListener('dragend', handleDragEnd)
    dragItem.current = null
    dragNode.current = null
  }

  const changeDropStyle = (params) => {
    const currentItem = dragItem.current
    if (currentItem.groupeIndex === params.groupeIndex && currentItem.itemIndex === params.itemIndex) {
      return styles.draggingStyle
    }
    return styles.dndItem
  }

  return (
    <div className={styles.dndDrop} >
      {list.map((groupe, groupeIndex) => (
        <div key={groupe.title} onDragEnter={dragging && !groupe.items.length? (e)=> handleDragEnter(e, {groupeIndex, itemIndex : 0}) : null} className={styles.dndGroup} >
          <p>{groupe.title}</p>
          {groupe.items.map((item, itemIndex) => (
            <div
              key={item}
              draggable
              onDragStart={(e) => { handleDragStart(e, { groupeIndex, itemIndex }) }}
              onDragEnter={dragging ? (e) => { handleDragEnter(e, { groupeIndex, itemIndex }) } : null}
              className={dragging ? changeDropStyle({ groupeIndex, itemIndex }) : styles.dndItem}
            >
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default DND