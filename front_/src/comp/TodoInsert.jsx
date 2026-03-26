import React, { useState } from 'react'
import TodoStore from '../Store/TodoStore';
import '../TodoInsert.scss'

function TodoInsert() {
    const {save} = TodoStore();
    const [ip, setIp] = useState(''); //input 안에 내용을 담당

    function handleSubmit(e) {
        e.preventDefault();
        if(!ip){
            alert('글을 작성하세요!');
            return;
        }
        const today = new Date();
        const date = new Intl.DateTimeFormat('ko-KR',{
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }).format(today).replace(/[가-힣]+/, 'T').replaceAll(' ','');

        save({ content: ip, date, isdone:false })
        .then(()=>{
            setIp('');
            alert('저장완료!')

        })
    }

    return (
        <div className='footer'>
            <form onSubmit={e => handleSubmit(e)}> { /* value값으로 ip받아서 onChange로 input 받기 */}
                <input className='textarea' type="text" value={ip} onChange={e => setIp(e.target.value)} />
                <button className='btn2'>추가</button>
            </form>
        </div>
    )
}

export default TodoInsert