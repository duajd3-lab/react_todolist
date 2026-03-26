import React, { useEffect } from 'react'
import '../TodoHead.scss'
import TodoStore from '../Store/TodoStore'

function TodoHead() {
  const {get} = TodoStore();
  const {data} = TodoStore();

  const doneCount = data.filter(v => v.isdone).length;
  const todoCount = data.filter(v => !v.isdone).length;
 

  return (
    <div className='head'>
        <h2>TodoList</h2>
        <div className='menu'>
            <div>할 일({todoCount}) / 완료({doneCount})</div>
            <div className='btn3'>
                <button onClick={e=> {get('all')}}>전체</button>
                <button onClick={e=> get(false)}>진행중</button>
                <button onClick={e=> get(true)}>완료</button>
            </div>
        </div>
    </div>
  )
}

export default TodoHead