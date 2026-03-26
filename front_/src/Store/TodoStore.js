import { create } from 'zustand'
import axios from 'axios'

// zustand
const TodoStore = create((set) => ({
    data:[],
    save: async function (value) {
        try {
            let res = await axios.post(process.env.REACT_APP_APIURL, value);
            set(function(item){
                return {data:[...item.data, res.data.data]}
            });

            if (!res.data.success) {
                throw new Error(res.data.msg);
            }

        }//에러발생
        catch (err) {
            console.log(`에러발생 - ${err}`);


        } // catch가 실행함 

    },

    get: async (value)=> {
        const res = await axios.get(`${process.env.REACT_APP_APIURL}?sort=${value}`);
        set({data:res.data});
        
    },

    update: async (id, editText, setEditId) => {
        try{
            const res = await axios.put(`${process.env.REACT_APP_APIURL}/state?id=${id}`, { content:editText});
            if(!res.data.success) throw new Error(res.data.msg);
            set(function(item){  
                let updateData = item.data.map(obj => {
                    if (obj._id == id){
                        obj.content = editText;
                    }
                    return obj;
                });
                // id값 초기화 (안해주면 id가 계속 남아 3중 연산자에서 수정 후에 수정된 할 일이 출력x)
                setEditId(null);

                return { data:updateData};
                
        });
        }
        catch(err){
            console.error(err);
        }
    },

    del: async function(id){ //id를 받아서 실행되는 비동기 함수
        try{
            //서버로 DELETE 요청 보냄
            const res = await axios.delete(`${process.env.REACT_APP_APIURL}?id=${id}`);
            if(!res.data.success) throw new Error('에러발생')
            set(function(item){  //상태(state)를 변경하는 함수 (React의 setState or Zustand 느낌)
                return{data:item.data.filter(obj=>obj._id !== id)}
        });
        }
        catch(err){
            console.error(err);
        }   
    },

    completeTodo: async function(id){
        const res = await axios.put(`${process.env.REACT_APP_APIURL}/state?id=${id}`, {isdone:true});
        set(function(item){
            let updateData = item.data.map(function(obj){
                if(obj._id == id){
                    obj.isdone = true;
                }
                return obj;
            });
            return {data:updateData};
        })
    }

}))


export default TodoStore;