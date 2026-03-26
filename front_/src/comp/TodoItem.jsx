import React, { useState } from 'react'
import '../TodoItem.scss'
import TodoStore from '../Store/TodoStore'

function TodoItem({item}) {
    const {del, completeTodo, update} = TodoStore();

    // 수정 상태 저장
    let [editId, setEditId] = useState(null);
    let [editText, setEditText] = useState('');

    return (
        <li style={{color:item.isdone && 'rgb(2, 46, 243)'}}>

        {/* 수정할 값을 입력할 input으로 변경 */
            editId == item._id ?
            <form onSubmit={ e=> {
                e.preventDefault();
                update(item._id, editText,setEditId);    
            }}>
                {/* input의 defaultValue를 기존 할일(item.content)로 설정해주고 onChange로 value값을 변경할 수 있게함 */}
                <input autoFocus type="text" 
                defaultValue={item.content} 
                onChange={(e)=> setEditText(e.target.value)} />
                <button>저장</button>  
            </form>
            :
            item.content
        }
            {/* - 삼항 연산자
               조건 ? true:false */}

            
            <div className='btn'>
                {
                    // 수정 버튼 부르면 비활성화
                    // 클릭 시 editId에 해당 item의 _id값이 저장되게함
                    editId == item._id ?
                    <button disabled>수정</button>
                    :
                    <button onClick={()=> { setEditId(item._id) }}> 
                        수정
                    </button>

                }
                <button onClick={()=>del(item._id)}>삭제</button>
                <button onClick={()=>completeTodo(item._id)}>완료</button>
            </div>


        </li>
    )
}

export default TodoItem