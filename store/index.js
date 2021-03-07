import Vuex from 'vuex';

const createStore = () => {
    return new Vuex.Store({
        state: {//object型
            todos: [
                // {content: 'test1', created: '2021-03-04 21:00', state: 'working'},
                // {content: 'test2', created: '2021-03-04 21:00', state: 'pending'},
                // {content: 'test3', created: '2021-03-04 20:00', state: 'done'},
            ],

            option: [
                {id: 0, label: 'pending'},
                {id: 1, label: 'working'},
                {id: 2, label: 'done'},
            ]
        },
        mutations: {//mutationsが何と同列か確認
            insert: function(state, obj) {//objはcommitの第二引数
              let d = new Date()
              console.log(state)//上のstateオブジェクトを表している。
              console.log("----------")
              console.log(obj)//　→　{content: "いいいい"}
              let created = d.getFullYear()
               + '-' + ('00' + (d.getMonth() + 1)).slice(-2)
               + '-' + ('00' + d.getDate()).slice(-2)
               + ' ' + ('00' + d.getHours()).slice(-2)
               + ':' + ('00' + d.getMinutes()).slice(-2)
               state.todos.unshift({//先頭にpush
                 content: obj.content,
                 created: created,
                 state: 'working',
               })
            },

            remove: function(state, obj) {
                for (let i = 0; i < state.todos.length; i++) {
                    console.log(obj)
                    const ob = state.todos[i]
                    if (ob.content == obj.content && ob.created == obj.created) {
                        if (confirm("" + ob.content + "を削除しますか？")) {
                            state.todos.splice(i, 1)//i番目から1つ削除する
                            return;
                        }
                    }
                }
            },

            changeState: function(state, obj) {
                for (let i = 0; i < state.todos.length; i++) {
                    // const sTodo = state.todos[i]
                    // if (sTodo.content == obj.content && sTodo.created == obj.created) {
                        let nowState = 0
                        for (let j = 0; j < state.option.length; j++) {
                            if (state.todos[i].state == state.option[j].label) {
                                nowState = state.option[j].id
                            }
                        }
                        nowState++
                        if (nowState >= state.option.length) {
                            nowState = 0
                        }
                        console.log(obj)
                        console.log("------a----")
                        console.log(obj.state)
                        console.log("------b----")
                        obj.state = state.option[nowState].label
                        console.log(obj.state)
                        return
                    // }
                }
            }
        },
    })
}

export default createStore;







