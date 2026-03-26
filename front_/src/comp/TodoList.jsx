import React from 'react'
import TodoItem from './TodoItem'
import '../TodoList.scss'
import TodoStore from '../Store/TodoStore'

function TodoList() {

 //const data = { content:'투두리스트 만들기', isdone:false}

 const {data} = TodoStore();

 if(data.length === 0) return <div>준비중..</div>

  return (
    <ul>
      {
        data.map(function(item){
          return <TodoItem  key={item._id} item={item}/>
        })
      }
        
    </ul>
  )
}

export default TodoList