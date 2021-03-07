<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Todo Application</h1>
        <div class="addArea">
          <input type="text" name="addName" v-model="content" placeholder="Put in a task here">
          <button @click="insert" class="button button--green post">Post</button>
        </div>
        <div class="Filter">
          <button class="button" :class="color" @click="flag_reset">All</button>
          <button class="button" :class="color" @click="select('pending')">Pending</button>
          <button class="button" :class="color" @click="select('doing')">Doing</button>
          <button class="button" :class="color" @click="select('done')">Done</button>
          <!-- <button onclick="return confirm('外部のページへ移動します。よろしいですか？')">ボタンを押して下さい</button> -->
        </div>
        <table class="Lists">
          <thead>
            <tr>
              <th>Task</th>
              <th>Time</th>
              <th>State</th>
              <!-- <th>{{d}} </th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in display_todos" :key="index">
              <td>{{ item.content }}</td>
              <td>{{ item.created }}</td>
              <td>
                <button class="button" 
                  @click="changeState(item)"
                >
                  {{ item.state }}
                </button>
              </td>
              <td><button class="button button--delete delete" @click="remove(item)">Delete</button></td>
              <!-- 上のdeleteで使ってるremoveメソッドに引数itemを与えている。これが下のremove:function(todo){}のtodoと同じ -->
            </tr>
          </tbody>
        </table>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  import {mapState} from 'vuex';

  export default {
    data: function() {
      return {
        content: "",
        find_state: "",
        find_flag: false,
        color: "button--green",
      }
    },

    computed: {
      ...mapState(['todos']),
      display_todos: function() {
        if (this.find_flag) {
          let arr = []
          let todoData = this.todos
          todoData.forEach(element => {
            if (element.state == this.find_state) {
              arr.push(element)
            }
          })
          return arr
        } else {
          return this.todos
        }
      }
    },

    methods: {
      insert: function() {
        if (this.content != "") {
          this.$store.commit('insert', {content: this.content})//第二引数はpayloadと呼ばれ、オブジェクト型にすべき
          this.content = ""
        }
      },

      remove: function(todo) {
        console.log("++++++++++")
        console.log(todo)//v-forで回したtodoの１要素（item）
        this.$store.commit('remove', todo)
        // confirm("are you sure?")
      },

      changeState: function(todo) {
        this.$store.commit('changeState', todo)
      },

      flag_reset: function() {
        this.find_flag = false
        this.color = "button--green"
        console.log('reset')
      },
      //select関数内でthis.find_flag = trueをするとfalseの処理ができない
      //なのでコールバック関数としておく。display_todosでflagによる処理がなされている。
      select: function(currentState) {
        this.find_flag = true
        this.find_state = currentState
        if (this.find_state == 'doing') {
          this.color = "button--green"
        } else if (this.find_state == 'pending') {
          this.color = "button--green"
        } else if (this.find_state == 'done') {
          this.color = "button--green"
        }
        // if (this.find_flag) {
        //   let arr = []
        //   console.log(this.find_state)
        //   console.log("----------")
        //   // let tododata = this.todos
        //   for (let i = 0; i < this.todos.length; i++) {
        //     console.log(this.todos[i].state)
        //     console.log(this.todos.length)
        //     if (this.find_state == this.todos[i].state) {
        //       arr.push(this.todos[i])//ifの条件が当てはまるtodosの最初しか代入していない
        //     }
        //     console.log(arr)
        //     return arr
        //   }
        // }  
        console.log('select')
      }
    }
  }
</script>
<style>
h1 {
  text-align: center;
  margin-top: 30px;
}

.post {
  padding: 5px 10px;
}

.addArea {
  text-align: center;
  margin-top: 10px;
}

input {
  padding: 4px 8px;
}

.Filter {
  text-align: center;
  margin-top: 15px;
}

.Filter .button {
  padding: 5px 10px;
  margin-left: 3px;
}

.Lists {
  margin: 0 auto;
  margin-top: 15px;
}

.delete {
  color: red;
  /* border: none; */
  border: 2px solid red;
}
</style>
