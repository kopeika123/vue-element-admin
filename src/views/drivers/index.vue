<template>
  <v-app>
    <v-container grid-list-xl flex xs12 md12>
      <v-flex xs12 md12>
        <v-card>
          <v-data-table
            :headers="headers"
            :items="items"
            :loading="loading"
            :search="search"
             loading-text="Загрузка..."
            :page.sync="page" @page-count="pageCount = $event" :items-per-page="itemsPerPage" hide-default-footer
            class="elevation-1">
            <template v-slot:item.shortname="{ item }">{{item.shortname + ", " + item.color + ", " + item.gosnumber}}</template>
            <template v-slot:top>
                <v-dialog v-model="dialogEditDriver" max-width="500px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-row>
                      <v-flex xs12 md10>
                      <v-text-field v-model="search" label="Поиск" class="mx-10 filter-item"></v-text-field>
                      </v-flex>
                      <v-flex xs12 md2>
                      <v-btn color="primary" dark v-bind="attrs" v-on="on">Normal Button</v-btn>
                      </v-flex>
                    </v-row>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row><v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
                        </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                      <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                      <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

            </template>
            <template v-slot:item.actions="{ item }">
              <el-button size="mini" type="primary" icon="el-icon-edit-outline" @click="editItem(item)"></el-button>
              <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteItem(item)"></el-button>
            </template>
            <template v-slot:no-data><v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>
          </v-data-table>
        </v-card>
        <v-row no-gutters>
          <v-col cols="12" sm="2" md="2">
            <v-select v-model="itemsPerPage" label="Строк на странице" type="number" :items="selectItemsPerPage"
                      @input="itemsPerPage = parseInt($event, 10)" style="max-width: 70%;margin: 10px 14px;"/>
          </v-col>
          <v-col cols="12" sm="12" md="10"  style="margin-top: 12px">
            <v-pagination v-model="page" :total-visible="15" :length="pageCount"/>
          </v-col>
        </v-row>
      </v-flex>
    </v-container>
  </v-app>
</template>

<script>

export default {
  name: 'Drivers',
  data() {
    return {
      headers: [
        {text: 'Позывной', value: 'id'},
        /*{text: 'Автомобиль', value: 'shortname'},*/
        {text: 'Имя', value: 'name'},
        {text: 'Телефон', value: 'mobile_phone'},
        { text: 'Действие', value: 'actions', sortable: false },

      ],
      dialogEditDriver: false,
      items: [],
      loading: true,
      page: 0,
      pageCount: 1,
      itemsPerPage: 100,
      editedIndex: -1,
      search: '',
      selectItemsPerPage: [5, 10, 15, 20, 50, 100, 1000],
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
    }
  },
  watch: {
  /*  page(val) {
      this.fun_driverAll(this.itemsPerPage,val)
    },
    itemsPerPage(val){
      this.fun_driverAll(val,this.page)
    }*/
  },
  created() {
    this.fun_driverAll();
  },
  methods: {
    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
    editDriverItem(){
      this.dialogEditDriver = true
    },
    fun_driverAll(itemsPerPage,page) {
      let pagination = []
  //    if (itemsPerPage !== undefined && page !== undefined){
  //       let pg = this.itemsPerPage * page  - this.itemsPerPage;
   //     pagination = [pg,itemsPerPage]
  //    }else {
        pagination = [this.page,this.itemsPerPage]
    //  }
      this.$store.dispatch('driver/driverall/driverall', pagination)
        .then((response) => {
          this.items = response.driverAll
         // this.pageCount = response.count[0].count
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

}
</script>

<style>
.v-data-footer__select {
  visibility: hidden !important;
}
.el-button--primary {
  color: #FFFFFF !important;
}
.el-button--mini {
  font-size: 16px;
}
.el-button--danger {
  color: #FFFFFF !important;
}
.v-data-table>.v-data-table__wrapper>table>tbody>tr>td, .v-data-table>.v-data-table__wrapper>table>tfoot>tr>td, .v-data-table>.v-data-table__wrapper>table>thead>tr>td{
  border-right: thin solid rgba(0,0,0,.12);
  text-align: center !important;
}
.theme--light.v-data-table>.v-data-table__wrapper>table>thead>tr:last-child>th{
  text-align: center !important;
}
.v-data-table>.v-data-table__wrapper .v-data-table__mobile-row{
  min-height: 28px;
}
</style>
