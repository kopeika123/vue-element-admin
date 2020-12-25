<template>
  <v-app>
    <v-container grid-list-xl flex xs12 md12>
      <v-flex xs12 md12>
        <v-card>
          <v-data-table
            :headers="headers"
            :items="items"
            sort-by="calories"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialogCars" max-width="600px" persistent>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on" @click="loadMarka"> <v-icon style="margin-right: 5px " dark >mdi-car-settings</v-icon>Добавить</v-btn>
                  </template>
                  <v-card>
                    <v-card-title  class="headline grey lighten-3">
                      <span class="headline">{{ createCarsTitle }}</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="6">
                            <v-autocomplete v-model="modelMarks" :items="itemsMarks"  @change="loadModel(modelMarks)" label="Модель"  item-text="mark" item-value="id" outlined dense return-object/>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-autocomplete v-model="modelModel" :items="itemsModel" @change="loadColor()" label="Марка" item-text="model" item-value="id" outlined dense return-object/>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-autocomplete v-model="modelColor" :items="itemsColor"  label="Цвет" item-text="color" item-value="id" outlined dense return-object/>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-text-field v-model="modelGosnumber" label="Гос. номер"  outlined dense />
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-text-field v-model="modelYear" label="Год. выпуска" outlined dense />
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-divider/>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="saveCars" v-show="hideCars">Создать</v-btn>
                      <v-btn color="blue darken-1" text @click="close">Закрыть</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogError" max-width="500px">
                  <v-card>
                    <v-card-title ></v-card-title>
                    <v-alert outlined color="error" dense type="error" :value="alertErrorGet" style="margin: 0 28px">
                      <div>{{messageError}}</div>
                    </v-alert>
                    <v-card-actions>
                      <v-spacer/>
                      <v-btn color="#336699" text @click="dialogResult = false">
                        Закрыть
                      </v-btn>
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
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-container>
  </v-app>
</template>

<script>
import tools from "@/utils/cars/tools";
import {getTm_id} from '@/utils/auth'
import {mapActions, mapState} from 'vuex'
export default {
  name: 'Guide',
  data() {
    return {
      dialogCars: false,
      dialogDelete: false,
      dialogError: false,

      alertErrorGet: false,
      createCarsTitle: tools.createCarsTitle,
      modelMarks:'',
      modelModel: '',
      modelColor: '',
      modelGosnumber: '',
      modelYear: '',
      messageError: '',
      hideCars: true,
      delId: 0,
      headers: [
        { text: 'Название', value: 'shortname' },
        { text: 'Цвет', value: 'color' },
        { text: 'Гос.номер', value: 'gosnumber' },
        { text: 'ИД', value: 'id' },
        { text: 'Действие', value: 'actions', sortable: false },
      ],
      items: [],
      editedIndex: -1,
      editedItem: {
        shortname: '',
        color: '',
        gosnumber: '',
        id: 0,
      },
      defaultItem: {
        shortname: '',
        color: '',
        gosnumber: '',
        id: 0,
      },
    }
  },

  watch: {
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  created () {
    this.fetchCars()
  },

  methods: {
    fetchCars(){
      this.$store.dispatch('cars/actions/fetchCars',)
        .then((response) => {
          this.items = response.carsAll
        })
        .catch((err) => {
          console.log(err)
        })
    },
    loadMarka(){
      this.$store.dispatch('cars/actions/loadMarka')
    },
    loadModel(item){
      this.$store.dispatch('cars/actions/loadModel',item.id)
    },
    loadColor(){
      this.$store.dispatch('cars/actions/loadColor')
    },
    saveCars(){
      this.$store.dispatch('cars/actions/saveCar',
        {'mark':this.modelMarks.mark,'model':this.modelModel.model,'color':this.modelColor.color,
                'gos_number':this.modelGosnumber,'production_year': Number(this.modelYear),'tm_id': getTm_id()})
        .then((response) => {
          if (response.success === 1){
            let dataCars = {
              shortname: this.modelMarks.mark + " " + this.modelModel.model,
              color: this.modelColor.color,
              gosnumber: this.modelGosnumber,
              id: response.code
            }
            this.items.push(dataCars)
            this.dialogCars = false
          }else {
            this.messageError = response.message
            this.dialogError = true
            this.dialogCars = false
            this.alertErrorGet = true
          }

        })
        .catch((err) => {
          console.log(err)
        })
    },

    deleteItem(item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.delId = item.id
      this.dialogDelete = true
    },
    deleteItemConfirm() {
      this.items.splice(this.editedIndex, 1)
      this.$store.dispatch('cars/actions/deleteCar', this.delId)
      this.closeDelete()
    },
    close() {
      this.dialogCars = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
  },
  computed: {
    ...mapState('cars/actions',['marka','model','color']),
    itemsMarks() {return this.marka},
    itemsModel() {return this.model},
    itemsColor() {return this.color}
   },

}
</script>
